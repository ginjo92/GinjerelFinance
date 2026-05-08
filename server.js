const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 8787);
const ROOT = __dirname;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.2";
const MAX_BODY_BYTES = 1_000_000;
const NEWS_LOOKBACK_DAYS = 7;
const NEWS_SYMBOL_LIMIT = 24;
const NEWS_HEADLINE_LIMIT = 8;
const STOCK_HISTORY_DAYS = 760;
const STOCK_HISTORY_MAX_DAYS = 1825;
const STOCK_HISTORY_CANDIDATE_LIMIT = 12;
const STOCK_QUOTE_ITEM_LIMIT = 40;
const STOCK_QUOTE_CANDIDATE_LIMIT = 10;
const DEFAULT_PROFILE_ID = "main";
const DEFAULT_PROFILE_NAME = "Main Portfolio";

let dbPool = null;
let dbReadyPromise = null;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === "POST" && req.url === "/api/portfolio-chat") {
      await handlePortfolioChat(req, res);
      return;
    }

    const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
    if (requestUrl.pathname === "/api/db-status") {
      await handleDbStatus(req, res);
      return;
    }

    if (requestUrl.pathname === "/api/profiles") {
      await handleProfiles(req, res);
      return;
    }

    const profileTransactionsMatch = requestUrl.pathname.match(/^\/api\/profiles\/([^/]+)\/transactions$/);
    if (profileTransactionsMatch) {
      await handleProfileTransactions(req, res, profileTransactionsMatch[1]);
      return;
    }

    const profileMatch = requestUrl.pathname.match(/^\/api\/profiles\/([^/]+)$/);
    if (profileMatch) {
      await handleProfileById(req, res, profileMatch[1]);
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/quotes") {
      await handleStockQuotes(req, res);
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/news-sentiment") {
      await handleNewsSentiment(req, res, requestUrl);
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/stock-history") {
      await handleStockHistory(req, res, requestUrl);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`GinjerelFinance running at http://localhost:${PORT}`);
  console.log("AI chat requires OPENAI_API_KEY in this terminal before starting the server.");
});

async function handlePortfolioChat(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 503, { error: "OPENAI_API_KEY is not set on the local server." });
    return;
  }

  const payload = await readJsonBody(req);
  const message = String(payload.message || "").trim();
  if (!message) {
    sendJson(res, 400, { error: "Missing chat message." });
    return;
  }

  const context = payload.context || {};
  const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];
  const input = [
    "User question:",
    message,
    "",
    "Recent chat history:",
    JSON.stringify(history, null, 2),
    "",
    "Portfolio context JSON:",
    JSON.stringify(context, null, 2),
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: [
        "You are Ginjerel, a portfolio coach inside the user's private GinjerelFinance dashboard.",
        "Use only the portfolio context provided by the app plus general investing principles.",
        "Be concrete: reference tickers, sector/theme weights, concentration, gains, and recent transactions when relevant.",
        "Do not claim certainty, do not promise returns, and do not give regulated financial advice.",
        "You may suggest questions to review, risks to consider, and diversification ideas, but avoid commands like 'buy this' or 'sell this immediately'.",
        "When the user asks to build, create, make, or suggest a watchlist, return a research watchlist action with 5 to 8 liquid ticker candidates. A watchlist is for research only, not a buy list.",
        "For quantum computing watchlists, include the obvious pure-play names unless the user narrows the request: RGTI Rigetti Computing, IONQ IonQ, QBTS D-Wave Quantum, and QUBT Quantum Computing Inc. You may add diversified names like IBM, GOOGL, MSFT, or a quantum ETF when useful.",
        "Always return only valid JSON with this shape: {\"reply\":\"short user-facing answer\",\"actions\":[{\"type\":\"watchlist\",\"title\":\"...\",\"theme\":\"...\",\"items\":[{\"ticker\":\"NVDA\",\"name\":\"NVIDIA Corporation\",\"assetClass\":\"Stocks\",\"currency\":\"USD\",\"sectorTheme\":\"AI\",\"reason\":\"why it belongs\",\"risk\":\"main risk\"}]}]}. Use actions: [] for normal chat answers.",
        "Keep answers concise and practical. Use EUR values when discussing portfolio totals.",
      ].join("\n"),
      input,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    sendJson(res, response.status, { error: data.error?.message || `OpenAI request failed with HTTP ${response.status}` });
    return;
  }

  const rawReply = extractOutputText(data);
  const result = extractAiChatResult(rawReply);
  sendJson(res, 200, result);
}

async function handleNewsSentiment(req, res, requestUrl) {
  const symbols = String(requestUrl.searchParams.get("symbols") || "")
    .split(",")
    .map(normalizeSymbol)
    .filter(Boolean)
    .slice(0, NEWS_SYMBOL_LIMIT);
  const days = clampNumber(Number(requestUrl.searchParams.get("days")) || NEWS_LOOKBACK_DAYS, 1, 30);

  if (!symbols.length) {
    sendJson(res, 400, { error: "Missing symbols query parameter." });
    return;
  }

  const items = await Promise.all(symbols.map((symbol) => fetchNewsSentimentForSymbol(symbol, days)));
  sendJson(res, 200, {
    generatedAt: new Date().toISOString(),
    windowDays: days,
    items,
  });
}

async function handleDbStatus(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    await ensureDb();
    sendJson(res, 200, { enabled: true, provider: "postgres" });
  } catch (error) {
    sendJson(res, process.env.DATABASE_URL ? 500 : 200, {
      enabled: false,
      provider: process.env.DATABASE_URL ? "postgres" : "browser",
      error: process.env.DATABASE_URL ? error.message : "DATABASE_URL is not set.",
    });
  }
}

async function handleProfiles(req, res) {
  try {
    await ensureDb();
    if (req.method === "GET") {
      const profiles = await listDbProfiles();
      sendJson(res, 200, { profiles });
      return;
    }

    if (req.method === "POST") {
      const payload = await readJsonBody(req);
      const profile = await createDbProfile(payload);
      sendJson(res, 201, { profile });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, getDbErrorStatus(error), { error: error.message });
  }
}

async function handleProfileById(req, res, rawProfileId) {
  try {
    await ensureDb();
    const profileId = normalizeProfileId(rawProfileId);
    if (!profileId) {
      sendJson(res, 400, { error: "Invalid profile id." });
      return;
    }

    if (req.method === "DELETE") {
      await deleteDbProfile(profileId);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, getDbErrorStatus(error), { error: error.message });
  }
}

async function handleProfileTransactions(req, res, rawProfileId) {
  try {
    await ensureDb();
    const profileId = normalizeProfileId(rawProfileId);
    if (!profileId) {
      sendJson(res, 400, { error: "Invalid profile id." });
      return;
    }

    if (req.method === "GET") {
      const transactions = await listDbTransactions(profileId);
      sendJson(res, 200, { profileId, transactions });
      return;
    }

    if (req.method === "PUT") {
      const payload = await readJsonBody(req);
      const transactions = Array.isArray(payload.transactions) ? payload.transactions : [];
      await replaceDbTransactions(profileId, transactions);
      sendJson(res, 200, { profileId, count: transactions.length });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, getDbErrorStatus(error), { error: error.message });
  }
}

async function handleStockHistory(req, res, requestUrl) {
  const candidates = parseStockHistoryCandidates(requestUrl);
  const days = clampNumber(Number(requestUrl.searchParams.get("days")) || STOCK_HISTORY_DAYS, 30, STOCK_HISTORY_MAX_DAYS);

  if (!candidates.length) {
    sendJson(res, 400, { error: "Missing stock history candidates." });
    return;
  }

  const historyCandidates = uniqueBy(candidates.flatMap(getYahooHistoryCandidates), (candidate) => candidate.symbol).slice(0, STOCK_HISTORY_CANDIDATE_LIMIT);
  const errors = [];
  for (const candidate of historyCandidates) {
    try {
      const series = await fetchYahooHistory(candidate.symbol, days);
      if (series.points.length >= 2) {
        sendJson(res, 200, {
          generatedAt: new Date().toISOString(),
          source: "Yahoo Finance",
          sourceSymbol: candidate.symbol,
          currency: series.currency || candidate.currency,
          points: series.points,
        });
        return;
      }
    } catch (error) {
      errors.push(`${candidate.symbol}: ${error.message || "failed"}`);
    }
  }

  sendJson(res, 404, {
    error: "No historical prices found.",
    tried: historyCandidates.map((candidate) => candidate.symbol),
    details: errors.slice(0, 3),
  });
}

async function handleStockQuotes(req, res) {
  const payload = await readJsonBody(req);
  const items = normalizeQuoteRequestItems(payload.items);

  if (!items.length) {
    sendJson(res, 400, { error: "Missing quote items." });
    return;
  }

  const quoteItems = await mapWithConcurrency(items, 6, fetchStockQuoteForItem);
  sendJson(res, 200, {
    generatedAt: new Date().toISOString(),
    source: "Yahoo Finance",
    items: quoteItems,
  });
}

function normalizeQuoteRequestItems(items) {
  return uniqueBy(Array.isArray(items) ? items : [], (item) => normalizeSymbol(item?.symbol))
    .map((item) => {
      const symbol = normalizeSymbol(item?.symbol);
      if (!symbol || symbol === "CASH") return null;
      const fallbackCurrency = normalizeCurrency(item?.currency || "USD");
      const candidates = Array.isArray(item?.candidates) ? item.candidates : [];
      const normalizedCandidates = candidates
        .map((candidate) => ({
          symbol: normalizeHistorySourceSymbol(candidate?.symbol),
          currency: normalizeCurrency(candidate?.currency || fallbackCurrency),
        }))
        .filter((candidate) => candidate.symbol);

      if (!normalizedCandidates.length) {
        normalizedCandidates.push({
          symbol: normalizeHistorySourceSymbol(symbol),
          currency: fallbackCurrency,
        });
      }

      return {
        symbol,
        currency: fallbackCurrency,
        candidates: uniqueBy(normalizedCandidates, (candidate) => `${candidate.symbol}:${candidate.currency}`).slice(0, STOCK_QUOTE_CANDIDATE_LIMIT),
      };
    })
    .filter(Boolean)
    .slice(0, STOCK_QUOTE_ITEM_LIMIT);
}

async function fetchStockQuoteForItem(item) {
  const quoteCandidates = uniqueBy(item.candidates.flatMap(getYahooHistoryCandidates), (candidate) => candidate.symbol).slice(0, STOCK_QUOTE_CANDIDATE_LIMIT);
  const errors = [];

  for (const candidate of quoteCandidates) {
    try {
      const quote = await fetchYahooQuote(candidate.symbol);
      if (quote.price > 0) {
        return {
          symbol: item.symbol,
          price: quote.price,
          currency: quote.currency || candidate.currency || item.currency,
          dayChangePct: quote.dayChangePct,
          source: "Yahoo Finance",
          sourceSymbol: candidate.symbol,
          marketTime: quote.marketTime,
          fetchedAt: new Date().toISOString(),
        };
      }
    } catch (error) {
      errors.push(`${candidate.symbol}: ${error.message || "failed"}`);
    }
  }

  return {
    symbol: item.symbol,
    error: "No quote found.",
    tried: quoteCandidates.map((candidate) => candidate.symbol),
    details: errors.slice(0, 3),
  };
}

function parseStockHistoryCandidates(requestUrl) {
  const candidateParam = String(requestUrl.searchParams.get("candidates") || "");
  const symbolParam = String(requestUrl.searchParams.get("symbols") || "");
  const currencyParam = String(requestUrl.searchParams.get("currencies") || "");
  const currencies = currencyParam ? currencyParam.split(",").map((currency) => normalizeCurrency(currency)) : [];
  const items = [];

  candidateParam.split(",").forEach((entry) => {
    const [rawSymbol, rawCurrency] = String(entry || "").split(":");
    const symbol = normalizeHistorySourceSymbol(rawSymbol);
    if (!symbol) return;
    items.push({
      symbol,
      currency: normalizeCurrency(rawCurrency || inferCurrencyFromHistorySymbol(symbol)),
    });
  });

  symbolParam.split(",").forEach((entry, index) => {
    const symbol = normalizeHistorySourceSymbol(entry);
    if (!symbol) return;
    items.push({
      symbol,
      currency: currencies[index] || inferCurrencyFromHistorySymbol(symbol),
    });
  });

  return uniqueBy(items, (item) => `${item.symbol}:${item.currency}`).slice(0, STOCK_HISTORY_CANDIDATE_LIMIT);
}

function normalizeHistorySourceSymbol(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9._=-]/g, "");
}

function inferCurrencyFromHistorySymbol(symbol) {
  const raw = String(symbol || "").toLowerCase();
  if (raw.endsWith(".de") || raw.endsWith(".nl") || raw.endsWith(".pa") || raw.endsWith(".mi") || raw.endsWith(".ls") || raw.endsWith(".sw") || raw.endsWith("eur")) return "EUR";
  return "USD";
}

function getYahooHistoryCandidates(candidate) {
  const raw = normalizeHistorySourceSymbol(candidate.symbol);
  const isCryptoPair = /^[a-z0-9]+(usd|eur)$/.test(raw);
  if (candidate.currency === "EUR" && raw && !raw.includes(".") && !isCryptoPair) return [];

  const symbol = toYahooHistorySymbol(candidate.symbol);
  return symbol ? [{ symbol, currency: candidate.currency }] : [];
}

function toYahooHistorySymbol(sourceSymbol) {
  const raw = normalizeHistorySourceSymbol(sourceSymbol);
  if (!raw) return "";

  const cryptoPair = raw.match(/^([a-z0-9]+)(usd|eur)$/);
  if (cryptoPair && !raw.includes(".")) {
    return `${cryptoPair[1].toUpperCase()}-${cryptoPair[2].toUpperCase()}`;
  }

  const suffixMap = {
    ".us": "",
    ".de": ".DE",
    ".nl": ".AS",
    ".pa": ".PA",
    ".mi": ".MI",
    ".ls": ".LS",
    ".sw": ".SW",
    ".l": ".L",
  };

  for (const [suffix, yahooSuffix] of Object.entries(suffixMap)) {
    if (raw.endsWith(suffix)) return `${raw.slice(0, -suffix.length).toUpperCase()}${yahooSuffix}`;
  }

  return raw.toUpperCase();
}

async function fetchYahooHistory(sourceSymbol, days) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - days);
  const period1 = Math.floor(start.getTime() / 1000);
  const period2 = Math.floor(today.getTime() / 1000);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sourceSymbol)}?period1=${period1}&period2=${period2}&interval=1d&events=history&includeAdjustedClose=true`;
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json,text/plain;q=0.9,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 GinjerelFinance/0.1",
    },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const chartError = data?.chart?.error;
  if (chartError) throw new Error(chartError.description || chartError.code || "Yahoo chart error");

  const result = data?.chart?.result?.[0];
  const timestamps = Array.isArray(result?.timestamp) ? result.timestamp : [];
  const close = result?.indicators?.quote?.[0]?.close || [];
  const adjustedClose = result?.indicators?.adjclose?.[0]?.adjclose || [];
  const points = timestamps
    .map((timestamp, index) => ({
      date: new Date(Number(timestamp) * 1000).toISOString(),
      value: Number(adjustedClose[index] ?? close[index]),
    }))
    .filter((point) => !Number.isNaN(Date.parse(point.date)) && Number.isFinite(point.value) && point.value > 0);

  return {
    currency: normalizeCurrency(result?.meta?.currency),
    points,
  };
}

async function fetchYahooQuote(sourceSymbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sourceSymbol)}?range=5d&interval=1d&includePrePost=false`;
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json,text/plain;q=0.9,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 GinjerelFinance/0.1",
    },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const chartError = data?.chart?.error;
  if (chartError) throw new Error(chartError.description || chartError.code || "Yahoo chart error");

  const result = data?.chart?.result?.[0];
  const meta = result?.meta || {};
  const close = Array.isArray(result?.indicators?.quote?.[0]?.close) ? result.indicators.quote[0].close : [];
  const validCloses = close.map(Number).filter((value) => Number.isFinite(value) && value > 0);
  const price = firstPositiveNumber(meta.regularMarketPrice, validCloses.at(-1));
  const previous = firstPositiveNumber(meta.previousClose, meta.chartPreviousClose, validCloses.at(-2));

  if (!Number.isFinite(price) || price <= 0) throw new Error("No current price in Yahoo chart response");

  return {
    price,
    currency: normalizeCurrency(meta.currency),
    dayChangePct: Number.isFinite(previous) && previous > 0 ? percentChange(price, previous) : 0,
    marketTime: Number.isFinite(Number(meta.regularMarketTime)) ? new Date(Number(meta.regularMarketTime) * 1000).toISOString() : "",
  };
}

async function fetchNewsSentimentForSymbol(symbol, days) {
  try {
    const query = encodeURIComponent(`${symbol} stock when:${days}d`);
    const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
    const response = await fetch(url, {
      headers: {
        "Accept": "application/rss+xml,text/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "GinjerelFinance/0.1 local portfolio dashboard",
      },
    });

    if (!response.ok) throw new Error(`Google News returned HTTP ${response.status}`);
    const xml = await response.text();
    const headlines = parseNewsRssItems(xml)
      .slice(0, NEWS_HEADLINE_LIMIT)
      .map((headline) => analyzeHeadline(headline));

    return aggregateNewsSentiment(symbol, headlines);
  } catch (error) {
    return {
      symbol,
      sentiment: "Unavailable",
      sentimentScore: 0,
      riskScore: 50,
      riskLevel: "Unknown",
      riskFlags: [],
      headlines: [],
      error: error.message || "News lookup failed",
    };
  }
}

function parseNewsRssItems(xml) {
  const items = [];
  const itemPattern = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemPattern.exec(String(xml || "")))) {
    const itemXml = match[1];
    const source = cleanNewsText(extractXmlTag(itemXml, "source"));
    const title = cleanNewsTitle(extractXmlTag(itemXml, "title"), source);
    if (!title) continue;
    items.push({
      title,
      source,
      url: cleanNewsText(extractXmlTag(itemXml, "link")),
      publishedAt: parseNewsDate(extractXmlTag(itemXml, "pubDate")),
    });
  }

  return items;
}

function extractXmlTag(xml, tagName) {
  const match = String(xml || "").match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match?.[1] ? decodeXmlEntities(match[1]) : "";
}

function decodeXmlEntities(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, number) => String.fromCodePoint(parseInt(number, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanNewsText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanNewsTitle(value, source = "") {
  let title = cleanNewsText(value);
  if (source) {
    const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    title = title.replace(new RegExp(`\\s+-\\s+${escapedSource}\\s*$`, "i"), "");
  }
  return title.trim();
}

function parseNewsDate(value) {
  const time = Date.parse(cleanNewsText(value));
  return Number.isFinite(time) ? new Date(time).toISOString() : "";
}

function analyzeHeadline(headline) {
  const text = `${headline.title} ${headline.source}`.toLowerCase();
  const positiveTerms = [
    ["beats", 1.2],
    ["beat estimates", 1.5],
    ["raises guidance", 1.6],
    ["price target raised", 1.2],
    ["upgraded", 1.1],
    ["upgrade", 1.1],
    ["buy rating", 1],
    ["strong buy", 1.4],
    ["profit jumps", 1.2],
    ["revenue growth", 1],
    ["record revenue", 1.2],
    ["surges", 0.8],
    ["rallies", 0.8],
    ["gains", 0.7],
    ["bullish", 0.9],
    ["outperform", 0.9],
    ["partnership", 0.6],
    ["approved", 0.8],
    ["dividend increase", 0.8],
  ];
  const negativeTerms = [
    ["misses estimates", 1.5],
    ["missed estimates", 1.5],
    ["cuts guidance", 1.7],
    ["guidance cut", 1.7],
    ["downgraded", 1.2],
    ["downgrade", 1.2],
    ["sell rating", 1],
    ["underperform", 1],
    ["lawsuit", 1.2],
    ["probe", 1.2],
    ["investigation", 1.2],
    ["antitrust", 1.2],
    ["regulator", 0.9],
    ["recall", 1.1],
    ["warning", 0.9],
    ["fraud", 1.6],
    ["data breach", 1.4],
    ["plunges", 1.2],
    ["slumps", 1.1],
    ["falls", 0.7],
    ["drops", 0.7],
    ["loss widens", 1.1],
    ["layoffs", 0.8],
    ["bankruptcy", 1.8],
    ["debt", 0.7],
    ["dilution", 1.1],
    ["short seller", 1.2],
  ];

  const positiveScore = scoreTerms(text, positiveTerms);
  const negativeScore = scoreTerms(text, negativeTerms);
  const riskTags = detectRiskTags(text);
  const sentimentScore = Number((positiveScore - negativeScore).toFixed(2));

  return {
    ...headline,
    sentimentScore,
    sentiment: labelHeadlineSentiment(sentimentScore),
    riskTags,
  };
}

function scoreTerms(text, terms) {
  return terms.reduce((score, [term, weight]) => score + (containsTerm(text, term) ? weight : 0), 0);
}

function containsTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
}

function detectRiskTags(text) {
  const tags = [
    ["Earnings", /\b(earnings|revenue|profit|sales|guidance|forecast|outlook|quarter|results)\b/i],
    ["Legal", /\b(lawsuit|probe|investigation|antitrust|regulator|sec|doj|fine|settlement|fraud)\b/i],
    ["Balance sheet", /\b(debt|dilution|bankruptcy|cash burn|liquidity|solvency)\b/i],
    ["Macro", /\b(tariff|inflation|rates|recession|china|sanctions|oil|geopolitical|fx|currency)\b/i],
    ["Volatility", /\b(plunges|surges|slumps|jumps|volatile|volatility|short seller|selloff|rally)\b/i],
    ["Operations", /\b(recall|layoffs|supply|delay|strike|cyberattack|data breach|production)\b/i],
  ];
  return tags.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function labelHeadlineSentiment(score) {
  if (score >= 0.75) return "Positive";
  if (score <= -0.75) return "Cautious";
  return "Neutral";
}

function aggregateNewsSentiment(symbol, headlines) {
  if (!headlines.length) {
    return {
      symbol,
      sentiment: "No recent headlines",
      sentimentScore: 0,
      riskScore: 45,
      riskLevel: "Unknown",
      riskFlags: [],
      headlines: [],
    };
  }

  const sentimentScore = headlines.reduce((sum, item) => sum + item.sentimentScore, 0) / headlines.length;
  const positiveCount = headlines.filter((item) => item.sentimentScore >= 0.75).length;
  const negativeCount = headlines.filter((item) => item.sentimentScore <= -0.75).length;
  const riskFlags = [...new Set(headlines.flatMap((item) => item.riskTags))];
  const volatilityBump = riskFlags.includes("Volatility") ? 8 : 0;
  const riskScore = clampNumber(
    44 - sentimentScore * 12 + negativeCount * 7 + Math.max(0, riskFlags.length - 1) * 4 + volatilityBump,
    5,
    95,
  );

  return {
    symbol,
    sentiment: labelAggregateSentiment(sentimentScore, positiveCount, negativeCount),
    sentimentScore: Number(sentimentScore.toFixed(2)),
    riskScore: Math.round(riskScore),
    riskLevel: labelNewsRisk(riskScore),
    riskFlags,
    positiveCount,
    negativeCount,
    headlines,
  };
}

function labelAggregateSentiment(score, positiveCount, negativeCount) {
  if (negativeCount && positiveCount) return "Mixed";
  if (score >= 0.45) return "Positive";
  if (score <= -0.45) return "Cautious";
  return "Neutral";
}

function labelNewsRisk(score) {
  if (score >= 72) return "High";
  if (score >= 56) return "Elevated";
  if (score >= 38) return "Moderate";
  return "Quiet";
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const rawPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const resolved = path.resolve(ROOT, `.${rawPath}`);

  if (!resolved.startsWith(ROOT)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(resolved, (error, data) => {
    if (error) {
      sendJson(res, error.code === "ENOENT" ? 404 : 500, { error: error.code === "ENOENT" ? "Not found" : "Could not read file" });
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(resolved).toLowerCase()] || "application/octet-stream" });
    if (req.method === "HEAD") res.end();
    else res.end(data);
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();

  const pieces = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") pieces.push(content.text);
    }
  }
  return pieces.join("\n").trim() || "I could not generate a useful answer this time.";
}


function extractAiChatResult(text) {
  const parsed = parseJsonObject(text);
  if (parsed && typeof parsed.reply === "string") {
    return {
      reply: parsed.reply.trim(),
      actions: normalizeActions(parsed.actions),
    };
  }

  return {
    reply: String(text || "").trim() || "I could not generate a useful answer this time.",
    actions: [],
  };
}

function parseJsonObject(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;

  const candidates = [raw];
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) candidates.push(fenced[1].trim());
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) candidates.push(raw.slice(firstBrace, lastBrace + 1));

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      continue;
    }
  }
  return null;
}

function normalizeActions(actions) {
  if (!Array.isArray(actions)) return [];
  return actions
    .map((action) => {
      if (!action || action.type !== "watchlist" || !Array.isArray(action.items)) return null;
      const items = action.items
        .map((item) => {
          const ticker = normalizeSymbol(item.ticker || item.symbol);
          if (!ticker) return null;
          return {
            ticker,
            name: String(item.name || item.company || ticker).trim(),
            assetClass: String(item.assetClass || item.class || "Stocks").trim(),
            currency: normalizeCurrency(item.currency || "USD"),
            sectorTheme: String(item.sectorTheme || item.theme || action.theme || "Research").trim(),
            reason: String(item.reason || item.thesis || "Research candidate to review.").trim(),
            risk: String(item.risk || item.riskNote || "").trim(),
          };
        })
        .filter(Boolean)
        .slice(0, 8);
      if (!items.length) return null;
      return {
        type: "watchlist",
        title: String(action.title || `${action.theme || "Research"} Watchlist`).trim(),
        theme: String(action.theme || "Research").trim(),
        items,
      };
    })
    .filter(Boolean);
}

function normalizeSymbol(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9._=-]/g, "");
}

function normalizeCurrency(value) {
  const currency = String(value || "USD").trim().toUpperCase();
  return ["USD", "EUR"].includes(currency) ? currency : "USD";
}

async function ensureDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");
  if (!dbReadyPromise) dbReadyPromise = initializeDb();
  await dbReadyPromise;
  return dbPool;
}

async function initializeDb() {
  let pg;
  try {
    pg = require("pg");
  } catch {
    throw new Error("Postgres dependency is not installed. Run npm install.");
  }

  dbPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
  });

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_transactions (
      profile_id TEXT NOT NULL REFERENCES portfolio_profiles(id) ON DELETE CASCADE,
      id TEXT NOT NULL,
      data JSONB NOT NULL,
      sort_date TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (profile_id, id)
    )
  `);
  await dbPool.query(
    `INSERT INTO portfolio_profiles (id, name)
     VALUES ($1, $2)
     ON CONFLICT (id) DO NOTHING`,
    [DEFAULT_PROFILE_ID, DEFAULT_PROFILE_NAME],
  );
}

async function listDbProfiles() {
  const result = await dbPool.query(
    `SELECT id, name, created_at, updated_at
     FROM portfolio_profiles
     ORDER BY created_at ASC, name ASC`,
  );
  return result.rows.map(formatDbProfile);
}

async function createDbProfile(payload = {}) {
  const id = normalizeProfileId(payload.id || randomServerId());
  const name = normalizeProfileName(payload.name);
  if (!id || !name) throw new Error("Profile name is required.");

  const result = await dbPool.query(
    `INSERT INTO portfolio_profiles (id, name)
     VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = NOW()
     RETURNING id, name, created_at, updated_at`,
    [id, name],
  );
  return formatDbProfile(result.rows[0]);
}

async function deleteDbProfile(profileId) {
  if (profileId === DEFAULT_PROFILE_ID) throw new Error("The main profile cannot be deleted from the database.");
  const result = await dbPool.query("DELETE FROM portfolio_profiles WHERE id = $1", [profileId]);
  if (!result.rowCount) throw new Error("Profile not found.");
}

async function listDbTransactions(profileId) {
  const result = await dbPool.query(
    `SELECT data
     FROM portfolio_transactions
     WHERE profile_id = $1
     ORDER BY sort_date DESC NULLS LAST, created_at DESC`,
    [profileId],
  );
  return result.rows.map((row) => row.data);
}

async function replaceDbTransactions(profileId, transactions) {
  await dbPool.query(
    `INSERT INTO portfolio_profiles (id, name)
     VALUES ($1, $2)
     ON CONFLICT (id) DO NOTHING`,
    [profileId, profileId === DEFAULT_PROFILE_ID ? DEFAULT_PROFILE_NAME : "Portfolio"],
  );

  const client = await dbPool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM portfolio_transactions WHERE profile_id = $1", [profileId]);
    for (const transaction of transactions) {
      const id = normalizeProfileId(transaction?.id || randomServerId());
      await client.query(
        `INSERT INTO portfolio_transactions (profile_id, id, data, sort_date)
         VALUES ($1, $2, $3::jsonb, $4)`,
        [profileId, id, JSON.stringify({ ...transaction, id }), String(transaction?.sortDate || transaction?.date || "")],
      );
    }
    await client.query("UPDATE portfolio_profiles SET updated_at = NOW() WHERE id = $1", [profileId]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

function formatDbProfile(row) {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

function normalizeProfileId(value) {
  return String(value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
}

function normalizeProfileName(value) {
  return String(value || "").trim().slice(0, 80);
}

function randomServerId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function getDbErrorStatus(error) {
  if (/not set|not installed/i.test(error.message || "")) return 503;
  if (/not found/i.test(error.message || "")) return 404;
  return 500;
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function firstPositiveNumber(...values) {
  return values.map(Number).find((value) => Number.isFinite(value) && value > 0);
}

function percentChange(value, previous) {
  return previous ? ((value - previous) / previous) * 100 : 0;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
