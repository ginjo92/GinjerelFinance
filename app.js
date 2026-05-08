const BASE_CURRENCY = "EUR";
const MARKET_REFRESH_MS = 60_000;
const NEWS_SENTIMENT_REFRESH_MS = 30 * 60 * 1000;
const TRANSACTION_PREVIEW_LIMIT = 10;
const WATCHLIST_ACTION_LIMIT = 8;

const platformDefinitions = [
  { name: "Trade Republic", slug: "traderepublic", color: "00A58E", initials: "TR" },
  { name: "Revolut", slug: "revolut", color: "191C1F", initials: "R" },
  { name: "Binance", slug: "binance", color: "F0B90B", initials: "B" },
  { name: "Degiro", slug: "degiro", color: "1D4F8F", initials: "D" },
  { name: "Coinbase", slug: "coinbase", color: "0052FF", initials: "C" },
  { name: "XTB", slug: "xtb", color: "D5001C", initials: "X" },
  { name: "Interactive Brokers", slug: "interactivebrokers", color: "D71920", initials: "IB" },
  { name: "eToro", slug: "etoro", color: "13C636", initials: "eT" },
  { name: "Kraken", slug: "kraken", color: "5841D8", initials: "K" },
  { name: "Other", slug: "", color: "64748B", initials: "O" },
];

const defaultPlatforms = platformDefinitions.map((platform) => platform.name);
const platformAliases = new Map([
  ["traderepublic", "Trade Republic"],
  ["trade republic", "Trade Republic"],
  ["imported", "Other"],
  ["default", "Other"],
]);
const companyNameOverrides = {
  AAPL: "Apple Inc.",
  APPL: "Apple Inc.",
  ALB: "Albemarle Corporation",
  TE: "T1 Energy Inc.",
  RGTI: "Rigetti Computing, Inc.",
  IONQ: "IonQ, Inc.",
  QBTS: "D-Wave Quantum Inc.",
  QUBT: "Quantum Computing Inc.",
  IBM: "International Business Machines Corporation",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc.",
};
const companyLogoSymbolOverrides = {
  APPL: "AAPL",
};
const companyLogoUrlOverrides = {
  ALB: "https://companieslogo.com/img/orig/ALB-ea894ccd.png?t=1740150988",
  TE: "te-logo.svg",
};
const wideCompanyLogoOverrides = new Set();
const assetClassOptions = ["Stocks", "ETF", "Commodities", "Crypto", "Cash"];
const supportedCurrencies = ["EUR", "USD"];

const benchmarkDefinitions = [
  { id: "sp500", name: "S&P 500", symbol: "SPY", sourceSymbol: "spy.us", currency: "USD", color: "#c0840c" },
  { id: "nasdaq", name: "Nasdaq 100", symbol: "QQQ", sourceSymbol: "qqq.us", currency: "USD", color: "#2563eb" },
  { id: "world", name: "Global equities", symbol: "VT", sourceSymbol: "vt.us", currency: "USD", color: "#7c3aed" },
  { id: "europe", name: "Europe equities", symbol: "VGK", sourceSymbol: "vgk.us", currency: "USD", color: "#be185d" },
  { id: "bonds", name: "Core bonds", symbol: "BND", sourceSymbol: "bnd.us", currency: "USD", color: "#64748b" },
];

const defaultFx = {
  ratesToEUR: { EUR: 1, USD: 0.92 },
  eurToUsd: 1.087,
  updatedAt: null,
  provider: "Fallback",
};

const sampleHoldings = [
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    assetClass: "Equity",
    platform: "Trade Republic",
    currency: "USD",
    quantity: 62,
    price: 258.36,
    costBasisEUR: 12733,
    dayChangePct: 0.54,
    risk: 86,
  },
  {
    symbol: "VXUS",
    name: "Vanguard Total International Stock ETF",
    assetClass: "Equity",
    platform: "Trade Republic",
    currency: "USD",
    quantity: 110,
    price: 62.18,
    costBasisEUR: 5920,
    dayChangePct: -0.18,
    risk: 82,
  },
  {
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    assetClass: "Bonds",
    platform: "Revolut",
    currency: "USD",
    quantity: 126,
    price: 72.84,
    costBasisEUR: 8593,
    dayChangePct: 0.11,
    risk: 28,
  },
  {
    symbol: "VNQ",
    name: "Vanguard Real Estate ETF",
    assetClass: "Real Estate",
    platform: "Revolut",
    currency: "USD",
    quantity: 48,
    price: 86.92,
    costBasisEUR: 3648,
    dayChangePct: -0.36,
    risk: 74,
  },
  {
    symbol: "GLD",
    name: "SPDR Gold Shares",
    assetClass: "Commodities",
    platform: "Trade Republic",
    currency: "USD",
    quantity: 24,
    price: 215.41,
    costBasisEUR: 3938,
    dayChangePct: 0.28,
    risk: 58,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    assetClass: "Crypto",
    platform: "Revolut",
    currency: "USD",
    quantity: 0.185,
    price: 64250,
    costBasisEUR: 8133,
    dayChangePct: 1.92,
    risk: 98,
  },
  {
    symbol: "CASH",
    name: "Trade Republic cash",
    assetClass: "Cash",
    platform: "Trade Republic",
    currency: "EUR",
    quantity: 1,
    price: 5200,
    costBasisEUR: 5200,
    dayChangePct: 0,
    risk: 4,
  },
  {
    symbol: "CASH",
    name: "Revolut cash",
    assetClass: "Cash",
    platform: "Revolut",
    currency: "EUR",
    quantity: 1,
    price: 2400,
    costBasisEUR: 2400,
    dayChangePct: 0,
    risk: 4,
  },
];

const defaultTargets = {
  Equity: 58,
  Bonds: 16,
  "Real Estate": 8,
  Commodities: 7,
  Crypto: 5,
  Cash: 6,
};

const classColors = {
  Equity: "#0f766e",
  Bonds: "#2563eb",
  "Real Estate": "#7c3aed",
  Commodities: "#c0840c",
  Crypto: "#dc2626",
  Cash: "#64748b",
};

const fallbackColors = ["#0f766e", "#2563eb", "#7c3aed", "#c0840c", "#dc2626", "#64748b", "#0891b2", "#be185d"];
const storageKeys = {
  holdings: "portfolioHoldings",
  targets: "portfolioTargets",
  transactions: "portfolioTransactions",
  tickers: "portfolioTickers",
  fx: "portfolioFx",
  benchmarks: "portfolioBenchmarks",
  stockAnalysis: "portfolioStockAnalysis",
  newsSentiment: "portfolioNewsSentiment",
  manualYahooLinks: "portfolioManualYahooLinks",
  watchlists: "portfolioWatchlists",
};
const profileStorageKeys = {
  profiles: "portfolioProfiles",
  activeProfileId: "portfolioActiveProfileId",
};
const DEFAULT_PROFILE_ID = "main";
const DEFAULT_PROFILE_NAME = "Main Portfolio";
const portfolioProfileState = initializePortfolioProfiles();
let activePortfolioProfileId = portfolioProfileState.activeProfileId;

const state = {
  profiles: portfolioProfileState.profiles,
  activeProfileId: portfolioProfileState.activeProfileId,
  activePeriod: "1Y",
  activeFilter: "All",
  importMode: "replace",
  search: "",
  transactionSearch: "",
  transactionsExpanded: false,
  editingTransactionId: null,
  selectedTransactionIds: new Set(),
  sortKey: "marketValue",
  sortDirection: "desc",
  targets: loadTargets(),
  transactions: loadTransactions(),
  fx: loadFx(),
  activeBenchmarks: ["sp500", "nasdaq", "world"],
  benchmarkSeries: loadBenchmarkSeries(),
  stockAnalysis: loadStockAnalysisCache(),
  newsSentiment: loadNewsSentimentCache(),
  manualYahooLinks: loadManualYahooLinks(),
  watchlists: loadWatchlists(),
  performancePriceSeries: {},
  performanceHistoryLoading: false,
  performanceHistoryMessage: "",
  stockChartSeries: {},
  stockChartPeriod: "6M",
  stockChartHoverX: null,
  selectedStockSymbol: "",
  marketMessage: "",
  marketRefreshing: false,
  remoteDbAvailable: false,
  remoteDbLoading: false,
  remoteDbMessage: "",
  newsSentimentLoading: false,
  newsSentimentMessage: "",
  refreshDetail: "",
  performanceHoverX: null,
  donutHover: { typeDistributionChart: null, weightDistributionChart: null, sectorDistributionChart: null },
  chatOpen: false,
  chatPending: false,
  chatMessages: [
    {
      role: "assistant",
      content: "Ask me about portfolio risk, concentration, sectors, realized gains, or ask me to build a research watchlist.",
      mode: "ai",
    },
  ],
};

let holdings = loadHoldings();
let trackedTickers = loadTickers();

rebuildSavedPortfolioFromTransactions();
ensureTickersForHoldings();
let performanceData = buildPerformanceData();

const eurFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: BASE_CURRENCY,
  maximumFractionDigits: 0,
});

const exactEurFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: BASE_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const moneyFormatters = new Map();

document.addEventListener("DOMContentLoaded", () => {
  wireControls();
  render();
  initializeRemotePortfolioDb();
  refreshMarketData({ quiet: true });
  refreshNewsSentiment({ quiet: true });
  window.setInterval(() => refreshMarketData({ quiet: true }), MARKET_REFRESH_MS);
  window.addEventListener("resize", debounce(renderCharts, 120));
});

function wireControls() {
  document.getElementById("holdingSearch").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderHoldings();
  });

  document.getElementById("transactionSymbolFilter").addEventListener("input", (event) => {
    state.transactionSearch = event.target.value.trim().toLowerCase();
    state.transactionsExpanded = false;
    renderTransactions();
  });


  document.getElementById("selectAllTransactions").addEventListener("change", (event) => {
    document.querySelectorAll("[data-select-transaction]").forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      updateSelectedTransaction(checkbox.dataset.selectTransaction, checkbox.checked);
    });
    renderBulkTransactionBar();
  });

  document.getElementById("bulkApplyPlatform").addEventListener("click", applyBulkTransactionPlatform);
  document.getElementById("bulkDeleteTransactions").addEventListener("click", deleteBulkTransactions);
  document.getElementById("bulkClearTransactions").addEventListener("click", clearSelectedTransactions);

  document.getElementById("refreshMarketData").addEventListener("click", () => refreshMarketData({ quiet: false }));
  document.getElementById("portfolioProfileSelect").addEventListener("change", (event) => switchPortfolioProfile(event.target.value));
  document.getElementById("createPortfolioProfile").addEventListener("click", createPortfolioProfile);
  document.getElementById("deletePortfolioProfile").addEventListener("click", deleteActivePortfolioProfile);
  document.getElementById("saveStockManualYahooUrl").addEventListener("click", saveManualYahooLinkFromModal);
  document.getElementById("stockManualYahooUrl").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveManualYahooLinkFromModal();
  });

  const performanceChart = document.getElementById("performanceChart");
  performanceChart.addEventListener("mousemove", (event) => {
    const rect = performanceChart.getBoundingClientRect();
    state.performanceHoverX = event.clientX - rect.left;
    renderPerformanceChart();
  });
  performanceChart.addEventListener("mouseleave", () => {
    state.performanceHoverX = null;
    renderPerformanceChart();
  });

  wireDonutHover("typeDistributionChart");
  wireDonutHover("weightDistributionChart");
  wireDonutHover("sectorDistributionChart");


  document.getElementById("resetTargets").addEventListener("click", () => {
    state.targets = { ...defaultTargets };
    ensureTargetsForHoldings();
    saveTargets();
    renderTargets();
    setStatus("importStatus", "Target allocation reset.", "success");
  });

  document.getElementById("resetPortfolio").addEventListener("click", () => {
    if (!window.confirm("Reset holdings, tickers, transactions, and targets to the demo data?")) return;
    holdings = clone(sampleHoldings);
    trackedTickers = holdingsToTickers(holdings);
    state.transactions = [];
    state.targets = { ...defaultTargets };
    saveHoldings();
    saveTickers();
    saveTransactions();
    saveTargets();
    rebuildAfterDataChange();
    setStatus("importStatus", "Demo portfolio restored.", "success");
  });

  document.getElementById("csvFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    document.getElementById("csvFileName").textContent = file ? file.name : "Choose CSV";
    document.getElementById("importPreview").textContent = file ? file.name : "No file selected";
    setImportStatus(file ? `${file.name} selected.` : "", "");
  });

  document.getElementById("importCsv").addEventListener("click", importCsvFile);

  document.getElementById("importMode").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    state.importMode = button.dataset.mode;
    setActiveButton(document.getElementById("importMode"), button);
  });

  document.getElementById("periodControls").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    state.activePeriod = button.dataset.period;
    state.performanceHoverX = null;
    setActiveButton(document.getElementById("periodControls"), button);
    renderPerformanceChart();
  });

  document.getElementById("benchmarkControls").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-benchmark]");
    if (!button) return;
    const id = button.dataset.benchmark;
    const wasActive = state.activeBenchmarks.includes(id);
    if (wasActive) {
      state.activeBenchmarks = state.activeBenchmarks.filter((benchmarkId) => benchmarkId !== id);
    } else {
      state.activeBenchmarks = [...state.activeBenchmarks, id];
    }
    renderBenchmarkControls();
    renderPerformanceChart();
    if (!wasActive && !state.benchmarkSeries[id]?.length) refreshBenchmarkOnDemand(id);
  });

  document.getElementById("assetFilters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.activeFilter = button.dataset.filter;
    setActiveButton(document.getElementById("assetFilters"), button);
    renderSummary();
    renderHoldings();
    renderInvestorProfile();
    renderDistributionCharts();
  });

  document.querySelectorAll("#holdingsBody, #closedPositionsBody").forEach((tbody) => {
    tbody.addEventListener("click", (event) => {
      const button = event.target.closest("[data-stock-symbol]");
      if (!button) return;
      openStockAnalysis(button.dataset.stockSymbol);
    });
    tbody.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const button = event.target.closest("[data-stock-symbol]");
      if (!button) return;
      event.preventDefault();
      openStockAnalysis(button.dataset.stockSymbol);
    });
  });

  document.getElementById("stockAnalysisContent").addEventListener("click", (event) => {
    const button = event.target.closest("[data-refresh-stock-news]");
    if (button) {
      refreshNewsSentimentForSymbols([button.dataset.refreshStockNews], { force: true });
      return;
    }

    const reloadChartButton = event.target.closest("[data-reload-stock-chart]");
    if (reloadChartButton) {
      const symbol = normalizeSymbol(reloadChartButton.dataset.reloadStockChart);
      delete state.stockChartSeries[symbol];
      loadStockChartSeriesForSymbol(symbol, getHoldingForAnalysis(symbol));
      return;
    }

    const periodButton = event.target.closest("[data-stock-chart-period]");
    if (!periodButton) return;
    state.stockChartPeriod = periodButton.dataset.stockChartPeriod || "6M";
    state.stockChartHoverX = null;
    renderStockAnalysisModal(state.selectedStockSymbol, getHoldingForAnalysis(state.selectedStockSymbol), state.stockAnalysis[state.selectedStockSymbol] || null, false);
  });
  document.getElementById("stockAnalysisContent").addEventListener("mousemove", (event) => {
    const chart = event.target.closest("[data-stock-chart]");
    if (!chart) return;
    const rect = chart.getBoundingClientRect();
    state.stockChartHoverX = safeRatio(event.clientX - rect.left, rect.width) * 760;
    renderStockAnalysisModal(state.selectedStockSymbol, getHoldingForAnalysis(state.selectedStockSymbol), state.stockAnalysis[state.selectedStockSymbol] || null, false);
  });
  document.getElementById("stockAnalysisContent").addEventListener("mouseleave", () => {
    if (!Number.isFinite(state.stockChartHoverX)) return;
    state.stockChartHoverX = null;
    renderStockAnalysisModal(state.selectedStockSymbol, getHoldingForAnalysis(state.selectedStockSymbol), state.stockAnalysis[state.selectedStockSymbol] || null, false);
  });

  document.querySelectorAll(".holdings-table thead").forEach((thead) => {
    thead.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-sort]");
      if (!button) return;
      const key = button.dataset.sort;
      if (state.sortKey === key) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDirection = ["symbol", "platform", "assetClass", "status"].includes(key) ? "asc" : "desc";
      }
      renderHoldings();
    });
  });

  wirePortfolioChat();
  wireWatchlists();
  wireFloatingActions();
  wireModalForms();
}

function wirePortfolioChat() {
  const toggle = document.getElementById("portfolioChatToggle");
  const close = document.getElementById("portfolioChatClose");
  const form = document.getElementById("portfolioChatForm");
  const input = document.getElementById("portfolioChatInput");
  const suggestions = document.querySelectorAll("[data-chat-prompt]");
  const messages = document.getElementById("portfolioChatMessages");

  if (!toggle || !close || !form || !input || !messages) return;

  toggle.addEventListener("click", () => setPortfolioChatOpen(!state.chatOpen));
  close.addEventListener("click", () => setPortfolioChatOpen(false));
  messages.addEventListener("click", handleChatActionClick);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendPortfolioChatMessage(input.value);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    sendPortfolioChatMessage(input.value);
  });
  suggestions.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.chatPrompt || "";
      sendPortfolioChatMessage(input.value);
    });
  });
}

function setPortfolioChatOpen(open) {
  state.chatOpen = Boolean(open);
  renderPortfolioChat();
  if (state.chatOpen) {
    window.setTimeout(() => document.getElementById("portfolioChatInput")?.focus(), 0);
  }
}

async function sendPortfolioChatMessage(rawMessage) {
  const input = document.getElementById("portfolioChatInput");
  const message = String(rawMessage || "").trim();
  if (!message || state.chatPending) return;

  state.chatMessages.push({ role: "user", content: message });
  state.chatPending = true;
  if (input) input.value = "";
  setChatStatus("Thinking with your latest portfolio data...", "");
  renderPortfolioChat();

  try {
    const result = await requestPortfolioAiReply(message);
    state.chatMessages.push({ role: "assistant", content: result.reply, mode: "ai", actions: result.actions });
    setChatStatus("AI response generated from your local portfolio snapshot.", "success");
  } catch (error) {
    const detail = error.message || "AI server is unavailable.";
    if (isWatchlistPrompt(message)) {
      const curated = buildCuratedWatchlistResponse(message);
      state.chatMessages.push({ role: "assistant", content: curated.reply, mode: "curated", actions: curated.actions });
      setChatStatus(`Curated research watchlist shown because the AI server is unavailable. ${detail}`.trim(), "warning");
    } else {
      state.chatMessages.push({
        role: "assistant",
        content: `I need the AI server to answer accurately. Start the local AI server with your OpenAI API key, then try again. (${detail})`,
        mode: "error",
        actions: [],
      });
      setChatStatus(`AI server required. ${detail}`.trim(), "warning");
    }
  } finally {
    state.chatPending = false;
    renderPortfolioChat();
  }
}

async function requestPortfolioAiReply(message) {
  const response = await fetch(getPortfolioChatEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      context: buildPortfolioAiContext(),
      history: state.chatMessages.slice(-8).map(({ role, content }) => ({ role, content })),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `AI server returned HTTP ${response.status}`);
  }

  const data = await response.json();
  const reply = String(data.reply || "").trim();
  if (!reply) throw new Error("AI server returned an empty reply.");
  return {
    reply,
    actions: normalizeChatActions(data.actions, message, { allowFallback: isWatchlistPrompt(message) }),
  };
}

function getPortfolioChatEndpoint() {
  if (/^https?:$/i.test(window.location.protocol)) return "/api/portfolio-chat";
  return "http://localhost:8787/api/portfolio-chat";
}

function renderPortfolioChat() {
  const panel = document.getElementById("portfolioChatPanel");
  const toggle = document.getElementById("portfolioChatToggle");
  const messages = document.getElementById("portfolioChatMessages");
  const sendButton = document.getElementById("portfolioChatSend");
  if (!panel || !toggle || !messages || !sendButton) return;

  panel.hidden = !state.chatOpen;
  toggle.setAttribute("aria-expanded", String(state.chatOpen));
  sendButton.disabled = state.chatPending;
  messages.innerHTML = state.chatMessages
    .map((message, index) => `
      <div class="ai-chat-message ${message.role === "user" ? "user-message" : "assistant-message"}">
        <p>${escapeHtml(message.content)}</p>
        ${message.mode === "error" && message.role === "assistant" ? `<span>AI server required</span>` : ""}
        ${message.mode === "curated" && message.role === "assistant" ? `<span>Curated watchlist</span>` : ""}
        ${renderChatActions(message.actions, index)}
      </div>
    `)
    .join("") + (state.chatPending ? `<div class="ai-chat-message assistant-message thinking"><p>Reading the portfolio...</p></div>` : "");
  messages.scrollTop = messages.scrollHeight;
}

function setChatStatus(message, type = "") {
  const status = document.getElementById("portfolioChatStatus");
  if (!status) return;
  status.textContent = message || "Portfolio coach, not regulated financial advice.";
  status.className = `ai-chat-status ${type}`.trim();
}

function buildPortfolioAiContext() {
  const visibleHoldings = getVisibleHoldings();
  const totalValue = getTotalValue();
  const totalCost = getTotalCost();
  const unrealizedGain = totalValue - totalCost;
  const realizedGain = holdings
    .filter((holding) => holding.symbol && holding.symbol !== "CASH")
    .reduce((sum, holding) => sum + getRealizedGainEUR(holding), 0);
  const dayChange = visibleHoldings.reduce((sum, holding) => sum + getMarketValue(holding) * ((Number(holding.dayChangePct) || 0) / 100), 0);
  const profile = buildInvestorProfile();
  const newsRisk = buildPortfolioNewsRisk();

  return {
    baseCurrency: BASE_CURRENCY,
    generatedAt: new Date().toISOString(),
    summary: {
      marketValueEUR: roundForContext(totalValue),
      costEUR: roundForContext(totalCost),
      unrealizedGainEUR: roundForContext(unrealizedGain),
      unrealizedGainPct: roundForContext(safePercent(unrealizedGain, totalCost)),
      realizedGainEUR: roundForContext(realizedGain),
      dayChangeEUR: roundForContext(dayChange),
      dayChangePct: roundForContext(safePercent(dayChange, totalValue)),
    },
    profile: {
      title: profile.title,
      score: profile.overallScore,
      summary: profile.summary,
      factorScores: profile.factors.map((factor) => ({ label: factor.label, score: factor.score, detail: factor.detail })),
    },
    newsRisk: {
      score: newsRisk.hasCoverage ? newsRisk.score : null,
      level: newsRisk.hasCoverage ? newsRisk.level : "Unavailable",
      coverage: newsRisk.detail,
      summary: newsRisk.summary,
    },
    assetWeights: getAssetWeightRows().map((row) => ({ label: row.label, weightPct: roundForContext(row.weight) })),
    sectorThemeWeights: getThemeWeightRows().map((row) => ({ label: row.label, weightPct: roundForContext(row.weight), valueEUR: roundForContext(row.value) })),
    holdings: getHoldingWeightRows().slice(0, 30).map((row) => {
      const holding = getHoldingForAnalysis(row.symbol);
      const analysis = getAnalysisForHolding(holding);
      const news = getNewsSentimentForSymbol(row.symbol);
      return {
        ticker: row.symbol,
        name: row.name,
        class: displayAssetClass(holding.assetClass || ""),
        sectorTheme: getHoldingSectorTheme(holding),
        sector: cleanSectorLabel(analysis.sector || ""),
        quantity: roundForContext(holding.quantity),
        price: roundForContext(holding.price),
        currency: holding.currency,
        valueEUR: roundForContext(row.value),
        costEUR: roundForContext(getCostBasisEUR(holding)),
        weightPct: roundForContext(row.weight),
        unrealizedGainEUR: roundForContext(getHoldingGainEUR(holding)),
        gainPct: roundForContext(safePercent(getHoldingGainEUR(holding), getInvestedValueEUR(holding))),
        dayChangePct: roundForContext(Number(holding.dayChangePct) || 0),
        newsSentiment: news?.sentiment || "",
        newsRiskScore: news ? roundForContext(news.riskScore) : null,
        newsRiskFlags: news?.riskFlags || [],
        topNewsHeadline: news?.headlines?.[0]?.title || "",
      };
    }),
    closedPositions: getClosedDisplayHoldings().slice(0, 20).map((holding) => ({
      ticker: holding.symbol,
      name: getKnownCompanyName(holding.symbol, holding) || holding.name || holding.symbol,
      class: displayAssetClass(holding.assetClass || ""),
      realizedGainEUR: roundForContext(getRealizedGainEUR(holding)),
      lifetimeInvestedEUR: roundForContext(getLifetimeInvestedEUR(holding)),
    })),
    realizedByClass: getRealizedGainRows().map((row) => ({ label: row.label, realizedGainEUR: roundForContext(row.value) })),
    recentTransactions: [...state.transactions].sort(compareTransactionsDesc).slice(0, 25).map((transaction) => ({
      date: formatTransactionDate(transaction),
      type: transaction.type,
      ticker: transaction.symbol,
      quantity: roundForContext(transaction.quantity),
      price: roundForContext(transaction.price),
      fees: roundForContext(transaction.fees),
      currency: transaction.currency,
      impactEUR: roundForContext(transaction.cashImpactEUR),
    })),
    watchlists: state.watchlists.map((watchlist) => ({
      title: watchlist.title,
      theme: watchlist.theme,
      createdAt: watchlist.createdAt,
      tickers: watchlist.items.map((item) => ({ ticker: item.ticker, name: item.name, reason: item.reason })),
    })),
  };
}

function buildCuratedWatchlistResponse(message) {
  const watchlist = buildThematicWatchlistAction(message);
  return {
    reply: `I built a curated research watchlist for ${watchlist.theme}. This is not a buy list; use it to open each ticker and check valuation, financials, catalysts, analyst targets, and whether it actually fits your portfolio.`,
    actions: [watchlist],
  };
}
function roundForContext(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number * 100) / 100 : 0;
}
function wireFloatingActions() {
  const globalAddButton = document.getElementById("globalAddButton");
  const globalAddMenu = document.getElementById("globalAddMenu");

  globalAddButton.addEventListener("click", () => {
    const open = globalAddMenu.hidden;
    globalAddMenu.hidden = !open;
    globalAddButton.setAttribute("aria-expanded", String(open));
  });

  globalAddMenu.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    globalAddMenu.hidden = true;
    globalAddButton.setAttribute("aria-expanded", "false");
    if (button.dataset.action === "import") {
      openModal("importModal");
    }
    if (button.dataset.action === "download-csv") {
      downloadPortfolioCsv();
    }
    if (button.dataset.action === "transaction") {
      openTransactionModal();
    }
    if (button.dataset.action === "ticker") {
      openModal("tickerModal");
    }
  });

  document.getElementById("activityAddTransaction").addEventListener("click", () => openTransactionModal());
  document.getElementById("toggleTransactions").addEventListener("click", () => {
    state.transactionsExpanded = !state.transactionsExpanded;
    renderTransactions();
  });
  document.getElementById("modalBackdrop").addEventListener("click", closeModals);
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModals();
  });
}

function wireModalForms() {
  const transactionForm = document.getElementById("transactionForm");
  transactionForm.addEventListener("input", (event) => {
    if (event.target.id === "transactionTickerSearch") {
      hydrateTransactionFromTicker();
      setStatus("transactionStatus", "", "");
    }
    updateTransactionPreview();
  });
  transactionForm.addEventListener("change", (event) => {
    if (event.target.id === "transactionPlatform") renderTransactionTickerOptions();
    if (event.target.id === "transactionTickerSearch") hydrateTransactionFromTicker();
    if (event.target.id === "transactionType") updateTransactionMode();
    updateTransactionPreview();
  });
  transactionForm.addEventListener("submit", addTransaction);
  document.getElementById("transactionAddTicker").addEventListener("click", addTickerFromTransactionSearch);
  document.getElementById("deleteTransaction").addEventListener("click", deleteEditingTransaction);

  document.getElementById("transactionsBody").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-edit-transaction]");
    if (!button) return;
    openTransactionModal(button.dataset.editTransaction);
  });
  document.getElementById("transactionsBody").addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-select-transaction]");
    if (!checkbox) return;
    updateSelectedTransaction(checkbox.dataset.selectTransaction, checkbox.checked);
    renderBulkTransactionBar();
  });

  document.querySelectorAll(".platform-icon-picker").forEach((picker) => {
    picker.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-platform]");
      if (!button) return;
      const inputId = getPlatformInputIdForPicker(picker.id);
      if (!inputId) return;
      setPlatformValue(inputId, button.dataset.platform);
      renderPlatformPicker(picker.id, inputId);
      if (picker.id === "transactionPlatformPicker") {
        renderTransactionTickerOptions();
        updateTransactionPreview();
      }
    });
  });

  document.getElementById("tickerLookup").addEventListener("click", lookupTickerFromForm);
  document.getElementById("tickerSymbol").addEventListener("input", () => setStatus("tickerStatus", "", ""));
  document.getElementById("tickerForm").addEventListener("submit", addTicker);
}

function render() {
  ensureTargetsForHoldings();
  ensureTickersForHoldings();
  ensureTransactionIds();

  document.getElementById("asOfDate").textContent = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const activeProfile = getActivePortfolioProfile();
  const storageLabel = state.remoteDbAvailable ? "Database" : hasSavedHoldings() ? "Local data" : "Sample data";
  document.getElementById("dataSourceLabel").textContent = `${activeProfile.name} | ${storageLabel}`;

  renderVisibleRefreshOverlay();
  renderMarketStatus();
  renderPortfolioProfiles();
  renderSummary();
  renderFilters();
  renderBenchmarkControls();
  renderFormOptions();
  renderHoldings();
  renderWatchlists();
  renderTargets();
  renderTransactions();
  renderInvestorProfile();
  renderCharts();
  updateTransactionPreview();
  renderPortfolioChat();
}

function renderPortfolioProfiles() {
  const select = document.getElementById("portfolioProfileSelect");
  const deleteButton = document.getElementById("deletePortfolioProfile");
  if (!select || !deleteButton) return;

  select.innerHTML = state.profiles
    .map((profile) => `<option value="${escapeAttribute(profile.id)}">${escapeHtml(profile.name)}</option>`)
    .join("");
  select.value = state.activeProfileId;
  select.title = state.remoteDbAvailable ? "Profiles are stored in the database" : "Profiles are stored in this browser";
  deleteButton.disabled = state.profiles.length <= 1;
}

async function createPortfolioProfile() {
  const suggested = `Portfolio ${state.profiles.length + 1}`;
  const name = window.prompt("Name this portfolio profile", suggested);
  const cleanName = String(name || "").trim();
  if (!cleanName) return;

  const now = new Date().toISOString();
  let profile = {
    id: randomId(),
    name: cleanName.slice(0, 48),
    createdAt: now,
    updatedAt: now,
  };

  if (state.remoteDbAvailable) {
    try {
      const data = await requestDbJson("/api/profiles", {
        method: "POST",
        body: JSON.stringify({ id: profile.id, name: profile.name }),
      });
      profile = data.profile || profile;
    } catch (error) {
      setStatus("importStatus", `Database profile create failed: ${error.message}`, "error");
      return;
    }
  }

  state.profiles = [...state.profiles, profile];
  savePortfolioProfiles();
  initializeBlankPortfolioProfile(profile.id);
  switchPortfolioProfile(profile.id);
  setStatus("importStatus", `Created ${profile.name}.`, "success");
}

async function deleteActivePortfolioProfile() {
  if (state.profiles.length <= 1) {
    setStatus("importStatus", "Keep at least one portfolio profile.", "error");
    return;
  }

  const activeProfile = getActivePortfolioProfile();
  if (!window.confirm(`Delete "${activeProfile.name}" from this browser? This cannot be undone.`)) return;

  if (state.remoteDbAvailable) {
    try {
      await requestDbJson(`/api/profiles/${encodeURIComponent(activeProfile.id)}`, { method: "DELETE" });
    } catch (error) {
      setStatus("importStatus", `Database delete failed: ${error.message}`, "error");
      return;
    }
  }

  removePortfolioProfileStorage(activeProfile.id);
  state.profiles = state.profiles.filter((profile) => profile.id !== activeProfile.id);
  savePortfolioProfiles();
  switchPortfolioProfile(state.profiles[0].id);
  setStatus("importStatus", `Deleted ${activeProfile.name}.`, "success");
}

async function switchPortfolioProfile(profileId) {
  const profile = state.profiles.find((item) => item.id === profileId);
  if (!profile) return;

  activePortfolioProfileId = profile.id;
  state.activeProfileId = profile.id;
  localStorage.setItem(profileStorageKeys.activeProfileId, profile.id);

  if (state.remoteDbAvailable) {
    await loadProfileTransactionsFromDb(profile.id).catch((error) => {
      state.remoteDbMessage = `Database load failed: ${error.message}`;
    });
  } else {
    reloadActivePortfolioProfileData();
  }

  render();
  refreshMarketData({ quiet: true });
  refreshNewsSentiment({ quiet: true });
}

function reloadActivePortfolioProfileData() {
  holdings = loadHoldings();
  trackedTickers = loadTickers();
  state.targets = loadTargets();
  state.transactions = loadTransactions();
  state.fx = loadFx();
  state.benchmarkSeries = loadBenchmarkSeries();
  state.stockAnalysis = loadStockAnalysisCache();
  state.newsSentiment = loadNewsSentimentCache();
  state.manualYahooLinks = loadManualYahooLinks();
  state.watchlists = loadWatchlists();
  state.stockChartSeries = {};
  state.stockChartHoverX = null;
  state.selectedStockSymbol = "";
  state.selectedTransactionIds = new Set();
  state.transactionsExpanded = false;
  state.transactionSearch = "";
  rebuildSavedPortfolioFromTransactions();
  ensureTickersForHoldings();
  performanceData = buildPerformanceData();
}

function downloadPortfolioCsv() {
  const rows = [...state.transactions].sort(compareTransactionsDesc);
  if (!rows.length) {
    setStatus("importStatus", "No transactions to download in this portfolio.", "error");
    return;
  }

  const headers = ["Symbol", "Trade Date", "Price", "Quantity", "Fees", "Type", "Platform", "Class"];
  const csvRows = rows.map(formatTransactionExportRow);
  const csv = [headers, ...csvRows].map((row) => row.map(formatCsvCell).join(",")).join("\n");
  const profileName = slugifyFileName(getActivePortfolioProfile().name);
  const date = new Date().toISOString().slice(0, 10);
  downloadTextFile(`${profileName}-portfolio-${date}.csv`, csv, "text/csv;charset=utf-8");
  setStatus("importStatus", `Downloaded ${rows.length} transaction${rows.length === 1 ? "" : "s"} from ${getActivePortfolioProfile().name}.`, "success");
}

function formatTransactionExportRow(transaction) {
  return [
    transaction.symbol === "CASH" ? "" : transaction.symbol,
    formatExportTradeDate(transaction),
    formatCsvNumber(transaction.price),
    formatCsvNumber(transaction.quantity),
    Number(transaction.fees) ? formatCsvNumber(transaction.fees) : "",
    String(transaction.type || "").toUpperCase(),
    transaction.platform || "Other",
    formatExportAssetClass(transaction.assetClass),
  ];
}

function formatExportTradeDate(transaction) {
  const parsed = parseTradeDate(transaction.sortDate || transaction.date);
  if (!parsed) return "";
  return parsed.iso.replace(/-/g, "");
}

function formatCsvNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(Number(number.toFixed(8))).replace(/\.0+$/, "") : "";
}

function formatExportAssetClass(assetClass) {
  const normalized = String(assetClass || "").trim();
  if (/^(stocks?|equity)$/i.test(normalized)) return "Stock";
  return normalized || "Stock";
}

function formatCsvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function slugifyFileName(value) {
  return String(value || "portfolio")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "portfolio";
}

async function initializeRemotePortfolioDb() {
  state.remoteDbLoading = true;
  try {
    const status = await requestDbJson("/api/db-status", { method: "GET" });
    state.remoteDbAvailable = Boolean(status.enabled);
    if (!state.remoteDbAvailable) {
      state.remoteDbMessage = status.error || "Using browser storage.";
      return;
    }

    const data = await requestDbJson("/api/profiles", { method: "GET" });
    const profiles = Array.isArray(data.profiles) ? data.profiles.map(normalizePortfolioProfile).filter(Boolean) : [];
    if (profiles.length) {
      state.profiles = profiles;
      savePortfolioProfiles();
      const savedActive = localStorage.getItem(profileStorageKeys.activeProfileId);
      const active = profiles.find((profile) => profile.id === savedActive) || profiles[0];
      activePortfolioProfileId = active.id;
      state.activeProfileId = active.id;
      localStorage.setItem(profileStorageKeys.activeProfileId, active.id);
      await loadProfileTransactionsFromDb(active.id);
    }
    state.remoteDbMessage = "Profiles and transactions are stored in the database.";
  } catch (error) {
    state.remoteDbAvailable = false;
    state.remoteDbMessage = `Using browser storage: ${error.message}`;
  } finally {
    state.remoteDbLoading = false;
    render();
  }
}

async function loadProfileTransactionsFromDb(profileId) {
  const data = await requestDbJson(`/api/profiles/${encodeURIComponent(profileId)}/transactions`, { method: "GET" });
  state.transactions = Array.isArray(data.transactions) ? data.transactions.map(normalizeStoredTransaction).sort(compareTransactionsDesc) : [];
  saveTransactions({ skipRemoteSync: true });
  const rebuilt = rebuildPortfolioFromTransactions(state.transactions);
  state.transactions = rebuilt.transactions.sort(compareTransactionsDesc);
  saveTransactions({ skipRemoteSync: true });
  saveHoldings();
  saveTickers();
  ensureTickersForHoldings();
  performanceData = buildPerformanceData();
}

function syncActiveProfileTransactionsToDb() {
  if (!state.remoteDbAvailable || !state.activeProfileId) return;
  window.clearTimeout(syncActiveProfileTransactionsToDb.timer);
  syncActiveProfileTransactionsToDb.timer = window.setTimeout(async () => {
    try {
      await requestDbJson(`/api/profiles/${encodeURIComponent(state.activeProfileId)}/transactions`, {
        method: "PUT",
        body: JSON.stringify({ transactions: state.transactions }),
      });
      state.remoteDbMessage = "Transactions synced to database.";
    } catch (error) {
      state.remoteDbMessage = `Database sync failed: ${error.message}`;
      setStatus("importStatus", state.remoteDbMessage, "error");
    }
  }, 250);
}

async function requestDbJson(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Database request failed with HTTP ${response.status}`);
  return data;
}

function wireDonutHover(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    state.donutHover[canvasId] = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    renderDistributionCharts();
  });

  canvas.addEventListener("mouseleave", () => {
    state.donutHover[canvasId] = null;
    renderDistributionCharts();
  });
}
function renderVisibleRefreshOverlay() {
  const overlay = document.getElementById("visibleRefreshOverlay");
  if (!overlay) return;
  overlay.hidden = true;
}
function renderMarketStatus() {
  const usdToEur = state.fx.ratesToEUR.USD;
  const eurToUsd = state.fx.eurToUsd || safeRatio(1, usdToEur);
  const updated = state.fx.updatedAt ? shortTime(state.fx.updatedAt) : "fallback";
  const status = document.getElementById("marketStatus");
  const refreshButton = document.getElementById("refreshMarketData");
  const loading = state.marketRefreshing || state.newsSentimentLoading;
  const prefix = state.marketRefreshing ? "Refreshing portfolio" : state.newsSentimentLoading ? "Checking news" : "EUR view";
  const message = state.newsSentimentLoading && state.newsSentimentMessage
    ? state.newsSentimentMessage
    : state.marketMessage || `${prefix} | USD/EUR ${formatDecimal(usdToEur)} | EUR/USD ${formatDecimal(eurToUsd)} | ${updated}`;
  status.classList.toggle("is-loading", loading);
  status.innerHTML = `${loading ? `<span class="status-spinner" aria-hidden="true"></span>` : ""}<span>${escapeHtml(message)}</span>`;
  if (refreshButton) {
    refreshButton.classList.toggle("is-loading", loading);
    refreshButton.disabled = state.marketRefreshing;
  }
}

function renderSummary() {
  const visibleHoldings = getSummaryVisibleHoldings();
  const relatedHoldings = getSummaryRelatedHoldings();
  const totalValue = visibleHoldings.reduce((sum, holding) => sum + getMarketValue(holding), 0);
  const totalCost = visibleHoldings.reduce((sum, holding) => sum + getCostBasisEUR(holding), 0);
  const dayChange = visibleHoldings.reduce(
    (sum, holding) => sum + getMarketValue(holding) * (holding.dayChangePct / 100),
    0,
  );
  const unrealizedGain = totalValue - totalCost;
  const realizedGain = relatedHoldings.reduce((sum, holding) => sum + getRealizedGainEUR(holding), 0);
  const activeLabel = state.activeFilter === "All" ? "All" : state.activeFilter;
  const portfolioTotal = getTotalValue();
  const valueWeight = portfolioTotal > 0 ? clamp(safePercent(totalValue, portfolioTotal), 0, 100) : 0;

  setText("summaryClassTitle", activeLabel);
  setText("totalValue", exactEurFormatter.format(totalValue));
  setText("summaryMarketLabel", `Market Value ${exactEurFormatter.format(totalValue)}`);
  setText("dayChange", `${formatSignedEUR(dayChange)} (${formatSignedPercent(safePercent(dayChange, totalValue))})`);
  setText("unrealizedGain", `${formatSignedEUR(unrealizedGain)} (${formatSignedPercent(safePercent(unrealizedGain, totalCost))})`);
  setText("realizedGain", formatSignedEUR(realizedGain));
  setText("valueChange", `${formatSignedEUR(unrealizedGain + realizedGain)} total gain`);
  setText("dayChangePct", `${formatSignedPercent(safePercent(dayChange, totalValue))} today`);
  setText("ytdReturn", "");
  setText("benchmarkReturn", "");
  setText("cashBalance", "");
  setText("cashWeight", "");

  const bar = document.getElementById("summaryValueBar");
  if (bar) bar.style.width = `${state.activeFilter === "All" ? 100 : valueWeight}%`;

  colorBySign("valueChange", unrealizedGain + realizedGain);
  colorBySign("dayChange", dayChange);
  colorBySign("dayChangePct", dayChange);
  colorBySign("unrealizedGain", unrealizedGain);
  colorBySign("realizedGain", realizedGain);
}

function renderFilters() {
  const filterHost = document.getElementById("assetFilters");
  const classes = ["All", ...getAssetClasses()];

  if (!classes.includes(state.activeFilter)) {
    state.activeFilter = "All";
  }

  filterHost.innerHTML = classes
    .map(
      (assetClass) =>
        `<button type="button" class="${assetClass === state.activeFilter ? "active" : ""}" data-filter="${escapeAttribute(assetClass)}">${escapeHtml(assetClass)}</button>`,
    )
    .join("");
}

function renderBenchmarkControls() {
  document.getElementById("benchmarkControls").innerHTML = benchmarkDefinitions
    .map(
      (benchmark) => `
        <button class="benchmark-chip ${state.activeBenchmarks.includes(benchmark.id) ? "active" : ""}" type="button" data-benchmark="${benchmark.id}">
          <i class="legend-dot" style="background:${benchmark.color}"></i>${escapeHtml(benchmark.name)}
        </button>
      `,
    )
    .join("");
}

function renderFormOptions() {
  setSelectOptions(document.getElementById("transactionAssetClass"), getAssetClassOptions(), selectedValue("transactionAssetClass", "Equity"));
  setSelectOptions(document.getElementById("tickerAssetClass"), getAssetClassOptions(), selectedValue("tickerAssetClass", "Equity"));
  setPlatformValue("transactionPlatform", selectedValue("transactionPlatform", "Other"));
  setPlatformValue("tickerPlatform", selectedValue("tickerPlatform", "Other"));
  setPlatformValue("bulkTransactionPlatform", selectedValue("bulkTransactionPlatform", "Other"));
  renderPlatformPicker("transactionPlatformPicker", "transactionPlatform");
  renderPlatformPicker("tickerPlatformPicker", "tickerPlatform");
  renderPlatformPicker("bulkTransactionPlatformPicker", "bulkTransactionPlatform");
  renderTransactionTickerOptions();
  updateTickerCount();
}

function renderTransactionTickerOptions() {
  const datalist = document.getElementById("transactionTickerOptions");
  const tickers = uniqueBy(getOpenTickers(), (ticker) => ticker.symbol);

  datalist.innerHTML = tickers
    .map((ticker) => {
      const label = `${ticker.name || ticker.symbol} | ${ticker.assetClass} | ${ticker.currency}`;
      return `<option value="${escapeAttribute(formatTickerOption(ticker))}" label="${escapeAttribute(label)}"></option>`;
    })
    .join("");

  hydrateTransactionFromTicker();
  updateTransactionMode();
}

function hydrateTransactionFromTicker() {
  const ticker = getSelectedTicker();
  const searchValue = document.getElementById("transactionTickerSearch").value;
  if (!ticker) {
    const { symbol } = parseTickerSearchValue(searchValue);
    if (symbol) {
      const assetClass = document.getElementById("transactionAssetClass").value || inferAssetClassFromSymbol(symbol);
      document.getElementById("transactionCurrency").value = inferCurrencyForSymbol(symbol, document.getElementById("transactionCurrency").value, assetClass);
    }
    return;
  }
  setPlatformValue("transactionPlatform", ticker.platform);
  renderPlatformPicker("transactionPlatformPicker", "transactionPlatform");
  document.getElementById("transactionAssetClass").value = ticker.assetClass;
  document.getElementById("transactionCurrency").value = ticker.currency;
  const priceInput = document.getElementById("transactionPrice");
  if (!priceInput.value && ticker.price) {
    priceInput.value = roundForInput(ticker.price);
  }
}

function updateTransactionMode() {
  const type = document.getElementById("transactionType").value;
  const tickerSearch = document.getElementById("transactionTickerSearch");
  const addTickerButton = document.getElementById("transactionAddTicker");
  const assetClassSelect = document.getElementById("transactionAssetClass");
  const cashType = ["deposit", "withdraw", "fee"].includes(type);

  tickerSearch.disabled = cashType;
  addTickerButton.disabled = cashType;
  if (cashType) {
    tickerSearch.value = "";
    assetClassSelect.value = "Cash";
  }
}

function updateTickerCount() {
  document.getElementById("tickerCount").textContent = `${trackedTickers.length} ${trackedTickers.length === 1 ? "ticker" : "tickers"}`;
}

async function lookupTickerFromForm() {
  const symbol = normalizeSymbol(document.getElementById("tickerSymbol").value);

  if (!symbol) {
    setStatus("tickerStatus", "Enter a ticker first.", "error");
    return;
  }

  const lookupTicker = {
    symbol,
    name: document.getElementById("tickerName").value.trim() || symbol,
    assetClass: document.getElementById("tickerAssetClass").value || inferAssetClassFromSymbol(symbol),
    platform: normalizePlatform(document.getElementById("tickerPlatform").value),
    currency: document.getElementById("tickerCurrency").value,
    price: parseNumber(document.getElementById("tickerPrice").value) || 0,
    dayChangePct: 0,
    risk: defaultRiskForClass(document.getElementById("tickerAssetClass").value),
  };

  setStatus("tickerStatus", "Looking up latest price...", "");

  try {
    const quote = await fetchLatestQuote(lookupTicker);
    if (!quote) {
      setStatus("tickerStatus", "No quote found. You can still add it manually.", "error");
      return;
    }

    document.getElementById("tickerCurrency").value = quote.currency;
    document.getElementById("tickerPrice").value = roundForInput(quote.price);
    if (!document.getElementById("tickerName").value.trim()) {
      document.getElementById("tickerName").value = symbol;
    }
    setStatus(
      "tickerStatus",
      `Found ${formatMoney(quote.price, quote.currency)} from ${quote.sourceSymbol || symbol}.`,
      "success",
    );
  } catch (error) {
    setStatus("tickerStatus", `Lookup failed: ${error.message}`, "error");
  }
}

function renderHoldings() {
  const openRows = getHoldingTableRows(getDisplayHoldings());
  const closedRows = getHoldingTableRows(getClosedDisplayHoldings());

  document.getElementById("holdingsBody").innerHTML = renderHoldingTableRows(
    openRows,
    "No open holdings match the current view.",
  );

  const closedBody = document.getElementById("closedPositionsBody");
  if (closedBody) {
    closedBody.innerHTML = renderHoldingTableRows(
      closedRows,
      "No closed positions yet.",
    );
  }
}


function wireWatchlists() {
  const section = document.getElementById("watchlist");
  if (!section) return;

  section.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-watchlist]");
    if (removeButton) {
      removeWatchlist(removeButton.dataset.removeWatchlist);
      return;
    }

    const tickerButton = event.target.closest("[data-watchlist-symbol]");
    if (!tickerButton) return;
    openStockAnalysis(tickerButton.dataset.watchlistSymbol);
  });
}

function getSafeKnownCompanyName(symbol) {
  try {
    return getKnownCompanyName(symbol) || "";
  } catch {
    return "";
  }
}
function renderWatchlists() {
  const section = document.getElementById("watchlist");
  const body = document.getElementById("watchlistBody");
  if (!section || !body) return;

  section.hidden = !state.watchlists.length;
  body.innerHTML = state.watchlists.map(renderWatchlistCard).join("");
}

function renderWatchlistCard(watchlist) {
  const created = formatWatchlistDate(watchlist.createdAt);
  return `
    <article class="watchlist-card">
      <div class="watchlist-card-header">
        <div>
          <p class="label">${escapeHtml(watchlist.theme || "Research")}</p>
          <h3>${escapeHtml(watchlist.title || "Research watchlist")}</h3>
          <span>${escapeHtml(created)} | ${watchlist.items.length} tickers | Research only</span>
        </div>
        <button class="secondary-button compact-button" type="button" data-remove-watchlist="${escapeAttribute(watchlist.id)}">Remove</button>
      </div>
      <div class="watchlist-items">
        ${watchlist.items.map(renderWatchlistItem).join("")}
      </div>
    </article>
  `;
}

function renderWatchlistItem(item) {
  const symbol = normalizeSymbol(item.ticker || item.symbol);
  const name = item.name && item.name !== symbol ? item.name : getSafeKnownCompanyName(symbol) || "Open analysis";
  const details = [item.sectorTheme, item.risk].filter(Boolean).join(" | ");
  return `
    <article class="watchlist-item">
      <button class="watchlist-symbol" type="button" data-watchlist-symbol="${escapeAttribute(symbol)}" aria-label="Open analysis for ${escapeAttribute(symbol)}">
        <strong>${escapeHtml(symbol)}</strong>
        <span>${escapeHtml(name)}</span>
      </button>
      <p>${escapeHtml(item.reason || "Research candidate generated by Ginjerel.")}</p>
      ${details ? `<span class="watchlist-meta">${escapeHtml(details)}</span>` : ""}
    </article>
  `;
}

function renderChatActions(actions, messageIndex) {
  const safeActions = Array.isArray(actions) ? actions : [];
  if (!safeActions.length) return "";
  return `<div class="ai-chat-actions">${safeActions.map((action, actionIndex) => renderChatAction(action, messageIndex, actionIndex)).join("")}</div>`;
}

function renderChatAction(action, messageIndex, actionIndex) {
  if (action?.type !== "watchlist") return "";
  const items = Array.isArray(action.items) ? action.items.slice(0, WATCHLIST_ACTION_LIMIT) : [];
  return `
    <article class="ai-action-card">
      <div class="ai-action-card-header">
        <div>
          <p class="label">Research watchlist</p>
          <h4>${escapeHtml(action.title || "Watchlist")}</h4>
        </div>
        <button class="primary-button compact-button" type="button" data-chat-action="add-watchlist" data-message-index="${messageIndex}" data-action-index="${actionIndex}">Add</button>
      </div>
      <div class="ai-action-items">
        ${items.map((item) => `
          <button type="button" data-chat-action="open-ticker" data-chat-symbol="${escapeAttribute(item.ticker)}">
            <strong>${escapeHtml(item.ticker)}</strong>
            <span>${escapeHtml(item.name || item.reason || "Research candidate")}</span>
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function handleChatActionClick(event) {
  const button = event.target.closest("[data-chat-action]");
  if (!button) return;

  const actionType = button.dataset.chatAction;
  if (actionType === "open-ticker") {
    openStockAnalysis(button.dataset.chatSymbol);
    return;
  }

  if (actionType !== "add-watchlist") return;
  const action = getChatAction(button.dataset.messageIndex, button.dataset.actionIndex);
  const watchlist = addWatchlistFromAction(action);
  if (!watchlist) return;
  setChatStatus(`Added ${watchlist.title} with ${watchlist.items.length} tickers.`, "success");
  render();
}

function getChatAction(messageIndex, actionIndex) {
  const message = state.chatMessages[Number(messageIndex)];
  return message?.actions?.[Number(actionIndex)] || null;
}

function normalizeChatActions(actions, sourceMessage = "", options = {}) {
  const normalized = (Array.isArray(actions) ? actions : [])
    .map(normalizeWatchlistAction)
    .filter(Boolean)
    .map((action) => completeWatchlistWithCuratedCandidates(action, sourceMessage));

  if (options.allowFallback && !normalized.length && isWatchlistPrompt(sourceMessage)) {
    normalized.push(buildThematicWatchlistAction(sourceMessage));
  }

  return normalized;
}

function completeWatchlistWithCuratedCandidates(action, sourceMessage = "") {
  if (!action || action.type !== "watchlist") return action;
  const theme = formatWatchlistTheme(action.theme || extractWatchlistTheme(sourceMessage || action.title));
  const curatedItems = getThemeWatchlistCandidates(theme);
  if (!curatedItems.length) return action;

  const existingSymbols = new Set(action.items.map((item) => normalizeSymbol(item.ticker)));
  const mustHave = curatedItems.filter((item) => !existingSymbols.has(normalizeSymbol(item.ticker))).slice(0, Math.max(0, WATCHLIST_ACTION_LIMIT - action.items.length));
  return {
    ...action,
    theme: action.theme || theme,
    items: [...action.items, ...mustHave].slice(0, WATCHLIST_ACTION_LIMIT),
  };
}

function normalizeWatchlistAction(action) {
  if (!action || action.type !== "watchlist") return null;
  const theme = formatWatchlistTheme(action.theme || extractWatchlistTheme(action.title) || "Research");
  const items = (Array.isArray(action.items) ? action.items : [])
    .map((item) => {
      const ticker = normalizeSymbol(item.ticker || item.symbol || "");
      if (!ticker) return null;
      const assetClass = String(item.assetClass || item.class || "Stocks").trim() || "Stocks";
      const rawName = String(item.name || item.company || item.companyName || "").trim();
      const cleanName = cleanCompanyNameCandidate(ticker, rawName) || rawName || getSafeKnownCompanyName(ticker) || ticker;
      return {
        ticker,
        name: cleanName,
        assetClass,
        currency: normalizeCurrency(item.currency || inferCurrencyForSymbol(ticker, "", assetClass)),
        sectorTheme: String(item.sectorTheme || item.theme || theme).trim(),
        reason: String(item.reason || item.thesis || "Research candidate to review.").trim(),
        risk: String(item.risk || item.riskNote || "").trim(),
      };
    })
    .filter(Boolean)
    .slice(0, WATCHLIST_ACTION_LIMIT);

  if (!items.length) return null;
  return {
    type: "watchlist",
    title: String(action.title || `${theme} Research Watchlist`).trim(),
    theme,
    items,
  };
}

function addWatchlistFromAction(action) {
  const normalized = normalizeWatchlistAction(action);
  if (!normalized) return null;

  const now = new Date().toISOString();
  const signature = getWatchlistSignature(normalized);
  const existingIndex = state.watchlists.findIndex((watchlist) => getWatchlistSignature(watchlist) === signature || watchlist.title === normalized.title);
  const existing = existingIndex >= 0 ? state.watchlists[existingIndex] : null;
  const watchlist = {
    ...normalized,
    id: existing?.id || randomId(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  if (existingIndex >= 0) state.watchlists.splice(existingIndex, 1);
  state.watchlists = [watchlist, ...state.watchlists].slice(0, 12);
  watchlist.items.forEach(ensureTickerForWatchlistItem);
  saveWatchlists();
  saveTickers();
  updateTickerCount();
  return watchlist;
}

function ensureTickerForWatchlistItem(item) {
  const symbol = normalizeSymbol(item.ticker || item.symbol);
  if (!symbol) return;
  trackedTickers = mergeTickers(trackedTickers, [
    {
      symbol,
      name: item.name || symbol,
      assetClass: item.assetClass || inferAssetClassFromSymbol(symbol),
      platform: "Other",
      currency: item.currency || inferCurrencyForSymbol(symbol, "", item.assetClass),
      price: 0,
      dayChangePct: 0,
      risk: defaultRiskForClass(item.assetClass || inferAssetClassFromSymbol(symbol)),
    },
  ]);
}

function removeWatchlist(id) {
  state.watchlists = state.watchlists.filter((watchlist) => watchlist.id !== id);
  saveWatchlists();
  renderWatchlists();
}

function getWatchlistSignature(watchlist) {
  return (watchlist.items || []).map((item) => normalizeSymbol(item.ticker || item.symbol)).filter(Boolean).sort().join("|");
}

function isWatchlistPrompt(message) {
  return /watch\s*list|watchlist|shortlist|research\s+list|radar|lista/i.test(String(message || ""));
}

function extractWatchlistTheme(message) {
  const cleaned = String(message || "")
    .replace(/watch\s*list|watchlist/gi, " ")
    .replace(/\b(build|create|make|give\s+me|find|show|suggest|about|around|for|of|me|a|an|the|stocks?|tickers?|companies|please)\b/gi, " ")
    .replace(/[^a-z0-9 +&-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "AI stocks";
}

function buildThematicWatchlistAction(message) {
  const theme = formatWatchlistTheme(extractWatchlistTheme(message));
  return normalizeWatchlistAction({
    type: "watchlist",
    title: `${theme} Research Watchlist`,
    theme,
    items: getThemeWatchlistCandidates(theme),
  });
}

function getThemeWatchlistCandidates(theme) {
  const key = String(theme || "").toLowerCase();
  if (/cyber|security|seguranca/.test(key)) {
    return [
      watchlistCandidate("CRWD", "CrowdStrike Holdings", "Endpoint security and cloud-native threat detection.", "Cybersecurity", "High growth, high valuation sensitivity"),
      watchlistCandidate("PANW", "Palo Alto Networks", "Large cyber platform with network, cloud, and AI security exposure.", "Cybersecurity", "Execution and valuation risk"),
      watchlistCandidate("ZS", "Zscaler", "Zero-trust security platform with enterprise cloud exposure.", "Cybersecurity", "High multiple, growth-dependent"),
      watchlistCandidate("FTNT", "Fortinet", "Profitable security hardware and software platform.", "Cybersecurity", "Hardware cycle sensitivity"),
      watchlistCandidate("NET", "Cloudflare", "Edge network, security, and developer platform.", "Cybersecurity", "Premium valuation"),
    ];
  }

  if (/quantum|qubit|qpu/.test(key)) {
    return [
      watchlistCandidate("RGTI", "Rigetti Computing, Inc.", "Pure-play superconducting quantum computing company; this is one of the obvious names to check in quantum watchlists.", "Quantum computing", "Very speculative, revenue and dilution risk"),
      watchlistCandidate("IONQ", "IonQ, Inc.", "Pure-play trapped-ion quantum platform with cloud access and quantum networking/security exposure.", "Quantum computing", "High valuation and commercialization timing risk"),
      watchlistCandidate("QBTS", "D-Wave Quantum Inc.", "Pure-play quantum annealing and hybrid quantum solver company.", "Quantum computing", "Very volatile, path-to-profitability risk"),
      watchlistCandidate("QUBT", "Quantum Computing Inc.", "Small-cap quantum photonics and optimization hardware/software exposure.", "Quantum computing", "Micro/small-cap execution and liquidity risk"),
      watchlistCandidate("IBM", "International Business Machines Corporation", "Large-cap quantum computing platform with IBM Quantum and enterprise research depth.", "Quantum computing", "Quantum is only a small part of total IBM"),
      watchlistCandidate("GOOGL", "Alphabet Inc.", "Google Quantum AI gives diversified exposure through a mega-cap with deep quantum research.", "Quantum computing", "Quantum contribution is indirect"),
      watchlistCandidate("MSFT", "Microsoft Corporation", "Azure Quantum and enterprise quantum ecosystem exposure inside a diversified software/cloud business.", "Quantum computing", "Quantum contribution is indirect"),
      watchlistCandidate("QTUM", "Defiance Quantum ETF", "ETF-style basket for broader quantum and next-gen computing exposure.", "Quantum computing ETF", "ETF holdings may include broad semis/tech beyond pure quantum"),
    ];
  }
  if (/semi|chip|semiconductor|hardware/.test(key)) {
    return [
      watchlistCandidate("NVDA", "NVIDIA Corporation", "AI accelerator leader and data-center GPU benchmark.", "Semiconductors", "Very crowded AI trade"),
      watchlistCandidate("AMD", "Advanced Micro Devices", "CPU and GPU challenger with AI accelerator ambitions.", "Semiconductors", "Competitive AI execution risk"),
      watchlistCandidate("TSM", "Taiwan Semiconductor Manufacturing", "Critical foundry for advanced AI chips.", "Semiconductors", "Geopolitical concentration risk"),
      watchlistCandidate("ASML", "ASML Holding", "EUV lithography supplier for advanced semiconductor manufacturing.", "Semiconductors", "Cyclical capex risk"),
      watchlistCandidate("AVGO", "Broadcom Inc.", "Networking silicon and custom AI accelerator exposure.", "Semiconductors", "Integration and cycle risk"),
      watchlistCandidate("MU", "Micron Technology", "Memory supplier exposed to AI server demand.", "Semiconductors", "Highly cyclical earnings"),
    ];
  }

  if (/crypto|bitcoin|blockchain/.test(key)) {
    return [
      watchlistCandidate("COIN", "Coinbase Global", "Crypto exchange and custody infrastructure exposure.", "Crypto infrastructure", "Regulatory and crypto-cycle risk"),
      watchlistCandidate("MSTR", "MicroStrategy", "High beta Bitcoin treasury exposure.", "Crypto infrastructure", "Very high volatility"),
      watchlistCandidate("HOOD", "Robinhood Markets", "Retail trading platform with crypto revenue exposure.", "Trading platforms", "Retail activity sensitivity"),
      watchlistCandidate("IBIT", "iShares Bitcoin Trust", "Spot Bitcoin ETF exposure without exchange operating risk.", "Crypto", "Bitcoin price volatility"),
    ];
  }

  if (/dividend|income|yield/.test(key)) {
    return [
      watchlistCandidate("JNJ", "Johnson & Johnson", "Defensive healthcare dividend compounder.", "Healthcare", "Legal and pipeline risk"),
      watchlistCandidate("PG", "Procter & Gamble", "Consumer staples dividend quality.", "Consumer staples", "Slower growth profile"),
      watchlistCandidate("KO", "Coca-Cola", "Global beverage cash-flow profile.", "Consumer staples", "Valuation and FX sensitivity"),
      watchlistCandidate("PEP", "PepsiCo", "Snacks and beverages with dividend history.", "Consumer staples", "Margin pressure risk"),
      watchlistCandidate("MCD", "McDonald's", "Global franchise cash-flow model.", "Consumer discretionary", "Consumer slowdown risk"),
    ];
  }

  if (/energy|renewable|solar|clean/.test(key)) {
    return [
      watchlistCandidate("XOM", "Exxon Mobil", "Integrated energy major with cash-flow scale.", "Energy", "Oil and gas cycle risk"),
      watchlistCandidate("CVX", "Chevron", "Integrated energy major with shareholder return focus.", "Energy", "Commodity price risk"),
      watchlistCandidate("NEE", "NextEra Energy", "Utility and renewables exposure.", "Utilities", "Rates and project execution risk"),
      watchlistCandidate("FSLR", "First Solar", "US solar manufacturing and utility-scale solar exposure.", "Clean energy", "Policy and margin risk"),
      watchlistCandidate("ENPH", "Enphase Energy", "Solar inverter and home energy systems.", "Clean energy", "Residential solar cycle risk"),
    ];
  }

  return [
    watchlistCandidate("NVDA", "NVIDIA Corporation", "Core AI compute and accelerator exposure.", "AI", "Very crowded AI trade"),
    watchlistCandidate("MSFT", "Microsoft Corporation", "Cloud AI platform plus enterprise AI distribution through Azure and Copilot.", "AI", "Mega-cap valuation risk"),
    watchlistCandidate("GOOGL", "Alphabet Inc.", "AI research, search, ads, cloud, and custom TPU infrastructure.", "AI", "Search disruption and regulation"),
    watchlistCandidate("AMD", "Advanced Micro Devices", "AI accelerator challenger with data-center growth optionality.", "AI semiconductors", "Competitive execution risk"),
    watchlistCandidate("TSM", "Taiwan Semiconductor Manufacturing", "Manufactures leading-edge chips used by AI leaders.", "AI semiconductors", "Geopolitical concentration risk"),
    watchlistCandidate("ASML", "ASML Holding", "EUV lithography supplier enabling advanced AI chips.", "AI semiconductors", "Cyclical capex risk"),
    watchlistCandidate("AVGO", "Broadcom Inc.", "Networking and custom silicon for AI infrastructure.", "AI infrastructure", "Integration and cycle risk"),
    watchlistCandidate("META", "Meta Platforms", "AI-driven ads, recommendation systems, and open AI model strategy.", "AI platforms", "Regulatory and capex risk"),
  ];
}

function watchlistCandidate(ticker, name, reason, sectorTheme, risk) {
  return { ticker, name, reason, sectorTheme, risk, assetClass: "Stocks", currency: "USD" };
}

function formatWatchlistTheme(value) {
  const text = String(value || "Research").trim().replace(/\s+/g, " ");
  return text.split(" ").map((word) => {
    if (/^ai$/i.test(word)) return "AI";
    if (/^etf$/i.test(word)) return "ETF";
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
  }).join(" ");
}

function formatWatchlistDate(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return "Today";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
function getHoldingTableRows(sourceHoldings) {
  return sourceHoldings
    .map((holding) => ({
      ...holding,
      marketValue: getMarketValue(holding),
      investedValue: getInvestedValueEUR(holding),
      gain: getHoldingGainEUR(holding),
      realizedGainEUR: getRealizedGainEUR(holding),
      avgPrice: getAveragePriceNative(holding),
      dayGainEur: isHoldingOpen(holding) ? getMarketValue(holding) * (holding.dayChangePct / 100) : 0,
      gainPct: safePercent(getHoldingGainEUR(holding), getInvestedValueEUR(holding)),
      status: isHoldingOpen(holding) ? "Open" : "Closed",
    }))
    .filter((holding) => state.activeFilter === "All" || holding.assetClass === state.activeFilter)
    .filter((holding) => {
      if (!state.search) return true;
      return `${holding.symbol} ${holding.name} ${holding.assetClass} ${holding.platform} ${holding.status}`.toLowerCase().includes(state.search);
    })
    .sort(sortHoldingRows);
}

function sortHoldingRows(a, b) {
  if (a.status !== b.status) return a.status === "Closed" ? 1 : -1;
  const aValue = a[state.sortKey];
  const bValue = b[state.sortKey];
  const direction = state.sortDirection === "asc" ? 1 : -1;
  return typeof aValue === "string"
    ? aValue.localeCompare(bValue) * direction
    : ((Number(aValue) || 0) - (Number(bValue) || 0)) * direction;
}

function renderHoldingTableRows(rows, emptyMessage) {
  return rows.length
    ? rows.map(renderHoldingRow).join("")
    : `<tr class="empty-row"><td colspan="12">${escapeHtml(emptyMessage)}</td></tr>`;
}

function renderHoldingRow(holding) {
  const name = getHoldingDisplayName(holding);
  return `
    <tr>
      <td>
        <button class="stock-link symbol-cell${hasWideCompanyLogo(holding) ? " symbol-cell-wide" : ""}" type="button" data-stock-symbol="${escapeAttribute(holding.symbol)}" aria-label="Open analysis for ${escapeAttribute(holding.symbol)}">
          ${renderCompanyLogo(holding)}
          <span>
            <strong>${escapeHtml(holding.symbol)}</strong>
            ${name ? `<span>${escapeHtml(name)}</span>` : ""}
          </span>
        </button>
      </td>
      <td class="number">${formatQuantity(holding.quantity)}</td>
      <td class="number">${formatDecimal(holding.avgPrice)}</td>
      <td class="number">${formatDecimal(holding.price)}</td>
      <td class="number">${eurFormatter.format(holding.investedValue)}</td>
      <td class="number">${eurFormatter.format(holding.marketValue)}</td>
      <td class="number ${holding.gain >= 0 ? "positive" : "negative"}">${formatSignedEUR(holding.gain)}</td>
      <td class="number ${holding.gainPct >= 0 ? "positive" : "negative"}">${formatSignedPercent(holding.gainPct)}</td>
      <td class="number ${holding.dayGainEur >= 0 ? "positive" : "negative"}">${formatSignedEUR(holding.dayGainEur)}</td>
      <td class="number ${holding.dayChangePct >= 0 ? "positive" : "negative"}">${formatSignedPercent(holding.dayChangePct)}</td>
      <td><span class="pill">${escapeHtml(holding.assetClass)}</span></td>
      <td><span class="pill ${holding.status === "Closed" ? "status-closed" : "status-open"}">${holding.status}</span></td>
    </tr>
  `;
}

function getHoldingDisplayName(holding) {
  return getKnownCompanyName(holding.symbol, holding);
}

function getKnownCompanyName(symbol, holding = null) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  const override = companyNameOverrides[normalized] || companyNameOverrides[baseSymbol];
  if (override) return override;

  const candidates = [
    holding?.name,
    trackedTickers.find((ticker) => ticker.symbol === normalized)?.name,
    trackedTickers.find((ticker) => getBaseTickerSymbol(ticker.symbol) === baseSymbol)?.name,
    holdings.find((item) => item.symbol === normalized && item.name)?.name,
    state.transactions.find((transaction) => transaction.symbol === normalized && transaction.name)?.name,
    state.stockAnalysis[normalized]?.name,
    state.stockAnalysis[baseSymbol]?.name,
  ];

  const name = candidates
    .map((value) => cleanCompanyNameCandidate(normalized, value))
    .find((value) => value && normalizeSymbol(value) !== normalized && normalizeSymbol(value) !== baseSymbol);

  return name || "";
}

function renderCompanyLogo(holding) {
  const symbol = normalizeSymbol(holding.symbol);
  const baseSymbol = getBaseTickerSymbol(symbol);
  const logoSymbol = companyLogoSymbolOverrides[symbol] || companyLogoSymbolOverrides[baseSymbol] || baseSymbol;
  const logoUrl =
    companyLogoUrlOverrides[symbol] ||
    companyLogoUrlOverrides[baseSymbol] ||
    `https://financialmodelingprep.com/image-stock/${encodeURIComponent(logoSymbol)}.png`;
  const fallback = logoSymbol.slice(0, 2) || "?";
  const wideClass = hasWideCompanyLogo(holding) ? " company-logo-wide" : "";
  return `
    <span class="company-logo${wideClass}" title="${escapeAttribute(getHoldingDisplayName(holding) || symbol)}">
      <img src="${escapeAttribute(logoUrl)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
      <span class="company-logo-fallback" hidden>${escapeHtml(fallback)}</span>
    </span>
  `;
}

function hasWideCompanyLogo(holding) {
  const symbol = normalizeSymbol(holding.symbol);
  const baseSymbol = getBaseTickerSymbol(symbol);
  return wideCompanyLogoOverrides.has(symbol) || wideCompanyLogoOverrides.has(baseSymbol);
}

function openStockAnalysis(symbol) {
  const normalized = normalizeSymbol(symbol);
  if (!normalized) return;

  state.selectedStockSymbol = normalized;
  state.stockChartHoverX = null;
  const holding = getHoldingForAnalysis(normalized);
  renderStockAnalysisModal(normalized, holding, state.stockAnalysis[normalized] || null, true);
  openModal("stockModal");
  resetStockModalScroll();
  setStatus("stockAnalysisStatus", "Fetching market data...", "");
  refreshNewsSentimentForSymbols([normalized], { quiet: true });
  loadStockChartSeriesForSymbol(normalized, holding);

  refreshQuoteForSymbol(normalized, holding).catch(() => null);

  fetchStockAnalysisData(normalized, getHoldingForAnalysis(normalized), { force: true })
    .then((analysis) => {
      if (state.selectedStockSymbol !== normalized) return;
      state.stockAnalysis[normalized] = analysis;
      saveHoldings();
      saveTickers();
      saveStockAnalysisCache();
      if (analysis.name) applyTickerName(normalized, analysis.name);
      renderStockAnalysisModal(normalized, getHoldingForAnalysis(normalized), analysis, false);
      renderHoldings();
      setStatus("stockAnalysisStatus", analysis.source ? `Data from ${analysis.source}. Not financial advice.` : "Analysis updated.", "success");
    })
    .catch((error) => {
      if (state.selectedStockSymbol !== normalized) return;
      renderStockAnalysisModal(normalized, holding, state.stockAnalysis[normalized] || null, false);
      setStatus("stockAnalysisStatus", `Could not fetch online data: ${error.message}`, "error");
    });
}

function getHoldingForAnalysis(symbol) {
  const normalized = normalizeSymbol(symbol);
  return holdings.find((holding) => holding.symbol === normalized && isHoldingOpen(holding))
    || holdings.find((holding) => holding.symbol === normalized)
    || trackedTickers.find((ticker) => ticker.symbol === normalized)
    || { symbol: normalized, name: getKnownCompanyName(normalized), assetClass: inferAssetClassFromSymbol(normalized), currency: inferCurrencyForSymbol(normalized), quantity: 0, price: 0, dayChangePct: 0 };
}

function renderStockAnalysisModal(symbol, holding, analysis, loading) {
  const normalized = normalizeSymbol(symbol);
  const merged = { ...holding, ...(analysis || {}) };
  const name = cleanCompanyNameCandidate(normalized, analysis?.name) || getKnownCompanyName(normalized, holding) || "Company name loading";
  const logoHolding = { ...holding, symbol: normalized, name };

  document.getElementById("stockAnalysisLogo").innerHTML = renderCompanyLogo(logoHolding);
  document.getElementById("stockAnalysisTicker").textContent = normalized;
  document.getElementById("stockAnalysisName").textContent = name;
  document.getElementById("stockAnalysisContent").innerHTML = renderStockAnalysisContent(normalized, holding, merged, loading);
  const manualInput = document.getElementById("stockManualYahooUrl");
  if (manualInput) manualInput.value = state.manualYahooLinks[normalized]?.url || "";
}

function resetStockModalScroll() {
  window.setTimeout(() => {
    document.querySelector("#stockModal .modal-panel")?.scrollTo({ top: 0, left: 0 });
    document.getElementById("stockAnalysisContent")?.scrollTo({ top: 0, left: 0 });
  }, 0);
}

function saveManualYahooLinkFromModal() {
  const symbol = normalizeSymbol(state.selectedStockSymbol);
  const input = document.getElementById("stockManualYahooUrl");
  if (!symbol || !input) return;

  const rawUrl = input.value.trim();
  if (!rawUrl) {
    delete state.manualYahooLinks[symbol];
    delete state.stockAnalysis[symbol];
    saveManualYahooLinks();
    saveStockAnalysisCache();
    setStatus("stockAnalysisStatus", "Manual source link cleared.", "success");
    return;
  }

  const source = extractManualSourceFromUrl(rawUrl);
  if (!source.sourceSymbol) {
    setStatus("stockAnalysisStatus", "Paste a StockAnalysis, Google Finance, MarketBeat, Nasdaq URL, or just the ticker symbol.", "error");
    return;
  }

  state.manualYahooLinks[symbol] = {
    url: rawUrl,
    provider: source.provider,
    sourceSymbol: source.sourceSymbol,
    yahooSymbol: source.sourceSymbol,
    savedAt: Date.now(),
  };
  delete state.stockAnalysis[symbol];
  saveManualYahooLinks();
  saveStockAnalysisCache();
  setStatus("stockAnalysisStatus", `Saved ${source.provider} source as ${source.sourceSymbol}. Fetching again...`, "");

  const holding = getHoldingForAnalysis(symbol);
  renderStockAnalysisModal(symbol, holding, state.stockAnalysis[symbol] || null, true);
  fetchStockAnalysisData(symbol, holding, { force: true })
    .then((analysis) => {
      if (state.selectedStockSymbol !== symbol) return;
      state.stockAnalysis[symbol] = analysis;
      saveHoldings();
      saveTickers();
      saveStockAnalysisCache();
      if (analysis.name) applyTickerName(symbol, analysis.name);
      renderStockAnalysisModal(symbol, getHoldingForAnalysis(symbol), analysis, false);
      renderHoldings();
      setStatus("stockAnalysisStatus", `Data from ${analysis.source}. Not financial advice.`, "success");
    })
    .catch((error) => {
      if (state.selectedStockSymbol !== symbol) return;
      setStatus("stockAnalysisStatus", `Still could not fetch data: ${error.message}`, "error");
    });
}

function extractManualSourceFromUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return { provider: "Manual", sourceSymbol: "" };
  if (/^[A-Z0-9._=:-]+$/i.test(raw)) return { provider: "Manual", sourceSymbol: normalizeSymbol(raw) };

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const host = url.hostname.toLowerCase();
    const path = url.pathname;
    const quoteMatch = path.match(/\/quote\/([^/?#]+)/i);
    const googleMatch = path.match(/\/finance\/(?:beta\/)?quote\/([^/?#]+)/i);
    const stockAnalysisMatch = path.match(/\/stocks\/([^/?#]+)\/(?:forecast|ratings|dividend|earnings)?/i);
    const marketBeatMatch = path.match(/\/stocks\/[^/]+\/([^/?#]+)\/(?:forecast|earnings|dividend)?/i);
    const marketWatchMatch = path.match(/\/investing\/(?:stock|fund|etf|cryptocurrency)\/([^/?#]+)/i);
    const nasdaqMatch = path.match(/\/market-activity\/(?:stocks|etf|funds|cryptocurrency)\/([^/?#]+)/i);
    const sourceSymbol = googleMatch?.[1] || quoteMatch?.[1] || (host.includes("stockanalysis") ? stockAnalysisMatch?.[1] : "") || marketBeatMatch?.[1] || marketWatchMatch?.[1] || nasdaqMatch?.[1] || url.searchParams.get("p") || "";
    const provider = host.includes("google") ? "Google Finance" : host.includes("stockanalysis") ? "StockAnalysis" : host.includes("marketbeat") ? "MarketBeat" : host.includes("marketwatch") ? "MarketWatch" : host.includes("nasdaq") ? "Nasdaq" : host.includes("yahoo") ? "Yahoo Finance" : "Manual";
    return { provider, sourceSymbol: decodeURIComponent(sourceSymbol).trim().toUpperCase() };
  } catch {
    return { provider: "Manual", sourceSymbol: normalizeSymbol(raw.replace(/^https?:\/\//i, "").split(/[/?#]/)[0]) };
  }
}

function getManualSource(symbol) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  return state.manualYahooLinks[normalized] || state.manualYahooLinks[baseSymbol] || null;
}

function getManualSourceSymbol(symbol) {
  const source = getManualSource(symbol);
  return normalizeSymbol(source?.sourceSymbol || source?.yahooSymbol || "");
}

function renderStockAnalysisContent(symbol, holding, data, loading) {
  const open = isHoldingOpen(holding);
  const marketValue = getMarketValue(holding);
  const investedValue = getInvestedValueEUR(holding);
  const gain = getHoldingGainEUR(holding);
  const gainPct = safePercent(gain, investedValue);
  const dayGain = open ? marketValue * ((Number(holding.dayChangePct) || 0) / 100) : 0;
  const weight = safePercent(marketValue, getTotalValue());
  const transactionsForSymbol = state.transactions.filter((transaction) => normalizeSymbol(transaction.symbol) === symbol);
  const price = firstForecastNumber(holding.price, data.regularMarketPrice, data.price) || 0;
  const currency = normalizeCurrency(holding.currency || data.currency || BASE_CURRENCY);
  const dayChangePct = Number(holding.dayChangePct ?? data.regularMarketChangePercent ?? data.dayChangePct) || 0;
  const dayChange = Number(data.regularMarketChange) || 0;
  const liveData = {
    ...data,
    currency,
    regularMarketPrice: price,
    price,
    regularMarketChangePercent: dayChangePct,
    dayChangePct,
  };
  const forecast = buildAnalystForecast(symbol, holding, liveData);
  const notes = buildStockAnalysisNotes({ holding, data: liveData, open, weight, gainPct, dayChangePct, transactionsForSymbol });

  return `
    <div class="stock-analysis-grid">
      <article class="analysis-card primary-analysis-card">
        <p>Position</p>
        <strong>${open ? eurFormatter.format(marketValue) : formatSignedEUR(gain)}</strong>
        <span>${open ? `${formatQuantity(holding.quantity)} shares | ${formatPercent(weight)} weight` : `Closed | realized ${formatSignedEUR(gain)}`}</span>
      </article>
      <article class="analysis-card">
        <p>Cost</p>
        <strong>${eurFormatter.format(investedValue)}</strong>
        <span>${formatSignedPercent(gainPct)} total return</span>
      </article>
      <article class="analysis-card">
        <p>Market price</p>
        <strong>${price ? formatMoney(price, currency) : "--"}</strong>
        <span class="${dayChangePct >= 0 ? "positive" : "negative"}">${formatSignedPercent(dayChangePct)} today${dayChange ? ` | ${formatMoney(dayChange, currency)}` : ""}</span>
      </article>
      <article class="analysis-card">
        <p>Avg forecast</p>
        <strong>${forecast.averageLabel || "--"}</strong>
        <span class="${Number(forecast.averageChangePct) >= 0 ? "positive" : "negative"}">${Number.isFinite(forecast.averageChangePct) ? `${formatForecastPercent(forecast.averageChangePct)} vs market` : "No analyst average yet"}</span>
      </article>
    </div>

    ${renderStockPriceChartPanel(symbol, holding, liveData)}

    ${renderCompanyProfilePanel(symbol, holding, liveData)}

    ${renderAnalystForecastPanel(symbol, holding, liveData)}

    ${renderNewsSentimentPanel(symbol)}

    <div class="stock-data-grid">
      ${renderDataPoint("Name", liveData.name || getKnownCompanyName(symbol, holding) || "--")}
      ${renderDataPoint("Exchange", liveData.fullExchangeName || liveData.exchange || "--")}
      ${renderDataPoint("Sector", liveData.sector || "--")}
      ${renderDataPoint("Industry", liveData.industry || "--")}
      ${renderDataPoint("Currency", currency)}
      ${renderDataPoint("Market cap", formatLargeNumber(liveData.marketCap, currency))}
      ${renderDataPoint("P/E", formatMaybeNumber(liveData.trailingPE ?? liveData.forwardPE))}
      ${renderDataPoint("Analysts", liveData.analystView || "--")}
      ${renderDataPoint("Price target", liveData.priceTarget || "--")}
      ${renderDataPoint("Target range", formatTargetRange(liveData.targetLow, liveData.targetHigh))}
      ${renderDataPoint("Analyst count", liveData.analystCount || "--")}
      ${renderDataPoint("Earnings", liveData.nextEarningsDate || "--")}
      ${renderDataPoint("Ex-dividend", liveData.exDividendDate || "--")}
      ${renderDataPoint("Dividend date", liveData.nextDividendDate || "--")}
      ${renderDataPoint("Dividend yield", liveData.dividendYield || "--")}
      ${renderDataPoint("52W range", formatRange(liveData.fiftyTwoWeekLow, liveData.fiftyTwoWeekHigh, currency))}
      ${renderDataPoint("Avg volume", formatLargeNumber(liveData.averageDailyVolume3Month || liveData.averageDailyVolume10Day, ""))}
      ${renderDataPoint("Source", liveData.source || (loading ? "Loading" : "Local portfolio"))}
    </div>

    <div class="analysis-notes">
      ${notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
    </div>

    ${renderStockTransactionsPanel(symbol, transactionsForSymbol)}
  `;
}

async function loadStockChartSeriesForSymbol(symbol, holding = {}) {
  const normalized = normalizeSymbol(symbol);
  const cached = state.stockChartSeries[normalized];
  if (cached?.points?.length && Date.now() - Number(cached.fetchedAt || 0) < 30 * 60 * 1000) return;

  state.stockChartSeries[normalized] = { ...(cached || {}), loading: true, error: "" };
  renderStockAnalysisModal(normalized, getHoldingForAnalysis(normalized), state.stockAnalysis[normalized] || null, false);

  try {
    const series = await fetchStockHistorySeries(normalized, holding);
    state.stockChartSeries[normalized] = { ...series, loading: false, fetchedAt: Date.now(), error: "" };
  } catch (error) {
    state.stockChartSeries[normalized] = {
      points: cached?.points || [],
      currency: holding.currency || BASE_CURRENCY,
      sourceSymbol: "",
      loading: false,
      fetchedAt: Date.now(),
      error: error.message || "Could not load chart data.",
    };
  }

  if (state.selectedStockSymbol === normalized) {
    renderStockAnalysisModal(normalized, getHoldingForAnalysis(normalized), state.stockAnalysis[normalized] || null, false);
  }
}

async function fetchStockHistorySeries(symbol, holding = {}) {
  const candidates = buildQuoteCandidates({ ...holding, symbol });
  const data = await fetchHistoricalPriceSeries(candidates, 760);

  const points = (Array.isArray(data.points) ? data.points : [])
    .map(normalizeHistoricalPricePoint)
    .filter((point) => point.date && Number.isFinite(point.value) && point.value > 0);

  if (points.length < 2) throw new Error("No historical prices found.");
  return {
    points,
    currency: normalizeCurrency(data.currency || holding.currency || BASE_CURRENCY),
    sourceSymbol: data.sourceSymbol || "",
    source: data.source || "Yahoo Finance",
  };
}

async function fetchHistoricalPriceSeries(candidates, days = 760) {
  const response = await fetch(getStockHistoryEndpoint(candidates, days), { cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Stock history server returned HTTP ${response.status}`);
  return data;
}

function normalizeHistoricalPricePoint(point) {
  const time = Date.parse(point?.date);
  return {
    date: Number.isFinite(time) ? new Date(time).toISOString() : "",
    value: Number(point?.value),
  };
}

function getStockHistoryEndpoint(candidates, days = 760) {
  const params = new URLSearchParams({
    candidates: candidates
      .slice(0, 12)
      .map((candidate) => `${candidate.symbol}:${candidate.currency}`)
      .join(","),
    days: String(clamp(Number(days) || 760, 30, 1825)),
  });
  const path = `/api/stock-history?${params.toString()}`;
  if (/^https?:$/i.test(window.location.protocol)) return path;
  return `http://localhost:8787${path}`;
}

function renderStockPriceChartPanel(symbol, holding, data) {
  const normalized = normalizeSymbol(symbol);
  const series = state.stockChartSeries[normalized] || {};
  const rawPoints = Array.isArray(series.points) ? series.points : [];
  const points = filterStockChartPoints(rawPoints, state.stockChartPeriod);
  const currency = normalizeCurrency(series.currency || data.currency || holding.currency || BASE_CURRENCY);
  const periods = ["1M", "3M", "6M", "1Y", "2Y"];

  if (series.loading && points.length < 2) {
    return `
      <section class="stock-chart-card">
        <div class="stock-chart-header">
          <div>
            <h4>Price Chart</h4>
            <p>Loading real historical prices...</p>
          </div>
          <span class="status-spinner" aria-hidden="true"></span>
        </div>
        <div class="stock-chart-empty">Fetching market history for ${escapeHtml(normalized)}.</div>
      </section>
    `;
  }

  if (points.length < 2) {
    return `
      <section class="stock-chart-card">
        <div class="stock-chart-header">
          <div>
            <h4>Price Chart</h4>
            <p>${escapeHtml(series.error || "No historical prices loaded yet.")}</p>
          </div>
          <button class="secondary-button compact-button" type="button" data-reload-stock-chart="${escapeAttribute(normalized)}">Retry</button>
        </div>
        <div class="stock-chart-empty">No chart is available for ${escapeHtml(normalized)} yet.</div>
      </section>
    `;
  }

  const first = points[0];
  const last = points[points.length - 1];
  const changePct = safePercent(last.value - first.value, first.value);
  const sourceLabel = series.sourceSymbol ? `${series.source || "Stooq"} ${series.sourceSymbol}` : (series.source || "Historical prices");

  return `
    <section class="stock-chart-card">
      <div class="stock-chart-header">
        <div>
          <h4>Price Chart</h4>
          <p>${escapeHtml(sourceLabel)} | ${points.length} sessions</p>
        </div>
        <div class="stock-chart-actions">
          ${series.loading ? `<span class="status-spinner" aria-hidden="true"></span>` : ""}
          <div class="segmented-control compact stock-chart-periods" role="tablist" aria-label="Stock chart period">
            ${periods.map((period) => `<button type="button" class="${period === state.stockChartPeriod ? "active" : ""}" data-stock-chart-period="${period}">${period}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="stock-chart-metrics">
        <strong>${formatMoney(last.value, currency)}</strong>
        <span class="${changePct >= 0 ? "positive" : "negative"}">${formatSignedPercent(changePct)} over ${escapeHtml(state.stockChartPeriod)}</span>
      </div>
      ${renderStockChartSvg(points, currency)}
    </section>
  `;
}

function filterStockChartPoints(points, period) {
  const days = { "1M": 31, "3M": 93, "6M": 186, "1Y": 366, "2Y": 760 }[period] || 186;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const filtered = points.filter((point) => new Date(point.date).getTime() >= cutoff);
  return filtered.length >= 2 ? filtered : points.slice(-Math.min(points.length, 160));
}

function renderStockChartSvg(points, currency) {
  const width = 760;
  const height = 260;
  const padding = { top: 18, right: 58, bottom: 34, left: 58 };
  const values = points.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(0.0001, maxValue - minValue);
  const yMin = minValue - range * 0.08;
  const yMax = maxValue + range * 0.08;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const xFor = (index) => padding.left + (points.length === 1 ? 0 : index / (points.length - 1)) * plotWidth;
  const yFor = (value) => padding.top + (yMax - value) / Math.max(0.0001, yMax - yMin) * plotHeight;
  const path = points.map((point, index) => `${index ? "L" : "M"}${xFor(index).toFixed(1)} ${yFor(point.value).toFixed(1)}`).join(" ");
  const area = `${path} L${xFor(points.length - 1).toFixed(1)} ${height - padding.bottom} L${padding.left} ${height - padding.bottom} Z`;
  const hoverX = Number.isFinite(state.stockChartHoverX) ? clamp(state.stockChartHoverX, padding.left, width - padding.right) : null;
  const hoverIndex = hoverX === null ? points.length - 1 : Math.round((hoverX - padding.left) / plotWidth * (points.length - 1));
  const hoverPoint = points[clamp(hoverIndex, 0, points.length - 1)];
  const hoverPointX = xFor(points.indexOf(hoverPoint));
  const hoverPointY = yFor(hoverPoint.value);
  const grid = [0, 1, 2, 3].map((index) => {
    const y = padding.top + index * (plotHeight / 3);
    const value = yMax - index * ((yMax - yMin) / 3);
    return `
      <line class="stock-chart-grid" x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}"></line>
      <text class="stock-chart-axis" x="${width - padding.right + 10}" y="${(y + 4).toFixed(1)}">${escapeHtml(formatCompactPrice(value, currency))}</text>
    `;
  }).join("");

  return `
    <div class="stock-chart-wrap" data-stock-chart>
      <svg class="stock-price-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Interactive historical price chart">
        <defs>
          <linearGradient id="stockChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#0f766e" stop-opacity="0.22"></stop>
            <stop offset="100%" stop-color="#0f766e" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${grid}
        <path class="stock-chart-area" d="${area}"></path>
        <path class="stock-chart-line" d="${path}"></path>
        <line class="stock-chart-hover-line" x1="${hoverPointX.toFixed(1)}" y1="${padding.top}" x2="${hoverPointX.toFixed(1)}" y2="${height - padding.bottom}"></line>
        <circle class="stock-chart-hover-dot" cx="${hoverPointX.toFixed(1)}" cy="${hoverPointY.toFixed(1)}" r="5"></circle>
        <text class="stock-chart-axis" x="${padding.left}" y="${height - 10}">${escapeHtml(formatStockChartDate(points[0].date))}</text>
        <text class="stock-chart-axis" x="${width - padding.right - 42}" y="${height - 10}">${escapeHtml(formatStockChartDate(points[points.length - 1].date))}</text>
      </svg>
      <div class="stock-chart-tooltip" style="left:${safePercent(hoverPointX - padding.left, plotWidth)}%">
        <strong>${escapeHtml(formatMoney(hoverPoint.value, currency))}</strong>
        <span>${escapeHtml(formatStockChartDate(hoverPoint.date))}</span>
      </div>
    </div>
  `;
}

function formatCompactPrice(value, currency) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  if (number >= 1000) return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(number);
  return formatMoney(number, currency).replace(/\s/g, "");
}

function formatStockChartDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function renderStockTransactionsPanel(symbol, transactionsForSymbol) {
  const rows = [...transactionsForSymbol].sort(compareTransactionsDesc);
  return `
    <section class="stock-transactions-card">
      <div class="stock-transactions-header">
        <div>
          <h4>Transactions</h4>
          <p>${rows.length} ${rows.length === 1 ? "entry" : "entries"} for ${escapeHtml(symbol)}</p>
        </div>
      </div>
      <div class="stock-transactions-table-wrap">
        <table class="stock-transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th class="number">Qty</th>
              <th class="number">Price</th>
              <th class="number">Fees</th>
              <th class="number">Impact</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length ? rows.map(renderStockTransactionRow).join("") : `<tr><td colspan="6">No transactions recorded for this ticker.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderStockTransactionRow(transaction) {
  const impact = Number(transaction.cashImpactEUR) || toEUR(getCashImpact(transaction.type, transaction.quantity, transaction.price, transaction.fees), transaction.currency || BASE_CURRENCY);
  return `
    <tr>
      <td>${escapeHtml(formatTransactionDate(transaction))}</td>
      <td><span class="pill">${escapeHtml(capitalize(transaction.type || "entry"))}</span></td>
      <td class="number">${formatQuantity(transaction.quantity)}</td>
      <td class="number">${formatMoney(transaction.price || 0, transaction.currency || BASE_CURRENCY)}</td>
      <td class="number">${formatMoney(transaction.fees || 0, transaction.currency || BASE_CURRENCY)}</td>
      <td class="number ${impact >= 0 ? "positive" : "negative"}">${formatSignedEUR(impact)}</td>
    </tr>
  `;
}

function renderCompanyProfilePanel(symbol, holding, data) {
  const normalized = normalizeSymbol(symbol);
  const name = cleanCompanyNameCandidate(normalized, data.name || getKnownCompanyName(normalized, holding)) || normalized;
  const sector = cleanLinkedText(data.sector || "");
  const industry = cleanLinkedText(data.industry || "");
  const description = cleanCompanyDescription(data.description || data.longBusinessSummary || "");

  if (!sector && !industry && !description) return "";

  return `
    <section class="company-profile-card">
      <div class="company-profile-heading">
        <div>
          <h4>${escapeHtml(name)}</h4>
          <p>Company profile</p>
        </div>
        <div class="company-profile-tags">
          ${sector ? `<span>${escapeHtml(sector)}</span>` : ""}
          ${industry && industry !== sector ? `<span>${escapeHtml(industry)}</span>` : ""}
        </div>
      </div>
      ${description ? `<p class="company-profile-description">${escapeHtml(description)}</p>` : `<p class="company-profile-description muted-text">No company description found yet.</p>`}
    </section>
  `;
}

function cleanCompanyDescription(value) {
  const text = cleanLinkedText(value)
    .replace(/\s+/g, " ")
    .trim();
  if (!text || /^(Company Description|Contact Details|Stock Details)$/i.test(text)) return "";
  return text.length > 420 ? `${text.slice(0, 417).trim()}...` : text;
}
function renderAnalystForecastPanel(symbol, holding, data) {
  const forecast = buildAnalystForecast(symbol, holding, data);
  if (!forecast.hasForecast) {
    return `
      <section class="forecast-card forecast-empty">
        <div>
          <h4>Stock Price Forecast</h4>
          <p>No analyst price target is available yet. Add a StockAnalysis forecast link for this ticker if the automatic lookup misses it.</p>
        </div>
      </section>
    `;
  }

  const consensusClass = forecast.averageChangePct >= 0 ? "positive" : "negative";
  const countText = forecast.analystCount ? `${forecast.analystCount} analyst${forecast.analystCount === 1 ? "" : "s"}` : "Analysts";
  const direction = forecast.averageChangePct >= 0 ? "increase" : "decrease";
  const changePhrase = Number.isFinite(forecast.averageChangePct)
    ? `, which forecasts a ${Math.abs(forecast.averageChangePct).toFixed(2)}% ${direction} over the next year`
    : " over the next year";
  const consensusText = forecast.consensus ? `have a consensus rating of "${forecast.consensus}" and` : "publish";
  const targetText = forecast.average ? `an average price target of ${forecast.averageLabel}${changePhrase}` : "a published price target";
  const rangeText = forecast.low && forecast.high ? ` The lowest target is ${forecast.lowLabel} and the highest is ${forecast.highLabel}.` : "";

  return `
    <section class="forecast-card forecast-table-only">
      <div class="forecast-copy">
        <div class="forecast-title-row">
          <h4>Stock Price Forecast</h4>
          <span>${escapeHtml(forecast.sourceLabel)}</span>
        </div>
        <p>${escapeHtml(`${countText} that cover ${forecast.companyName} ${consensusText} ${targetText}.${rangeText}`)}</p>
        <div class="forecast-summary-grid">
          <div><span>Consensus</span><strong class="${consensusClass}">${escapeHtml(forecast.consensus || "--")}</strong></div>
          <div><span>Analysts</span><strong>${forecast.analystCount || "--"}</strong></div>
          <div><span>Avg target</span><strong>${escapeHtml(forecast.averageLabel || "--")}</strong></div>
          <div><span>Upside</span><strong class="${consensusClass}">${Number.isFinite(forecast.averageChangePct) ? escapeHtml(formatForecastPercent(forecast.averageChangePct)) : "--"}</strong></div>
        </div>
      </div>
      <div class="forecast-visual">
        ${renderForecastTable(forecast)}
      </div>
    </section>
    ${renderRecommendationTrendPanel(forecast)}
  `;
}

function buildAnalystForecast(symbol, holding, data) {
  const normalized = normalizeSymbol(symbol);
  const currency = normalizeCurrency(data.currency || holding.currency || BASE_CURRENCY);
  const currentPrice = firstForecastNumber(data.regularMarketPrice, data.price, holding.price);
  const low = firstForecastNumber(data.targetLowValue, data.targetLow);
  const average = firstForecastNumber(data.priceTargetValue, data.averagePriceTarget, data.priceTarget);
  const median = firstForecastNumber(data.targetMedianValue, data.targetMedian);
  const high = firstForecastNumber(data.targetHighValue, data.targetHigh);
  const analystCount = firstForecastNumber(data.analystCount, String(data.analystView || "").match(/([0-9]+)\s+analysts?/i)?.[1]);
  const consensus = data.analystConsensus || extractForecastConsensus(data.analystView);
  const companyName = cleanCompanyNameCandidate(normalized, data.name || getKnownCompanyName(normalized, holding)) || normalized;

  const averageChangePct = Number.isFinite(currentPrice) && currentPrice > 0 && Number.isFinite(average) && average > 0
    ? safePercent(average - currentPrice, currentPrice)
    : NaN;

  return {
    symbol: normalized,
    companyName,
    currency,
    currentPrice,
    currentLabel: Number.isFinite(currentPrice) && currentPrice > 0 ? formatMoney(currentPrice, currency) : "--",
    low,
    average,
    median,
    high,
    lowLabel: formatForecastMoney(low, data.targetLow, currency),
    averageLabel: formatForecastMoney(average, data.priceTarget, currency),
    medianLabel: formatForecastMoney(median, data.targetMedian, currency),
    highLabel: formatForecastMoney(high, data.targetHigh, currency),
    analystCount: Number.isFinite(analystCount) && analystCount > 0 ? analystCount : 0,
    consensus,
    averageChangePct,
    lowChangePct: calculateForecastChange(low, currentPrice),
    medianChangePct: calculateForecastChange(median, currentPrice),
    highChangePct: calculateForecastChange(high, currentPrice),
    trend: data.recommendationTrends || null,
    sourceLabel: data.source || "Analyst data",
    forecastUpdated: data.forecastUpdated || "",
    fiftyTwoWeekLow: firstForecastNumber(data.fiftyTwoWeekLow),
    fiftyTwoWeekHigh: firstForecastNumber(data.fiftyTwoWeekHigh),
    hasForecast: [low, average, median, high].some((value) => Number.isFinite(value) && value > 0),
  };
}

async function refreshNewsSentiment({ quiet = false, force = false } = {}) {
  const symbols = getNewsSentimentSymbols();
  await refreshNewsSentimentForSymbols(symbols, { quiet, force });
}

async function refreshNewsSentimentForSymbols(symbols, { quiet = false, force = false } = {}) {
  const uniqueSymbols = [...new Set((symbols || []).map(normalizeSymbol).filter((symbol) => symbol && symbol !== "CASH"))];
  const staleSymbols = force ? uniqueSymbols : uniqueSymbols.filter((symbol) => !isNewsSentimentFresh(state.newsSentiment[symbol]));

  if (!uniqueSymbols.length) {
    state.newsSentimentMessage = "Add open stock positions to check headline risk.";
    renderMarketStatus();
    renderInvestorProfile();
    return;
  }

  if (!staleSymbols.length) {
    state.newsSentimentMessage = "";
    renderMarketStatus();
    renderInvestorProfile();
    return;
  }

  state.newsSentimentLoading = true;
  state.newsSentimentMessage = `Checking recent headlines for ${staleSymbols.length} ticker${staleSymbols.length === 1 ? "" : "s"}...`;
  renderMarketStatus();
  renderInvestorProfile();

  try {
    const data = await requestNewsSentiment(staleSymbols);
    (data.items || []).forEach((item) => {
      const normalized = normalizeNewsSentimentItem(item, data.generatedAt);
      if (normalized.symbol) state.newsSentiment[normalized.symbol] = normalized;
    });
    saveNewsSentimentCache();
    state.newsSentimentMessage = "";
  } catch (error) {
    state.newsSentimentMessage = quiet
      ? "News sentiment needs the local server."
      : `News sentiment unavailable: ${error.message || "Start the local server and try again."}`;
  } finally {
    state.newsSentimentLoading = false;
    renderMarketStatus();
    renderInvestorProfile();
    if (state.selectedStockSymbol && staleSymbols.includes(state.selectedStockSymbol)) {
      renderStockAnalysisModal(state.selectedStockSymbol, getHoldingForAnalysis(state.selectedStockSymbol), state.stockAnalysis[state.selectedStockSymbol] || null, false);
    }
  }
}

async function requestNewsSentiment(symbols) {
  const response = await fetch(getNewsSentimentEndpoint(symbols), { cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `News server returned HTTP ${response.status}`);
  return data;
}

function getNewsSentimentEndpoint(symbols) {
  const params = new URLSearchParams({
    symbols: symbols.map(normalizeSymbol).filter(Boolean).join(","),
    days: "7",
  });
  const path = `/api/news-sentiment?${params.toString()}`;
  if (/^https?:$/i.test(window.location.protocol)) return path;
  return `http://localhost:8787${path}`;
}

function getNewsSentimentSymbols() {
  return uniqueBy(
    getVisibleHoldings()
      .filter((holding) => holding.symbol && holding.symbol !== "CASH")
      .sort((a, b) => getMarketValue(b) - getMarketValue(a)),
    (holding) => holding.symbol,
  )
    .slice(0, 24)
    .map((holding) => holding.symbol);
}

function isNewsSentimentFresh(item) {
  return item && Date.now() - Number(item.fetchedAt || 0) < NEWS_SENTIMENT_REFRESH_MS;
}

function normalizeNewsSentimentItem(item, generatedAt = "") {
  const symbol = normalizeSymbol(item?.symbol);
  const riskScore = clamp(Number(item?.riskScore) || 50, 0, 100);
  const headlines = Array.isArray(item?.headlines) ? item.headlines : [];

  return {
    symbol,
    sentiment: String(item?.sentiment || "Unavailable").trim(),
    sentimentScore: Number(item?.sentimentScore) || 0,
    riskScore,
    riskLevel: String(item?.riskLevel || getNewsRiskLevel(riskScore)).trim(),
    riskFlags: normalizeStringArray(item?.riskFlags).slice(0, 8),
    positiveCount: Number(item?.positiveCount) || 0,
    negativeCount: Number(item?.negativeCount) || 0,
    headlines: headlines.slice(0, 8).map((headline) => ({
      title: String(headline?.title || "").trim(),
      source: String(headline?.source || "").trim(),
      url: String(headline?.url || "").trim(),
      publishedAt: String(headline?.publishedAt || "").trim(),
      sentiment: String(headline?.sentiment || "").trim(),
      sentimentScore: Number(headline?.sentimentScore) || 0,
      riskTags: normalizeStringArray(headline?.riskTags).slice(0, 5),
    })).filter((headline) => headline.title),
    error: String(item?.error || "").trim(),
    generatedAt: generatedAt || item?.generatedAt || new Date().toISOString(),
    fetchedAt: Number(item?.fetchedAt) || Date.now(),
  };
}

function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
}

function getNewsSentimentForSymbol(symbol) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  return state.newsSentiment[normalized] || state.newsSentiment[baseSymbol] || null;
}

function buildPortfolioNewsRisk() {
  const rows = getNewsRiskRows();
  const totalValue = getTotalValue();
  const coveredRows = rows.filter((row) => row.news && row.news.headlines.length);
  const coveredValue = coveredRows.reduce((sum, row) => sum + row.marketValue, 0);
  const coverage = safePercent(coveredValue, totalValue);
  const latest = rows
    .map((row) => row.news?.fetchedAt || 0)
    .filter(Boolean)
    .sort((a, b) => b - a)[0];

  if (!rows.length) {
    return {
      title: "Portfolio news risk",
      hasCoverage: false,
      score: 0,
      level: "Risk score",
      detail: "No open positions",
      summary: "Add open stock positions to check recent headline sentiment.",
      updatedLabel: "Not loaded",
      rows: [],
      emptyMessage: "No open holdings are available for news scanning.",
    };
  }

  if (!coveredRows.length) {
    return {
      title: "Portfolio news risk",
      hasCoverage: false,
      score: 0,
      level: "Risk score",
      detail: "No headline coverage yet",
      summary: "Refresh news to scan recent headlines through the local server.",
      updatedLabel: latest ? `Checked ${formatNewsTime(latest)}` : "Not loaded",
      rows,
      emptyMessage: "Refresh news to populate sentiment for your holdings.",
    };
  }

  const weightedRisk = coveredRows.reduce((sum, row) => sum + row.news.riskScore * safeRatio(row.marketValue, coveredValue), 0);
  const score = Math.round(weightedRisk);
  const riskiest = [...coveredRows]
    .sort((a, b) => (b.news.riskScore * b.weight) - (a.news.riskScore * a.weight))
    .slice(0, 3)
    .map((row) => `${row.symbol} ${row.news.riskLevel.toLowerCase()}`);

  return {
    title: "Portfolio news risk",
    hasCoverage: true,
    score,
    level: getNewsRiskLevel(score),
    detail: `${formatPercent(coverage)} headline coverage`,
    summary: `Weighted headline risk is ${getNewsRiskLevel(score).toLowerCase()} across ${formatPercent(coverage)} of open value. Highest weighted signals: ${riskiest.join(", ")}.`,
    updatedLabel: latest ? `Checked ${formatNewsTime(latest)}` : "Not loaded",
    rows,
    emptyMessage: "Refresh news to populate sentiment for your holdings.",
  };
}

function getNewsRiskRows() {
  const totalValue = getTotalValue();
  return getVisibleHoldings()
    .filter((holding) => holding.symbol && holding.symbol !== "CASH")
    .map((holding) => {
      const marketValue = getMarketValue(holding);
      const news = getNewsSentimentForSymbol(holding.symbol);
      return {
        symbol: holding.symbol,
        name: getKnownCompanyName(holding.symbol, holding) || holding.name || holding.symbol,
        holding,
        marketValue,
        weight: safePercent(marketValue, totalValue),
        news,
      };
    })
    .sort((a, b) => {
      const aRisk = a.news?.riskScore ?? -1;
      const bRisk = b.news?.riskScore ?? -1;
      return (bRisk * b.weight) - (aRisk * a.weight);
    });
}

function renderNewsSentimentPanel(symbol) {
  const item = getNewsSentimentForSymbol(symbol);
  if (!item) {
    return `
      <section class="news-sentiment-card news-sentiment-empty">
        <div class="news-sentiment-heading">
          <div>
            <h4>News Sentiment</h4>
            <p>Not loaded</p>
          </div>
          <button class="secondary-button compact-button" type="button" data-refresh-stock-news="${escapeAttribute(symbol)}">Refresh news</button>
        </div>
        <p>Refresh news to see recent headline sentiment for ${escapeHtml(symbol)}.</p>
      </section>
    `;
  }

  const headlines = item.headlines.slice(0, 5);
  const isLoading = state.newsSentimentLoading && normalizeSymbol(state.selectedStockSymbol) === normalizeSymbol(symbol);
  return `
    <section class="news-sentiment-card">
      <div class="news-sentiment-heading">
        <div>
          <h4>News Sentiment</h4>
          <p>${escapeHtml(formatNewsTime(item.fetchedAt))}</p>
        </div>
        <div class="news-sentiment-badges">
          <span class="sentiment-pill ${sentimentClass(item.sentiment)}">${escapeHtml(item.sentiment)}</span>
          <span class="risk-pill ${newsRiskClass(item.riskScore)}">${escapeHtml(item.riskLevel)} risk ${item.riskScore} / 100</span>
          <button class="secondary-button compact-button" type="button" data-refresh-stock-news="${escapeAttribute(symbol)}" ${isLoading ? "disabled" : ""}>${isLoading ? "Refreshing" : "Refresh news"}</button>
        </div>
      </div>
      ${item.riskFlags.length ? `<div class="news-tags">${item.riskFlags.map((flag) => `<span class="news-tag">${escapeHtml(flag)}</span>`).join("")}</div>` : ""}
      <div class="news-headline-list">
        ${headlines.length ? headlines.map(renderStockNewsHeadline).join("") : `<p class="muted-text">${escapeHtml(item.error || "No recent headline found for this ticker.")}</p>`}
      </div>
    </section>
  `;
}

function renderStockNewsHeadline(headline) {
  const meta = [headline.source, formatNewsPublishedAt(headline.publishedAt), headline.sentiment].filter(Boolean).join(" | ");
  const title = escapeHtml(headline.title);
  const content = headline.url
    ? `<a href="${escapeAttribute(headline.url)}" target="_blank" rel="noopener noreferrer">${title}</a>`
    : `<strong>${title}</strong>`;

  return `
    <article class="news-headline-item">
      ${content}
      <span>${escapeHtml(meta)}</span>
    </article>
  `;
}

function getNewsRiskLevel(score) {
  const number = Number(score);
  if (!Number.isFinite(number)) return "Unknown";
  if (number >= 72) return "High";
  if (number >= 56) return "Elevated";
  if (number >= 38) return "Moderate";
  return "Quiet";
}

function newsRiskClass(score) {
  const number = Number(score);
  if (!Number.isFinite(number)) return "risk-unknown";
  if (number >= 72) return "risk-high";
  if (number >= 56) return "risk-elevated";
  if (number >= 38) return "risk-moderate";
  return "risk-quiet";
}

function sentimentClass(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("positive")) return "sentiment-positive";
  if (normalized.includes("cautious")) return "sentiment-cautious";
  if (normalized.includes("mixed")) return "sentiment-mixed";
  if (normalized.includes("unavailable") || normalized.includes("not checked")) return "sentiment-unavailable";
  return "sentiment-neutral";
}

function formatNewsTime(value) {
  const date = typeof value === "number" ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return "Not loaded";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatNewsPublishedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.round(diffMs / 3_600_000));
  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function firstForecastNumber(...values) {
  for (const value of values) {
    const number = typeof value === "number" ? value : parseNumber(value);
    if (Number.isFinite(number) && number > 0) return number;
  }
  return NaN;
}

function calculateForecastChange(target, currentPrice) {
  return Number.isFinite(target) && target > 0 && Number.isFinite(currentPrice) && currentPrice > 0
    ? safePercent(target - currentPrice, currentPrice)
    : NaN;
}

function formatForecastPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  const sign = number >= 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}%`;
}
function formatForecastMoney(value, rawValue, currency) {
  if (!Number.isFinite(value) || value <= 0) return "--";
  const raw = String(rawValue || "").trim();
  const symbol = raw.match(/^[$\u20ac\u00a3]/)?.[0];
  return symbol ? `${symbol}${Number(value).toFixed(2)}` : formatMoney(value, currency);
}

function extractForecastConsensus(value) {
  const ratingPattern = "Strong Buy|Strong Sell|Outperform|Overweight|Underperform|Neutral|Buy|Hold|Sell";
  return String(value || "").match(new RegExp(`\\b(${ratingPattern})\\b`, "i"))?.[1] || "";
}

function renderForecastGauge(forecast) {
  const angleByConsensus = {
    "strong sell": -74,
    sell: -48,
    underperform: -32,
    hold: 0,
    neutral: 0,
    buy: 44,
    overweight: 58,
    outperform: 58,
    "strong buy": 74,
  };
  const angle = angleByConsensus[String(forecast.consensus || "").toLowerCase()] ?? clamp(forecast.averageChangePct || 0, -70, 70);
  const label = forecast.consensus || (Number.isFinite(forecast.averageChangePct) ? "Target based" : "No consensus");
  const className = forecast.averageChangePct >= 0 ? "positive" : "negative";

  return `
    <div class="forecast-gauge-block">
      <div class="forecast-gauge" style="--forecast-angle: ${angle}deg" aria-hidden="true">
        <span class="forecast-needle"></span>
      </div>
      <strong>Analyst Consensus: <span class="${className}">${escapeHtml(label)}</span></strong>
    </div>
  `;
}

function renderForecastChart(forecast) {
  const width = 440;
  const height = 160;
  const padding = { top: 12, right: 66, bottom: 24, left: 34 };
  const values = [forecast.currentPrice, forecast.low, forecast.average, forecast.high, forecast.fiftyTwoWeekLow, forecast.fiftyTwoWeekHigh]
    .filter((value) => Number.isFinite(value) && value > 0);
  const min = Math.min(...values) * 0.88;
  const max = Math.max(...values) * 1.08;
  const y = (value) => padding.top + (max - value) / Math.max(1, max - min) * (height - padding.top - padding.bottom);
  const xPast = [padding.left, 112, 190, 260];
  const xForecast = width - padding.right;
  const pastValues = buildForecastPastValues(forecast);
  const currentValue = firstForecastNumber(forecast.currentPrice, forecast.average, forecast.median, forecast.low, forecast.high);
  const pastPoints = pastValues.map((value, index) => `${xPast[index]},${y(value).toFixed(1)}`).join(" ");
  const currentY = y(currentValue || pastValues[pastValues.length - 1]);
  const targetLines = [
    { label: "High", value: forecast.high, className: "high" },
    { label: "Average", value: forecast.average, className: "average" },
    { label: "Low", value: forecast.low, className: "low" },
  ].filter((item) => Number.isFinite(item.value) && item.value > 0);

  return `
    <div class="forecast-chart-wrap">
      <div class="forecast-chart-heading"><span>Recent price</span><span>12 month forecast</span></div>
      <svg class="forecast-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Analyst forecast chart for ${escapeAttribute(forecast.symbol)}">
        ${[0, 1, 2, 3].map((index) => {
          const yy = padding.top + index * ((height - padding.top - padding.bottom) / 3);
          return `<line class="forecast-grid-line" x1="${padding.left}" y1="${yy.toFixed(1)}" x2="${width - padding.right}" y2="${yy.toFixed(1)}"></line>`;
        }).join("")}
        <polyline class="forecast-history-line" points="${pastPoints}"></polyline>
        <circle class="forecast-current-dot" cx="${xPast[xPast.length - 1]}" cy="${currentY.toFixed(1)}" r="5"></circle>
        ${targetLines.map((target) => {
          const targetY = y(target.value);
          return `
            <line class="forecast-target-line ${target.className}" x1="${xPast[xPast.length - 1]}" y1="${currentY.toFixed(1)}" x2="${xForecast}" y2="${targetY.toFixed(1)}"></line>
            <text class="forecast-target-label ${target.className}" x="${xForecast + 12}" y="${targetY.toFixed(1)}">${target.label}</text>
          `;
        }).join("")}
        <text class="forecast-axis-label" x="${padding.left}" y="${height - 8}">Now</text>
        <text class="forecast-axis-label" x="${xForecast - 28}" y="${height - 8}">12M</text>
      </svg>
    </div>
  `;
}

function buildForecastPastValues(forecast) {
  const current = firstForecastNumber(forecast.currentPrice, forecast.average, forecast.median, forecast.low, forecast.high);
  const low = Number.isFinite(forecast.fiftyTwoWeekLow) && forecast.fiftyTwoWeekLow > 0 ? forecast.fiftyTwoWeekLow : current * 0.84;
  const high = Number.isFinite(forecast.fiftyTwoWeekHigh) && forecast.fiftyTwoWeekHigh > 0 ? forecast.fiftyTwoWeekHigh : Math.max(current * 1.08, forecast.high || current);
  return [low, (low + current) / 2, Math.max(current, high * 0.78), current].map((value) => Number(value) || current || 1);
}

function renderForecastTable(forecast) {
  const columns = [
    { label: "Low", value: forecast.low, price: forecast.lowLabel, change: forecast.lowChangePct },
    { label: "Average", value: forecast.average, price: forecast.averageLabel, change: forecast.averageChangePct },
    { label: "Median", value: forecast.median, price: forecast.medianLabel, change: forecast.medianChangePct },
    { label: "High", value: forecast.high, price: forecast.highLabel, change: forecast.highChangePct },
  ];

  return `
    <table class="forecast-table">
      <thead><tr><th>Target</th>${columns.map((column) => `<th>${column.label}</th>`).join("")}</tr></thead>
      <tbody>
        <tr><td>Price</td>${columns.map((column) => `<td>${Number.isFinite(column.value) && column.value > 0 ? escapeHtml(column.price) : "--"}</td>`).join("")}</tr>
        <tr><td>Change</td>${columns.map((column) => `<td class="${Number(column.change) >= 0 ? "positive" : "negative"}">${Number.isFinite(column.change) ? escapeHtml(formatForecastPercent(column.change)) : "--"}</td>`).join("")}</tr>
      </tbody>
    </table>
    ${forecast.forecastUpdated ? `<p class="forecast-updated">Price targets updated ${escapeHtml(forecast.forecastUpdated)}.</p>` : ""}
  `;
}

function renderRecommendationTrendPanel(forecast) {
  const trend = forecast.trend;
  const ratingText = forecast.consensus
    ? `The average analyst rating for ${forecast.companyName} is "${forecast.consensus}".`
    : `Analyst rating data for ${forecast.companyName} is limited.`;
  const meaning = forecast.averageChangePct >= 0
    ? "Analysts currently expect upside versus the latest market price."
    : "Analysts currently expect downside versus the latest market price.";

  return `
    <section class="ratings-forecast-card">
      <div class="ratings-copy">
        <h4>Analyst Ratings</h4>
        <p>${escapeHtml(`${ratingText} ${Number.isFinite(forecast.averageChangePct) ? meaning : "Use the target table above as the main prediction."}`)}</p>
      </div>
      <div class="ratings-trends">
        <h4>Recommendation Trends</h4>
        ${trend?.labels?.length ? renderRecommendationBars(trend) : `<p class="modal-note">No monthly recommendation trend was found for this ticker yet.</p>`}
      </div>
    </section>
  `;
}

function renderRecommendationBars(trend) {
  const rows = Array.isArray(trend.rows) ? trend.rows : [];
  return `
    <table class="recommendation-table">
      <thead><tr><th>Rating</th>${trend.labels.map((label) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.filter((row) => row.rating !== "Total").map((row) => `<tr><th>${escapeHtml(row.rating)}</th>${row.values.map((value) => `<td>${Number(value) || 0}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}
function renderDataPoint(label, value) {
  return `<div class="stock-data-point"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || "--")}</strong></div>`;
}

function formatTargetRange(low, high) {
  return low || high ? `${low || "--"} - ${high || "--"}` : "--";
}

function buildStockAnalysisNotes({ holding, data, open, weight, gainPct, dayChangePct, transactionsForSymbol }) {
  const notes = [];
  const name = data.name || getKnownCompanyName(holding.symbol, holding) || holding.symbol;
  const status = open ? "open" : "closed";
  notes.push(`${name} is an ${status} ${displayAssetClass(holding.assetClass || data.assetClass || "Equity").toLowerCase()} position in your portfolio.`);

  if (open && weight >= 15) notes.push(`This is a large position at ${formatPercent(weight)} of the portfolio, so single-stock risk matters here.`);
  if (open && weight > 0 && weight < 3) notes.push(`This is a small position at ${formatPercent(weight)} of the portfolio, so it has limited impact on overall performance.`);
  if (gainPct >= 20) notes.push(`Your return is strongly positive at ${formatSignedPercent(gainPct)}; consider whether the thesis still justifies the position size.`);
  if (gainPct <= -20) notes.push(`Your return is materially negative at ${formatSignedPercent(gainPct)}; check whether the original reason for owning it still holds.`);
  if (Math.abs(dayChangePct) >= 5) notes.push(`Today\'s move is large at ${formatSignedPercent(dayChangePct)}, so recent news or volatility may be driving the price.`);
  if (Number(data.trailingPE || data.forwardPE) > 40) notes.push(`The P/E shown is elevated, which often means expectations are high and valuation risk is worth watching.`);
  if (data.analystView) notes.push(`Analyst snapshot: ${data.analystView}.`);
  if (data.targetLow || data.targetHigh) notes.push(`Forecast range shown: ${formatTargetRange(data.targetLow, data.targetHigh)}.`);
  if (data.nextEarningsDate) notes.push(`${String(data.nextEarningsDate).startsWith("Last report") ? "Latest earnings" : "Next earnings date to watch"}: ${data.nextEarningsDate}.`);
  if (data.exDividendDate || data.nextDividendDate) notes.push(`Dividend calendar: ${data.exDividendDate ? `ex-dividend ${data.exDividendDate}` : ""}${data.exDividendDate && data.nextDividendDate ? ", " : ""}${data.nextDividendDate ? `payment ${data.nextDividendDate}` : ""}.`);
  if (!open && transactionsForSymbol.length) notes.push(`This closed position had ${transactionsForSymbol.length} recorded transaction${transactionsForSymbol.length === 1 ? "" : "s"}.`);

  return notes;
}

async function fetchStockAnalysisData(symbol, holding, options = {}) {
  const normalized = normalizeSymbol(symbol);
  const cached = state.stockAnalysis[normalized];
  if (!options.force && cached && Date.now() - Number(cached.fetchedAt || 0) < 30 * 60 * 1000) return cached;

  const quote = await fetchStooqAnalysisQuote(normalized, holding);
  const publicData = await fetchPublicStockPages(normalized, holding).catch(() => ({}));
  const yahooFallback = Object.keys(publicData).length ? {} : await fetchYahooQuoteData(normalized, holding).catch(() => ({}));
  const merged = { ...yahooFallback, ...publicData, ...quote };
  const rawName = publicData.name || quote.name || yahooFallback.name || getKnownCompanyName(normalized, holding) || await fetchTickerNameFromPublicPages(normalized, holding);
  const name = cleanCompanyNameCandidate(normalized, rawName);

  return {
    ...merged,
    symbol: normalized,
    name: name || getKnownCompanyName(normalized, holding),
    assetClass: holding.assetClass || merged.assetClass || inferAssetClassFromSymbol(normalized),
    fetchedAt: Date.now(),
    source: formatDataSources([quote.source, publicData.source, yahooFallback.source]),
  };
}

async function fetchStooqAnalysisQuote(symbol, holding = {}) {
  const quote = await fetchLatestQuote({ ...holding, symbol });
  if (!quote) return {};
  applyQuote(symbol, quote);
  return {
    currency: quote.currency,
    regularMarketPrice: quote.price,
    price: quote.price,
    regularMarketChangePercent: quote.dayChangePct,
    dayChangePct: quote.dayChangePct,
    sourceSymbol: quote.sourceSymbol,
    source: quote.source || `Stooq ${quote.sourceSymbol}`,
  };
}

async function fetchPublicStockPages(symbol, holding = {}) {
  const normalized = normalizeSymbol(symbol);
  const sourceSymbol = getManualSourceSymbol(normalized) || getBaseTickerSymbol(normalized);
  const manual = getManualSource(normalized);
  const targets = buildPublicDataTargets(sourceSymbol, manual, holding);
  const settled = await Promise.allSettled(
    targets.map(async (target) => {
      const text = await fetchJinaText(target.url);
      return text ? parsePublicStockText(text, target) : null;
    }),
  );
  const results = settled
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value);

  return mergePublicStockData(results);
}

function buildPublicDataTargets(sourceSymbol, manual, holding = {}) {
  const targets = [];

  if (manual?.url && /^https?:\/\//i.test(manual.url)) {
    targets.push({ provider: manual.provider || "Manual source", url: manual.url, kind: "manual", sourceSymbol });
  }

  targets.push(...buildGoogleFinanceTargets(sourceSymbol, holding).slice(0, 3));
  targets.push(...buildStockAnalysisTargets(sourceSymbol));
  targets.push(...buildMarketBeatTargets(sourceSymbol));
  targets.push(...buildNasdaqDataTargets(sourceSymbol));

  return uniqueBy(targets, (target) => target.url);
}

function buildGoogleFinanceTargets(sourceSymbol, holding = {}) {
  const { base, exchange } = splitSourceSymbol(sourceSymbol);
  if (!base) return [];
  const targets = [];
  const exchanges = exchange ? [exchange] : inferGoogleExchanges(sourceSymbol, holding);

  exchanges.forEach((market) => {
    const googleSymbol = `${base}:${market}`;
    targets.push({
      provider: "Google Finance",
      url: `http://www.google.com/finance/quote/${encodeURIComponent(base)}:${encodeURIComponent(market)}`,
      kind: "google",
      sourceSymbol: googleSymbol,
    });
  });

  return targets;
}

function buildStockAnalysisTargets(sourceSymbol) {
  const { base } = splitSourceSymbol(sourceSymbol);
  if (!base || sourceSymbol.includes(".")) return [];
  return [
    {
      provider: "StockAnalysis",
      url: `http://stockanalysis.com/stocks/${encodeURIComponent(base.toLowerCase())}/forecast/`,
      kind: "analysts",
      sourceSymbol: base,
    },
    {
      provider: "StockAnalysis",
      url: `http://stockanalysis.com/stocks/${encodeURIComponent(base.toLowerCase())}/company/`,
      kind: "profile",
      sourceSymbol: base,
    },
  ];
}
function buildMarketBeatTargets(sourceSymbol) {
  const { base, exchange } = splitSourceSymbol(sourceSymbol);
  if (!base || sourceSymbol.includes(".")) return [];
  const exchanges = exchange ? [marketBeatExchange(exchange)].filter(Boolean) : ["NASDAQ", "NYSE"];
  return exchanges.map((market) => ({
    provider: "MarketBeat",
    url: `http://www.marketbeat.com/stocks/${market}/${encodeURIComponent(base)}/forecast/`,
    kind: "analysts",
    sourceSymbol: `${base}:${market}`,
  }));
}

function buildNasdaqDataTargets(sourceSymbol) {
  const { base } = splitSourceSymbol(sourceSymbol);
  if (!base || sourceSymbol.includes(".")) return [];
  const lower = base.toLowerCase();
  return [
    { provider: "Nasdaq", url: `http://www.nasdaq.com/market-activity/stocks/${encodeURIComponent(lower)}/earnings`, kind: "earnings", sourceSymbol: base },
    { provider: "Nasdaq", url: `http://www.nasdaq.com/market-activity/stocks/${encodeURIComponent(lower)}/dividend-history`, kind: "dividends", sourceSymbol: base },
  ];
}

function splitSourceSymbol(sourceSymbol) {
  const normalized = normalizeSymbol(sourceSymbol);
  const [symbolPart, exchangePart = ""] = normalized.split(":");
  return {
    base: getBaseTickerSymbol(symbolPart).replace(/[^A-Z0-9.-]/g, ""),
    exchange: exchangePart.replace(/[^A-Z0-9]/g, ""),
  };
}

function inferGoogleExchanges(sourceSymbol, holding = {}) {
  const normalized = normalizeSymbol(sourceSymbol);
  if (normalized.endsWith(".DE")) return ["ETR", "FRA"];
  if (normalized.endsWith(".L")) return ["LON"];
  if (normalized.endsWith(".SW")) return ["SWX"];
  if (normalized.endsWith(".PA")) return ["EPA"];
  if (normalized.endsWith(".MI")) return ["BIT"];
  if (normalized.endsWith(".LS")) return ["ELI"];
  if (normalized.endsWith(".NL")) return ["AMS"];
  if (holding.currency === "EUR") return ["ETR", "FRA", "EPA", "AMS", "BIT", "ELI"];
  return ["NASDAQ", "NYSE", "NYSEAMERICAN"];
}

function marketBeatExchange(exchange) {
  const map = { NASDAQ: "NASDAQ", NYSE: "NYSE", NYSEAMERICAN: "NYSEAMERICAN" };
  return map[exchange] || "";
}
async function fetchJinaText(targetUrl) {
  const url = `https://r.jina.ai/${targetUrl}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

function parsePublicStockText(text, target) {
  const compact = normalizeWhitespace(text);
  const title = compact.match(/Title:\s*([^\n]+)/i)?.[1] || "";
  const googleData = target.provider === "Google Finance" || target.kind === "google" ? parseGoogleFinanceText(compact, target) : {};
  const stockAnalysisData = target.provider === "StockAnalysis" ? (target.kind === "profile" ? parseStockAnalysisCompanyText(compact, target) : parseStockAnalysisForecastText(compact, target)) : {};
  const cleanedTitleName = cleanPublicCompanyName(title, target.sourceSymbol);

  return {
    ...googleData,
    ...stockAnalysisData,
    name: stockAnalysisData.name || cleanedTitleName || googleData.name,
    analystView: stockAnalysisData.analystView || extractAnalystView(compact) || googleData.analystView,
    priceTarget: stockAnalysisData.priceTarget || extractFirstMatch(compact, [
      /Consensus\s+Price\s+Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
      /(?:Average|Median|Consensus)\s+(?:Price\s+)?Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
      /Price\s+Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
      /Avg\s+Price\s+Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
    ]) || googleData.priceTarget,
    targetLow: stockAnalysisData.targetLow,
    targetHigh: stockAnalysisData.targetHigh,
    targetMedian: stockAnalysisData.targetMedian,
    targetLowValue: stockAnalysisData.targetLowValue,
    targetHighValue: stockAnalysisData.targetHighValue,
    targetMedianValue: stockAnalysisData.targetMedianValue,
    priceTargetValue: stockAnalysisData.priceTargetValue,
    analystConsensus: stockAnalysisData.analystConsensus,
    recommendationTrends: stockAnalysisData.recommendationTrends,
    forecastUpdated: stockAnalysisData.forecastUpdated,
    analystCount: stockAnalysisData.analystCount,
    sector: stockAnalysisData.sector || googleData.sector,
    industry: stockAnalysisData.industry || googleData.industry,
    description: stockAnalysisData.description || googleData.description,
    nextEarningsDate: stockAnalysisData.nextEarningsDate || extractDateNearLabel(compact, ["Earnings Date", "Next Earnings", "Estimated Earnings Date", "Earnings Announcement"]) || googleData.nextEarningsDate,
    exDividendDate: extractDateNearLabel(compact, ["Ex-Dividend Date", "Ex Dividend Date", "Ex-Date", "Ex dividend date"]) || googleData.exDividendDate,
    nextDividendDate: extractDateNearLabel(compact, ["Dividend Date", "Payment Date", "Pay Date"]),
    dividendYield: extractFirstMatch(compact, [/Dividend Yield\s*[:\-]?\s*([0-9.]+%)/i, /Dividend\s*\n\s*([0-9.]+%)/i, /Yield\s*[:\-]?\s*([0-9.]+%)/i]) || googleData.dividendYield,
    marketCap: googleData.marketCap || parseCompactNumber(extractFirstMatch(compact, [/Mkt\.\s*cap\s*\n\s*([0-9][0-9,.]*\s?[KMBT]?)/i, /Market Cap\s*[:\-]?\s*([$\u20ac\u00a3]?[0-9][0-9,.]*\s?[KMBT]?)/i])),
    source: target.provider,
  };
}

function parseStockAnalysisCompanyText(text, target = {}) {
  const compact = normalizeWhitespace(text);
  const sourceSymbol = String(target.sourceSymbol || "").toUpperCase();
  const titleName = cleanPublicCompanyName(compact.match(/<title>([^<]+)/i)?.[1] || compact.match(/Title:\s*([^\n]+)/i)?.[1] || "", sourceSymbol);
  const headerLine = compact
    .split("\n")
    .map((line) => line.trim())
    .find((line) => !/^Title:/i.test(line) && /\([A-Z0-9._:-]+\)/.test(line));
  const headerName = cleanCompanyNameCandidate(sourceSymbol, headerLine?.match(/^(.+?)\s+\([A-Z0-9._:-]+\)/)?.[1] || "");
  const sector = extractProfileField(compact, "Sector");
  const industry = extractProfileField(compact, "Industry");
  const description = extractCompanyProfileDescription(compact, headerName || titleName);

  return {
    name: headerName || titleName,
    sector,
    industry,
    description,
  };
}

function extractProfileField(text, label) {
  const lines = String(text || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const index = lines.findIndex((item) => new RegExp(`^${label}\\b`, "i").test(item));
  if (index < 0) return "";
  const inlineValue = cleanLinkedText(lines[index].replace(new RegExp(`^${label}\\s*`, "i"), ""));
  return inlineValue || cleanLinkedText(lines[index + 1] || "");
}

function extractCompanyProfileDescription(text, companyName = "") {
  const section = extractSection(text, "# Company Description", "## Contact Details")
    || extractSection(text, "## Company Description", "## Contact Details");
  if (!section) return "";

  const rawLines = section
    .split("\n")
    .map(cleanLinkedText)
    .map((line) => line.trim())
    .filter(Boolean);
  const profileStopIndex = rawLines.findIndex((line) => /^(Country|Industry|Sector|Employees|CEO)\b/i.test(line));
  const linesBeforeProfile = profileStopIndex >= 0 ? rawLines.slice(0, profileStopIndex) : rawLines;
  const companyNameKey = normalizeSymbol(companyName);
  const blocked = /^(#|Company Description|Contact Details|Stock Details|Address:|Phone\b|Website\b)/i;
  const descriptionLines = linesBeforeProfile.filter((line) => {
    if (blocked.test(line) || /Image:/i.test(line)) return false;
    if (companyNameKey && normalizeSymbol(line) === companyNameKey) return false;
    return true;
  });

  return cleanCompanyDescription(descriptionLines.join(" "));
}

function cleanLinkedText(value) {
  return String(value || "")
    .replace(/【\d+†([^】]+)】/g, "$1")
    .replace(/\?\d+\?([^?]+)\?/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
function parseStockAnalysisForecastText(text, target = {}) {
  const compact = normalizeWhitespace(text);
  const sourceSymbol = String(target.sourceSymbol || "").toUpperCase();
  const titleName = cleanPublicCompanyName(compact.match(/<title>([^<]+)/i)?.[1] || compact.match(/Title:\s*([^\n]+)/i)?.[1] || "", sourceSymbol);
  const legalName = extractFirstMatch(compact, [/"legalName":"([^"]+)"/i, /"nameFull":"([^"]+)"/i]);
  const displayName = cleanCompanyNameCandidate(sourceSymbol, legalName || titleName);
  const consensusMatches = [...compact.matchAll(/consensus:"([^"]+)"/g)].map((match) => match[1]);
  const ratingPattern = "Strong Buy|Strong Sell|Outperform|Overweight|Underperform|Neutral|Buy|Hold|Sell";
  const latestConsensus = consensusMatches.length
    ? consensusMatches[consensusMatches.length - 1]
    : extractFirstMatch(compact, [new RegExp(`Analyst Consensus:\\s*(${ratingPattern})`, "i"), new RegExp(`consensus rating of "(${ratingPattern})"`, "i")]);
  const targetsBlock = compact.match(/targets:\{low:([0-9.]+),high:([0-9.]+),count:([0-9]+),median:([0-9.]+),average:([0-9.]+)/i);
  const targetTable = compact.match(/Target\s+Low\s+Average\s+Median\s+High\s+Price\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i);
  const targetAverage = targetsBlock ? Number(targetsBlock[5]) : parseNumber(targetTable?.[2] || extractFirstMatch(compact, [/average price target is \*\*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i, /average price target is\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i, /average price target of\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i]));
  const targetLow = targetsBlock ? Number(targetsBlock[1]) : parseNumber(targetTable?.[1] || extractFirstMatch(compact, [/low(?:est)? price target(?: for [A-Z]+)? is \*\*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i, /low(?:est)? target is\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i]));
  const targetHigh = targetsBlock ? Number(targetsBlock[2]) : parseNumber(targetTable?.[4] || extractFirstMatch(compact, [/high(?:est)? price target(?: for [A-Z]+)? is \*\*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i, /high(?:est)? is\s*([$\u20ac\u00a3]?[0-9][0-9,.]*)/i]));
  const targetMedian = targetsBlock ? Number(targetsBlock[4]) : parseNumber(targetTable?.[3]);
  const analystCount = targetsBlock ? Number(targetsBlock[3]) : parseNumber(extractFirstMatch(compact, [/The\s+([0-9]+)\s+analysts? that cover/i, /Based on\s+\*\*?([0-9]+)\*\*?\s+analysts?/i, /([0-9]+)\s+analysts?/i]));
  const nextEarningsDate = extractDateNearLabel(compact, ["Earnings Date", "Next Earnings", "Estimated Earnings Date"]);
  const recommendationTrends = extractRecommendationTrends(compact);
  const forecastUpdated = extractFirstMatch(compact, [/Price targets were last updated on\s*([^.]+)/i]) || extractLatestForecastDate(compact);

  return {
    name: displayName,
    analystView: formatStockAnalysisView(latestConsensus, analystCount, targetAverage),
    analystConsensus: latestConsensus,
    priceTarget: Number.isFinite(targetAverage) && targetAverage > 0 ? `$${Number(targetAverage).toFixed(2)}` : "",
    priceTargetValue: Number.isFinite(targetAverage) && targetAverage > 0 ? targetAverage : undefined,
    targetLow: Number.isFinite(targetLow) && targetLow > 0 ? `$${Number(targetLow).toFixed(2)}` : "",
    targetLowValue: Number.isFinite(targetLow) && targetLow > 0 ? targetLow : undefined,
    targetHigh: Number.isFinite(targetHigh) && targetHigh > 0 ? `$${Number(targetHigh).toFixed(2)}` : "",
    targetHighValue: Number.isFinite(targetHigh) && targetHigh > 0 ? targetHigh : undefined,
    targetMedian: Number.isFinite(targetMedian) && targetMedian > 0 ? `$${Number(targetMedian).toFixed(2)}` : "",
    targetMedianValue: Number.isFinite(targetMedian) && targetMedian > 0 ? targetMedian : undefined,
    analystCount: Number.isFinite(analystCount) && analystCount > 0 ? String(analystCount) : "",
    recommendationTrends,
    forecastUpdated,
    nextEarningsDate,
  };
}

function extractRecommendationTrends(text) {
  const block = extractSection(text, "## Recommendation Trends", "## Latest Forecasts");
  if (!block) return null;
  const labels = [...block.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+'?([0-9]{2})\b/g)].map((match) => `${match[1]} '${match[2]}`);
  const uniqueLabels = [...new Set(labels)].slice(0, 8);
  if (!uniqueLabels.length) return null;

  const ratings = ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell", "Total"];
  const rows = ratings.map((rating) => {
    const escaped = rating.replace(/ /g, "\\s+");
    const match = block.match(new RegExp(`${escaped}\\s+((?:[0-9]+\\s*){${uniqueLabels.length}})`, "i"));
    const values = match ? match[1].trim().split(/\s+/).slice(0, uniqueLabels.length).map((value) => Number(value) || 0) : uniqueLabels.map(() => 0);
    return { rating, values };
  });

  return { labels: uniqueLabels, rows };
}

function extractLatestForecastDate(text) {
  const block = extractSection(text, "## Latest Forecasts", "## Financial Forecast");
  return extractFirstMatch(block, [/\b([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})\b/]);
}

function extractSection(text, startLabel, endLabel) {
  const start = text.indexOf(startLabel);
  if (start < 0) return "";
  const end = text.indexOf(endLabel, start + startLabel.length);
  return end > start ? text.slice(start, end) : text.slice(start);
}
function formatStockAnalysisView(consensus, analystCount, targetAverage) {
  return [
    consensus,
    Number.isFinite(analystCount) && analystCount > 0 ? `${analystCount} analysts` : "",
    Number.isFinite(targetAverage) && targetAverage > 0 ? `target $${Number(targetAverage).toFixed(2)}` : "",
  ].filter(Boolean).join(" | ");
}
function parseGoogleFinanceText(text, target = {}) {
  const compact = normalizeWhitespace(text);
  const sourceSymbol = String(target.sourceSymbol || "").toUpperCase();
  const sourcePattern = sourceSymbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const quoteAnchor = sourceSymbol ? new RegExp(`${sourcePattern}\\n_(?:check|add|arrow|fiber|playlist)`, "i").exec(compact) : null;
  const start = quoteAnchor ? quoteAnchor.index : sourceSymbol ? compact.lastIndexOf(sourceSymbol) : -1;
  const quoteBlock = start >= 0 ? compact.slice(start, start + 1800) : compact;
  const title = compact.match(/^#\s*([^\n]+?)\s+-\s+Google Finance/im)?.[1] || compact.match(/^#\s*([^\n]+?)\s+Stock Price/im)?.[1] || "";
  const price = parseNumber(extractFirstMatch(quoteBlock, [/\n([$\u20ac\u00a3]?[0-9][0-9,.]*)\s*\n\s*_arrow/i, /\n([0-9][0-9,.]*)\s*\n\s*_arrow/i]));
  const dayChangePct = parseNumber(extractFirstMatch(quoteBlock, [/\n([+-]?[0-9][0-9,.]*)%\s*\n\s*\([+-]?[0-9][0-9,.]*\)\s+Today/i]));
  const dayChange = parseNumber(extractFirstMatch(quoteBlock, [/\(([+-]?[0-9][0-9,.]*)\)\s+Today/i]));
  const currencyRaw = extractFirstMatch(quoteBlock, [/Closed:[^\n]+?\s([A-Z]{3})\s*(?:\n|$)/i]);
  const currency = currencyRaw ? normalizeCurrency(currencyRaw) : "";
  const marketCap = parseCompactNumber(extractGoogleField(compact, "Mkt\\. cap"));
  const avgVolume = parseCompactNumber(extractGoogleField(compact, "Avg\\. vol\\."));
  const pe = parseNumber(extractGoogleField(compact, "P/E ratio"));
  const high52 = parseNumber(extractGoogleField(compact, "52-wk high"));
  const low52 = parseNumber(extractGoogleField(compact, "52-wk low"));
  const exDividendDate = extractGoogleField(compact, "Ex dividend date");
  const dividendYield = extractGoogleField(compact, "Dividend");
  const lastReport = extractDateNearLabel(compact, ["Last report"]);

  return {
    name: cleanPublicCompanyName(title),
    regularMarketPrice: Number.isFinite(price) && price > 0 ? price : undefined,
    price: Number.isFinite(price) && price > 0 ? price : undefined,
    regularMarketChange: Number.isFinite(dayChange) ? dayChange : undefined,
    regularMarketChangePercent: Number.isFinite(dayChangePct) ? dayChangePct : undefined,
    dayChangePct: Number.isFinite(dayChangePct) ? dayChangePct : undefined,
    currency,
    marketCap,
    averageDailyVolume3Month: avgVolume,
    trailingPE: Number.isFinite(pe) && pe > 0 ? pe : undefined,
    fiftyTwoWeekHigh: Number.isFinite(high52) && high52 > 0 ? high52 : undefined,
    fiftyTwoWeekLow: Number.isFinite(low52) && low52 > 0 ? low52 : undefined,
    exDividendDate,
    dividendYield,
    nextEarningsDate: lastReport ? `Last report ${lastReport}` : "",
  };
}

function extractGoogleField(text, labelPattern) {
  return extractFirstMatch(text, [new RegExp(`${labelPattern}\\s*\\n\\s*([^\\n]+)`, "i")]);
}
function normalizeWhitespace(value) {
  return String(value || "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function cleanPublicCompanyName(title, symbol = "") {
  const cleaned = String(title || "")
    .replace(/&amp;/g, "&")
    .replace(/\|.*$/g, "")
    .replace(/ - (Google Finance|MarketWatch|Nasdaq|Yahoo Finance|StockAnalysis).*$/i, "")
    .replace(/\s+(Stock Forecast.*|Stock Price.*|Stock Quote.*|Stock News.*|Stock Analysis.*|Quote|Overview|Earnings|Dividend History|Analyst Estimates).*$/i, "")
    .replace(/\(([A-Z0-9._=:-]+)\).*$/i, "")
    .trim();
  return cleanCompanyNameCandidate(symbol, cleaned);
}

function cleanCompanyNameCandidate(symbol, value) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  let name = String(value || "").replace(/\s+/g, " ").trim();
  if (!name) return "";

  name = name
    .replace(/\s*[-|]\s*(Google Finance|Finance Beta|MarketWatch(?:\.com)?|Nasdaq|Yahoo Finance|StockAnalysis(?:\.com)?|MarketBeat).*$/i, "")
    .replace(/\s+\b(Google Finance|Finance Beta|MarketWatch(?:\.com)?|Nasdaq|Yahoo Finance|StockAnalysis(?:\.com)?|MarketBeat)\b$/i, "")
    .trim();
  if (!name) return "";

  const normalizedName = normalizeSymbol(name);
  if (normalizedName === normalized || normalizedName === baseSymbol) return "";
  if (/^(GOOGLE FINANCE|FINANCE BETA|MARKETWATCH|MARKETWATCH\.COM|NASDAQ|YAHOO FINANCE|STOCKANALYSIS|STOCKANALYSIS\.COM|MARKETBEAT|JUST A MOMENT|ACCESS DENIED|ATTENTION REQUIRED)$/i.test(name)) return "";
  if (/Data is currently not available/i.test(name)) return "";

  return name;
}

function extractAnalystView(text) {
  const ratingPattern = "Strong Buy|Strong Sell|Outperform|Overweight|Underperform|Neutral|Buy|Hold|Sell";
  const rating = extractFirstMatch(text, [
    new RegExp(`(?:Analyst\\s+Rating|Consensus\\s+Rating|Average\\s+Rating)\\s*[:\\-]?\\s*(${ratingPattern})`, "i"),
    new RegExp(`\\b(${ratingPattern})\\b`, "i"),
  ]);
  const count = extractFirstMatch(text, [
    /Based on\s+([0-9]+)\s+analysts?/i,
    /([0-9]+)\s+analysts?\s+(?:offering|covering|have)/i,
  ]);
  const target = extractFirstMatch(text, [
    /(?:Average|Median|Consensus)\s+(?:Price\s+)?Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
    /Price\s+Target\s*[:\-]?\s*([$\u20ac\u00a3]?\s?[0-9][0-9,.]*)/i,
  ]);

  if (!rating && !count && !target) return "";
  return [rating, count ? `${count} analysts` : "", target ? `target ${target}` : ""].filter(Boolean).join(" | ");
}

function extractFirstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = String(text || "").match(pattern);
    if (match?.[1]) return match[1].trim().replace(/\s+/g, " ");
  }
  return "";
}

function extractDateNearLabel(text, labels) {
  const source = String(text || "");
  const datePattern = "([A-Z][a-z]{2,8}\\.?\\s+\\d{1,2},\\s+\\d{4}|\\d{1,2}/\\d{1,2}/\\d{2,4}|\\d{4}-\\d{2}-\\d{2})";
  const orderedLabels = [...labels].sort((a, b) => b.length - a.length);

  for (const label of orderedLabels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const labelBoundary = `(?:^|[^A-Za-z-])${escaped}`;
    const after = new RegExp(`${labelBoundary}\\s*[:\\-]?\\s*${datePattern}`, "i").exec(source);
    if (after?.[1]) return after[1].trim();
    const near = new RegExp(`${datePattern}.{0,80}${labelBoundary}`, "i").exec(source);
    if (near?.[1]) return near[1].trim();
  }

  return "";
}

function parseCompactNumber(value) {
  const raw = String(value || "").replace(/[$\u20ac\u00a3,]/g, "").trim().toUpperCase();
  if (!raw) return 0;
  const match = raw.match(/^([0-9.]+)\s*([KMBT])?$/);
  if (!match) return 0;
  const number = Number(match[1]);
  if (!Number.isFinite(number)) return 0;
  const multipliers = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 };
  return number * (multipliers[match[2]] || 1);
}

function formatDataSources(sources) {
  return [...new Set(sources.map((source) => String(source || "").trim()).filter(Boolean))].join(" + ");
}
function mergePublicStockData(items) {
  const merged = {};
  const sources = [];
  items.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key === "source") return;
      if (merged[key] === undefined || merged[key] === "" || merged[key] === 0) merged[key] = value;
    });
    if (item.source) sources.push(item.source);
  });
  if (sources.length) merged.source = formatDataSources(sources);
  return merged;
}

async function fetchTickerNameFromPublicPages(symbol, holding = {}) {
  const data = await fetchPublicStockPages(symbol, holding).catch(() => ({}));
  return data.name || "";
}

async function fetchYahooQuoteData(symbol, holding = {}) {
  const candidates = buildYahooQuoteSymbols(symbol, holding);
  const query = encodeURIComponent(candidates.join(","));
  const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${query}`;
  const urls = [yahooUrl, `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`];

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      const quote = selectYahooQuote(data?.quoteResponse?.result || [], symbol);
      if (quote) return normalizeYahooQuote(quote);
    } catch {
      continue;
    }
  }

  throw new Error("No Yahoo quote found");
}

function buildYahooQuoteSymbols(symbol, holding = {}) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  const assetClass = holding.assetClass || inferAssetClassFromSymbol(normalized);
  const manualYahooSymbol = getManualSourceSymbol(normalized);
  const symbols = [manualYahooSymbol, normalized, baseSymbol];

  if (assetClass === "Crypto") {
    symbols.unshift(`${baseSymbol}-EUR`, `${baseSymbol}-USD`);
  }
  if (normalized.endsWith(".US")) symbols.unshift(baseSymbol);
  if (normalized.endsWith(".L")) symbols.unshift(normalized);

  return [...new Set(symbols.filter(Boolean))];
}

function selectYahooQuote(quotes, symbol) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  return quotes.find((quote) => normalizeSymbol(quote.symbol) === normalized)
    || quotes.find((quote) => normalizeSymbol(quote.symbol) === baseSymbol)
    || quotes.find((quote) => getBaseTickerSymbol(quote.symbol) === baseSymbol)
    || quotes[0]
    || null;
}

function normalizeYahooQuote(quote) {
  return {
    symbol: normalizeSymbol(quote.symbol),
    name: String(quote.longName || quote.shortName || quote.displayName || "").trim(),
    currency: normalizeCurrency(quote.currency || BASE_CURRENCY),
    regularMarketPrice: Number(quote.regularMarketPrice) || 0,
    price: Number(quote.regularMarketPrice) || 0,
    regularMarketChange: Number(quote.regularMarketChange) || 0,
    regularMarketChangePercent: Number(quote.regularMarketChangePercent) || 0,
    dayChangePct: Number(quote.regularMarketChangePercent) || 0,
    marketCap: Number(quote.marketCap) || 0,
    trailingPE: Number(quote.trailingPE) || 0,
    forwardPE: Number(quote.forwardPE) || 0,
    fiftyTwoWeekLow: Number(quote.fiftyTwoWeekLow) || 0,
    fiftyTwoWeekHigh: Number(quote.fiftyTwoWeekHigh) || 0,
    averageDailyVolume3Month: Number(quote.averageDailyVolume3Month) || 0,
    averageDailyVolume10Day: Number(quote.averageDailyVolume10Day) || 0,
    exchange: quote.exchange || "",
    fullExchangeName: quote.fullExchangeName || quote.exchange || "",
    quoteType: quote.quoteType || "",
    source: "Yahoo Finance",
  };
}

function formatLargeNumber(value, currency = "") {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return "--";
  const formatted = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(number);
  return currency ? `${currency} ${formatted}` : formatted;
}

function formatMaybeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? formatDecimal(number) : "--";
}

function formatRange(low, high, currency) {
  const safeLow = Number(low);
  const safeHigh = Number(high);
  if (!Number.isFinite(safeLow) || !Number.isFinite(safeHigh) || safeLow <= 0 || safeHigh <= 0) return "--";
  return `${formatMoney(safeLow, currency)} - ${formatMoney(safeHigh, currency)}`;
}

function displayAssetClass(assetClass) {
  const labels = {
    Equity: "Stocks",
    Crypto: "Crypto",
    Bonds: "Bonds",
    "Real Estate": "Real estate",
    Commodities: "Commodities",
    Cash: "Cash",
  };
  return labels[assetClass] || assetClass;
}

function renderTargets() {
  const targetList = document.getElementById("targetList");
  const total = getVisibleTargetTotal();
  const targetTotal = document.getElementById("targetTotal");
  if (!targetList || !targetTotal) return;

  targetTotal.textContent = `${total}%`;
  targetTotal.classList.toggle("warning", total !== 100);

  targetList.innerHTML = getAssetClasses()
    .map(
      (assetClass) => `
        <div class="target-row">
          <label for="target-${slug(assetClass)}">${escapeHtml(assetClass)}</label>
          <input id="target-${slug(assetClass)}" type="range" min="0" max="80" step="1" value="${state.targets[assetClass] ?? 0}" data-target="${escapeAttribute(assetClass)}">
          <input type="number" min="0" max="100" step="1" value="${state.targets[assetClass] ?? 0}" data-target="${escapeAttribute(assetClass)}" aria-label="${escapeAttribute(assetClass)} target percent">
        </div>
      `,
    )
    .join("");

  targetList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const assetClass = event.target.dataset.target;
      const value = clamp(Number(event.target.value), 0, 100);
      state.targets[assetClass] = value;
      syncTargetInputs(assetClass, value);
      saveTargets();
      renderTrades();
    });
  });

  renderTrades();
}

function syncTargetInputs(assetClass, value) {
  document.querySelectorAll(`[data-target="${cssEscape(assetClass)}"]`).forEach((input) => {
    input.value = value;
  });

  const total = getVisibleTargetTotal();
  const targetTotal = document.getElementById("targetTotal");
  targetTotal.textContent = `${total}%`;
  targetTotal.classList.toggle("warning", total !== 100);
}

function renderTrades() {
  const tradeList = document.getElementById("tradeList");
  if (!tradeList) return;
  const totalValue = getTotalValue();
  const classes = getAssetClasses();
  const tradeRows = classes.map((assetClass) => {
    const current = getClassValue(assetClass);
    const targetValue = totalValue * ((state.targets[assetClass] ?? 0) / 100);
    const difference = targetValue - current;
    const action = Math.abs(difference) < totalValue * 0.006 ? "Hold" : difference > 0 ? "Buy" : "Sell";
    return { assetClass, current, targetValue, difference, action };
  });

  tradeList.innerHTML = tradeRows.length
    ? tradeRows
        .map(
          (row) => `
            <div class="trade-item">
              <span>
                <strong>${escapeHtml(row.assetClass)}</strong>
                <span>${eurFormatter.format(row.current)} current to ${eurFormatter.format(row.targetValue)} target</span>
              </span>
              <strong class="action-${row.action.toLowerCase()}">${row.action} ${eurFormatter.format(Math.abs(row.difference))}</strong>
            </div>
          `,
        )
        .join("")
    : `<div class="trade-item"><span><strong>No holdings</strong><span>Add holdings to calculate target trades.</span></span></div>`;
}

function renderTransactions() {
  const allRows = [...state.transactions].sort(compareTransactionsDesc);
  const rows = allRows.filter((transaction) => {
    if (!state.transactionSearch) return true;
    return `${transaction.symbol || ""} ${transaction.name || ""}`.toLowerCase().includes(state.transactionSearch);
  });
  const shouldCollapse = rows.length > TRANSACTION_PREVIEW_LIMIT && !state.transactionsExpanded;
  const visibleRows = shouldCollapse ? rows.slice(0, TRANSACTION_PREVIEW_LIMIT) : rows;
  const entryLabel = allRows.length === 1 ? "entry" : "entries";
  const countLabel = rows.length === allRows.length
    ? `${visibleRows.length} / ${allRows.length} ${entryLabel}`
    : `${visibleRows.length} / ${rows.length} shown (${allRows.length} total)`;
  const toggleButton = document.getElementById("toggleTransactions");

  document.getElementById("transactionCount").textContent = countLabel;
  if (toggleButton) {
    toggleButton.hidden = rows.length <= TRANSACTION_PREVIEW_LIMIT;
    toggleButton.textContent = state.transactionsExpanded ? "Show less" : `Show all ${rows.length}`;
    toggleButton.setAttribute("aria-expanded", String(state.transactionsExpanded));
  }

  pruneSelectedTransactions();
  document.getElementById("transactionsBody").innerHTML = visibleRows.length
    ? visibleRows
        .map(
          (transaction) => `
            <tr>
              <td class="select-column">
                <input type="checkbox" data-select-transaction="${escapeAttribute(transaction.id)}" aria-label="Select ${escapeAttribute(transaction.symbol || "transaction")}" ${state.selectedTransactionIds.has(transaction.id) ? "checked" : ""}>
              </td>
              <td>${escapeHtml(formatTransactionDate(transaction))}</td>
              <td><span class="pill">${escapeHtml(capitalize(transaction.type))}</span></td>
              <td>${renderTickerWithPlatform(transaction)}</td>
              <td class="number">${formatQuantity(transaction.quantity)}</td>
              <td class="number">${formatMoney(transaction.price || 0, transaction.currency || BASE_CURRENCY)}</td>
              <td class="number">${formatMoney(transaction.fees || 0, transaction.currency || BASE_CURRENCY)}</td>
              <td class="number ${transaction.cashImpactEUR >= 0 ? "positive" : "negative"}">${formatSignedEUR(transaction.cashImpactEUR)}</td>
              <td class="number">
                <button class="table-icon-button" type="button" data-edit-transaction="${escapeAttribute(transaction.id)}" aria-label="Edit ${escapeAttribute(transaction.symbol || "transaction")}" title="Edit transaction">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17.25V20h2.75L17.81 8.94l-2.75-2.75L4 17.25ZM19.71 7.04a1 1 0 0 0 0-1.41l-1.34-1.34a1 1 0 0 0-1.41 0l-1.05 1.05 2.75 2.75 1.05-1.05Z"/></svg>
                </button>
              </td>
            </tr>
          `,
        )
        .join("")
    : `<tr class="empty-row"><td colspan="9">No transactions match the current view.</td></tr>`;
  renderBulkTransactionBar();
}
function updateSelectedTransaction(id, selected) {
  if (!id) return;
  if (selected) {
    state.selectedTransactionIds.add(id);
  } else {
    state.selectedTransactionIds.delete(id);
  }
}

function pruneSelectedTransactions() {
  const existingIds = new Set(state.transactions.map((transaction) => transaction.id));
  [...state.selectedTransactionIds].forEach((id) => {
    if (!existingIds.has(id)) state.selectedTransactionIds.delete(id);
  });
}

function renderBulkTransactionBar() {
  const selectedCount = state.selectedTransactionIds.size;
  const bulkBar = document.getElementById("bulkTransactionBar");
  const selectAll = document.getElementById("selectAllTransactions");
  const visibleCheckboxes = [...document.querySelectorAll("[data-select-transaction]")];
  const selectedVisibleCount = visibleCheckboxes.filter((checkbox) => checkbox.checked).length;

  bulkBar.hidden = selectedCount === 0;
  document.getElementById("bulkTransactionCount").textContent = `${selectedCount} selected`;
  selectAll.checked = visibleCheckboxes.length > 0 && selectedVisibleCount === visibleCheckboxes.length;
  selectAll.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleCheckboxes.length;
}

function clearSelectedTransactions() {
  state.selectedTransactionIds.clear();
  setStatus("bulkTransactionStatus", "", "");
  renderTransactions();
}

function applyBulkTransactionPlatform() {
  const selectedIds = [...state.selectedTransactionIds];
  if (!selectedIds.length) return;
  const platform = normalizePlatform(document.getElementById("bulkTransactionPlatform").value || "Other");

  try {
    state.transactions = state.transactions.map((transaction) =>
      state.selectedTransactionIds.has(transaction.id)
        ? {
            ...transaction,
            platform,
            name: transaction.symbol === "CASH" ? `${platform} cash` : transaction.name,
          }
        : transaction,
    );
    rebuildTransactionsAndSave(`Updated broker for ${selectedIds.length} transaction${selectedIds.length === 1 ? "" : "s"}.`);
  } catch (error) {
    setStatus("bulkTransactionStatus", error.message, "error");
  }
}

function deleteBulkTransactions() {
  const selectedIds = [...state.selectedTransactionIds];
  if (!selectedIds.length) return;
  if (!window.confirm(`Delete ${selectedIds.length} selected transaction${selectedIds.length === 1 ? "" : "s"}?`)) return;

  try {
    state.transactions = state.transactions.filter((transaction) => !state.selectedTransactionIds.has(transaction.id));
    state.selectedTransactionIds.clear();
    rebuildTransactionsAndSave(`Deleted ${selectedIds.length} transaction${selectedIds.length === 1 ? "" : "s"}.`);
  } catch (error) {
    setStatus("bulkTransactionStatus", error.message, "error");
  }
}

function rebuildTransactionsAndSave(message) {
  const rebuilt = rebuildPortfolioFromTransactions(state.transactions);
  state.transactions = rebuilt.transactions;
  saveTransactions();
  saveHoldings();
  saveTickers();
  rebuildAfterDataChange();
  setStatus(
    "bulkTransactionStatus",
    `${message}${rebuilt.errors.length ? ` Skipped ${rebuilt.errors.length} during rebuild.` : ""}`,
    rebuilt.errors.length ? "error" : "success",
  );
}

function renderTickerWithPlatform(item) {
  const ticker = escapeHtml(item.symbol || "-");
  return `<span class="ticker-with-platform">${renderPlatformIcon(item.platform, "mini")}<span>${ticker}</span></span>`;
}

function renderPlatformPicker(containerId, inputId) {
  const container = document.getElementById(containerId);
  const input = document.getElementById(inputId);
  if (!container || !input) return;

  const selected = normalizePlatform(input.value);
  input.value = selected;
  container.innerHTML = getPlatforms()
    .map((platform) => {
      const normalized = normalizePlatform(platform);
      const active = normalized === selected;
      return `
        <button class="platform-icon-button ${active ? "active" : ""}" type="button" role="radio" aria-checked="${String(active)}" data-platform="${escapeAttribute(normalized)}" title="${escapeAttribute(normalized)}" aria-label="${escapeAttribute(normalized)}">
          ${renderPlatformIcon(normalized)}
        </button>
      `;
    })
    .join("");
}

function getPlatformInputIdForPicker(pickerId) {
  const map = {
    transactionPlatformPicker: "transactionPlatform",
    tickerPlatformPicker: "tickerPlatform",
    bulkTransactionPlatformPicker: "bulkTransactionPlatform",
  };
  return map[pickerId] || "";
}

function renderPlatformIcon(platform, density = "default") {
  const info = getPlatformInfo(platform);
  const icon = info.slug
    ? `<img src="https://cdn.simpleicons.org/${encodeURIComponent(info.slug)}/${info.color}?viewbox=auto" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false">`
    : "";
  const fallbackHidden = info.slug ? " hidden" : "";
  return `
    <span class="platform-icon platform-icon-${density}" title="${escapeAttribute(info.name)}">
      ${icon}
      <span class="platform-fallback"${fallbackHidden}>${escapeHtml(info.initials)}</span>
    </span>
  `;
}

function renderCharts() {
  renderPerformanceChart();
  renderDistributionCharts();
}

function renderPerformanceChart() {
  const canvas = document.getElementById("performanceChart");
  const lines = getPerformanceLines();
  const ctx = prepareCanvas(canvas);
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const padding = { top: 16, right: 16, bottom: 34, left: 52 };
  const allValues = lines.flatMap((line) => line.points.map((point) => point.value));
  let min = Math.min(...allValues) * 0.985;
  let max = Math.max(...allValues) * 1.015;
  if (min === max) {
    min -= 1;
    max += 1;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  drawReturnGrid(ctx, width, height, padding, min, max);
  const dateDomain = getLineDateDomain(lines);
  lines.forEach((line) => {
    drawIndexedLine(ctx, line.points, line.color, width, height, padding, min, max, dateDomain, line.label === "Portfolio" ? 5 : 2.5);
  });
  drawAxisLabels(ctx, dateDomain, width, height, padding);
  drawPerformanceHover(ctx, lines, width, height, padding, min, max, dateDomain);
  renderChartLegend(lines);
}

function renderDistributionCharts() {
  const typeData = getTypeDistributionData();
  const weightData = getWeightDistributionData();
  const sectorData = getSectorDistributionData();
  drawDonutChart(document.getElementById("typeDistributionChart"), typeData, "Type");
  drawDonutChart(document.getElementById("weightDistributionChart"), weightData, "Weight");
  drawDonutChart(document.getElementById("sectorDistributionChart"), sectorData, "Theme");
  renderDonutLegend("typeDistributionLegend", typeData);
  renderDonutLegend("weightDistributionLegend", weightData);
  renderDonutLegend("sectorDistributionLegend", sectorData);
}

function getTypeDistributionData() {
  const weights = getAssetWeights();
  return Object.entries(weights)
    .filter(([, value]) => value > 0)
    .map(([assetClass, value], index) => ({
      label: displayAssetClass(assetClass),
      value,
      color: getClassColor(assetClass, index),
    }))
    .sort((a, b) => b.value - a.value);
}

function getWeightDistributionData() {
  const totalValue = getTotalValue();
  const grouped = getVisibleHoldings()
    .filter((holding) => getMarketValue(holding) > 0)
    .reduce((items, holding) => {
      const label = holding.symbol;
      items[label] = (items[label] || 0) + getMarketValue(holding);
      return items;
    }, {});

  const rows = Object.entries(grouped)
    .map(([label, value], index) => ({
      label,
      value: safePercent(value, totalValue),
      color: fallbackColors[index % fallbackColors.length],
    }))
    .sort((a, b) => b.value - a.value);

  const visible = rows.slice(0, 5);
  const other = rows.slice(5).reduce((sum, row) => sum + row.value, 0);
  return other > 0 ? [...visible, { label: "Other", value: other, color: "#94a3b8" }] : visible;
}
function getSectorDistributionData() {
  const totalValue = getTotalValue();
  const grouped = getVisibleHoldings()
    .filter((holding) => getMarketValue(holding) > 0)
    .reduce((items, holding) => {
      const label = getHoldingSectorTheme(holding);
      items[label] = (items[label] || 0) + getMarketValue(holding);
      return items;
    }, {});

  const rows = Object.entries(grouped)
    .map(([label, value], index) => ({
      label,
      value: safePercent(value, totalValue),
      color: getThemeColor(label, index),
    }))
    .sort((a, b) => b.value - a.value);

  const visible = rows.slice(0, 6);
  const other = rows.slice(6).reduce((sum, row) => sum + row.value, 0);
  return other > 0 ? [...visible, { label: "Other", value: other, color: "#94a3b8" }] : visible;
}

function getHoldingSectorTheme(holding) {
  const symbol = normalizeSymbol(holding?.symbol || "");
  const baseSymbol = getBaseTickerSymbol(symbol);
  const assetClass = displayAssetClass(holding?.assetClass || "");
  if (/crypto/i.test(assetClass)) return "Crypto";
  if (/ETF|fund/i.test(assetClass)) return "Broad ETF";
  if (/commodit/i.test(assetClass)) return "Commodities";

  const analysis = getAnalysisForHolding(holding);
  const text = normalizeWhitespace([
    symbol,
    baseSymbol,
    holding?.name,
    holding?.assetClass,
    analysis?.name,
    analysis?.sector,
    analysis?.industry,
    analysis?.description,
  ].filter(Boolean).join(" ")).toLowerCase();

  if (matchesTheme(text, symbol, ["RBLX", "TTWO", "EA", "U", "NTDOY", "SE"], ["gaming", "video game", "interactive entertainment", "esports", "casino", "betting"])) return "Gaming";
  if (matchesTheme(text, symbol, ["CRWD", "PANW", "ZS", "FTNT", "OKTA", "NET", "S"], ["cybersecurity", "cyber security", "network security", "security software", "identity security", "zero trust"])) return "Security";
  if (matchesTheme(text, symbol, ["NVDA", "SMCI", "PLTR", "AI", "TSM", "ASML", "ARM"], ["artificial intelligence", "machine learning", "data center", "gpu", "accelerated computing", "semiconductor"])) return "AI";
  if (matchesTheme(text, symbol, ["AAPL", "SONY", "LOGI", "AMD", "INTC", "QCOM"], ["electronics", "consumer electronics", "hardware", "devices", "electrical equipment", "computer hardware"])) return "Electronics";
  if (matchesTheme(text, symbol, ["TE", "FSLR", "ENPH", "SEDG", "XOM", "CVX", "SHEL"], ["energy", "solar", "renewable", "oil", "gas", "utilities", "power generation"])) return "Energy";
  if (matchesTheme(text, symbol, ["NVO", "LLY", "PFE", "MRNA", "JNJ", "UNH"], ["healthcare", "health care", "pharma", "biotech", "medical", "drug manufacturer"])) return "Healthcare";
  if (matchesTheme(text, symbol, ["COIN", "PYPL", "SQ", "V", "MA", "JPM", "BAC"], ["financial", "bank", "payments", "fintech", "capital markets", "asset management"])) return "Finance";
  if (matchesTheme(text, symbol, ["ALB", "RIO", "BHP", "VALE", "FCX"], ["materials", "lithium", "chemicals", "mining", "metals", "specialty chemicals"])) return "Materials";
  if (matchesTheme(text, symbol, ["AMZN", "TSLA", "NKE", "MCD", "SBUX"], ["consumer discretionary", "retail", "restaurant", "automotive", "e-commerce"])) return "Consumer";
  if (matchesTheme(text, symbol, ["MSFT", "GOOGL", "GOOG", "META", "ORCL", "CRM", "ADBE"], ["software", "internet content", "cloud", "communication services", "technology"])) return "Software";
  if (matchesTheme(text, symbol, ["BA", "GE", "CAT", "DE", "HON"], ["industrial", "aerospace", "machinery", "manufacturing"])) return "Industrials";
  if (matchesTheme(text, symbol, ["O", "VNQ", "PLD"], ["real estate", "reit"])) return "Real estate";

  return cleanSectorLabel(analysis?.sector) || cleanSectorLabel(holding?.assetClass) || "Other";
}

function getAnalysisForHolding(holding) {
  const symbol = normalizeSymbol(holding?.symbol || "");
  const baseSymbol = getBaseTickerSymbol(symbol);
  return state.stockAnalysis[symbol] || state.stockAnalysis[baseSymbol] || {};
}

function matchesTheme(text, symbol, symbols, phrases) {
  if (symbols.includes(symbol) || symbols.includes(getBaseTickerSymbol(symbol))) return true;
  return phrases.some((phrase) => text.includes(phrase));
}

function cleanSectorLabel(value) {
  const label = cleanLinkedText(value || "").replace(/\s+/g, " ").trim();
  if (!label || label.length > 28 || /^(stocks?|equity)$/i.test(label)) return "";
  return label.replace(/\bAnd\b/g, "and");
}

function getThemeColor(label, index) {
  const colors = {
    AI: "#0f766e",
    Electronics: "#2563eb",
    Security: "#7c3aed",
    Gaming: "#c0840c",
    Energy: "#dc2626",
    Healthcare: "#0891b2",
    Finance: "#be185d",
    Materials: "#14b8a6",
    Software: "#4f46e5",
    Consumer: "#f59e0b",
    Industrials: "#64748b",
    Crypto: "#ea580c",
    "Broad ETF": "#16a34a",
    Commodities: "#a16207",
    "Real estate": "#9333ea",
  };
  return colors[label] || fallbackColors[index % fallbackColors.length];
}

function drawDonutChart(canvas, data, centerLabel) {
  if (!canvas) return;
  const ctx = prepareCanvas(canvas);
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.max(28, Math.min(width, height) / 2 - 8);
  const innerRadius = radius * 0.62;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const hover = getDonutHoverItem(canvas.id, data, total, centerX, centerY, radius, innerRadius);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (total <= 0) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = radius - innerRadius;
    ctx.strokeStyle = "#e5ecea";
    ctx.stroke();
  } else {
    let startAngle = -Math.PI / 2;
    data.forEach((item) => {
      const angle = (item.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = item === hover?.item ? brightenColor(item.color) : item.color;
      ctx.fill();
      startAngle += angle;
    });
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = "#17201f";
  ctx.font = "800 18px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(total > 0 ? `${Math.round(total)}%` : "0%", centerX, centerY - 7);
  ctx.fillStyle = "#65706e";
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  ctx.fillText(centerLabel, centerX, centerY + 12);

  if (hover) drawDonutTooltip(ctx, hover, width, height);
}

function getDonutHoverItem(canvasId, data, total, centerX, centerY, radius, innerRadius) {
  const point = state.donutHover?.[canvasId];
  if (!point || total <= 0) return null;

  const dx = point.x - centerX;
  const dy = point.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < innerRadius || distance > radius) return null;

  let angle = Math.atan2(dy, dx);
  if (angle < -Math.PI / 2) angle += Math.PI * 2;

  let startAngle = -Math.PI / 2;
  for (const item of data) {
    const slice = (item.value / total) * Math.PI * 2;
    const endAngle = startAngle + slice;
    if (angle >= startAngle && angle <= endAngle) {
      return { item, x: point.x, y: point.y };
    }
    startAngle = endAngle;
  }

  return null;
}

function drawDonutTooltip(ctx, hover, width, height) {
  const title = hover.item.label;
  const value = formatPercent(hover.item.value);
  ctx.save();
  ctx.font = "800 12px Inter, system-ui, sans-serif";
  const titleWidth = ctx.measureText(title).width;
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  const valueWidth = ctx.measureText(value).width;
  const boxWidth = Math.max(titleWidth, valueWidth) + 22;
  const boxHeight = 46;
  const boxX = clamp(hover.x + 12, 8, width - boxWidth - 8);
  const boxY = clamp(hover.y - boxHeight - 10, 8, height - boxHeight - 8);

  ctx.fillStyle = "rgba(23, 32, 31, 0.92)";
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(title, boxX + 11, boxY + 8);
  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  ctx.fillText(value, boxX + 11, boxY + 26);
  ctx.restore();
}

function brightenColor(color) {
  const hex = String(color || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;
  const channels = [0, 2, 4].map((start) => parseInt(hex.slice(start, start + 2), 16));
  const bright = channels.map((channel) => Math.min(255, Math.round(channel + (255 - channel) * 0.22)));
  return `#${bright.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function renderDonutLegend(id, data) {
  const host = document.getElementById(id);
  if (!host) return;
  host.innerHTML = data.length
    ? data
        .map(
          (item) => `
            <div class="donut-legend-item">
              <i class="color-swatch" style="background:${item.color}"></i>
              <span>${escapeHtml(item.label)}</span>
              <strong>${formatPercent(item.value)}</strong>
            </div>
          `,
        )
        .join("")
    : `<div class="donut-legend-item"><i class="color-swatch"></i><span>No holdings</span><strong>0%</strong></div>`;
}

function getPerformanceLines() {
  const portfolioPoints = normalizeSeries(
    filterPerformanceData().map((point) => ({ date: point.date, value: point.portfolio })),
  );
  const benchmarkLines = state.activeBenchmarks
    .map((id) => benchmarkDefinitions.find((benchmark) => benchmark.id === id))
    .filter(Boolean)
    .map((benchmark) => ({
      label: benchmark.name,
      color: benchmark.color,
      points: normalizeSeries(filterBenchmarkSeries(benchmark.id)),
    }))
    .filter((line) => line.points.length > 1);

  return [{ label: "Portfolio", color: "#0f766e", points: portfolioPoints }, ...benchmarkLines];
}

function renderChartLegend(lines) {
  document.getElementById("chartLegend").innerHTML = lines
    .map(
      (line) => `
        <span><i class="legend-dot" style="background:${line.color}"></i>${escapeHtml(line.label)}</span>
      `,
    )
    .join("");
}

function renderInvestorProfile() {
  const profile = buildInvestorProfile();

  document.getElementById("profileTitle").textContent = profile.title;
  document.getElementById("profileScore").textContent = `${profile.overallScore} / 100`;
  document.getElementById("profileSummary").textContent = profile.summary;
  document.getElementById("profileInsights").innerHTML = profile.insights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("profileGuardrails").innerHTML = profile.factors.map(renderProfileFactor).join("");
}

function renderProfileFactor(item) {
  const score = clamp(Number(item.score) || 0, 0, 100);
  return `
    <li class="profile-factor">
      <div class="profile-factor-heading">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${Math.round(score)} / 100</span>
      </div>
      <div class="profile-factor-meter" aria-hidden="true"><span style="width:${score}%"></span></div>
      <p>${escapeHtml(item.detail)}</p>
    </li>
  `;
}

function buildInvestorProfile() {
  const totalValue = getTotalValue();
  const holdingsRows = getHoldingWeightRows();
  const themeRows = getThemeWeightRows();
  const assetRows = getAssetWeightRows();
  const topHolding = holdingsRows[0] || null;
  const topThreeWeight = holdingsRows.slice(0, 3).reduce((sum, row) => sum + row.weight, 0);
  const topTheme = themeRows[0] || null;
  const topThreeThemeWeight = themeRows.slice(0, 3).reduce((sum, row) => sum + row.weight, 0);
  const trendyWeight = themeRows
    .filter((row) => ["AI", "Security", "Gaming", "Electronics", "Crypto", "Software"].includes(row.label))
    .reduce((sum, row) => sum + row.weight, 0);
  const volatileWeight = themeRows
    .filter((row) => ["AI", "Gaming", "Crypto", "Energy", "Materials"].includes(row.label))
    .reduce((sum, row) => sum + row.weight, 0);
  const etfWeight = (assetRows.find((row) => /ETF/i.test(row.label))?.weight || 0) + (themeRows.find((row) => row.label === "Broad ETF")?.weight || 0);
  const cryptoWeight = assetRows.find((row) => /Crypto/i.test(row.label))?.weight || 0;
  const defensiveWeight = assetRows
    .filter((row) => /Bond|Cash|Commodit/i.test(row.label))
    .reduce((sum, row) => sum + row.weight, 0);

  if (totalValue <= 0) {
    return {
      title: "Portfolio scorecard",
      overallScore: 0,
      summary: "Add holdings or transactions to generate a portfolio rating based on balance, sector concentration, liquidity, trend exposure, news flow, and risk control.",
      insights: ["No open positions are available yet."],
      factors: [
        { label: "Balance", score: 0, detail: "No portfolio value to evaluate yet." },
        { label: "Sector", score: 0, detail: "No sector or theme weights are active yet." },
        { label: "Liquidity", score: 0, detail: "Volume quality appears after market data is loaded." },
        { label: "Trend", score: 0, detail: "Trend exposure appears after holdings are added." },
        { label: "News", score: 0, detail: "News sentiment appears after headlines are checked." },
        { label: "Risk control", score: 0, detail: "Risk control appears after positions are added." },
      ],
    };
  }

  const balanceScore = Math.round(clamp(100 - Math.max(0, (topHolding?.weight || 0) - 18) * 1.5 - Math.max(0, topThreeWeight - 45) - Math.max(0, (topTheme?.weight || 0) - 35) * 0.8, 0, 100));
  const diversificationScore = Math.round(clamp((Math.min(holdingsRows.length, 12) / 12) * 55 + (Math.min(themeRows.length, 6) / 6) * 45 - Math.max(0, topThreeWeight - 60) * 0.7, 0, 100));
  const sectorScore = Math.round(clamp(100 - Math.max(0, (topTheme?.weight || 0) - 28) * 1.35 - Math.max(0, topThreeThemeWeight - 68) * 0.7, 0, 100));
  const liquidity = calculatePortfolioLiquidityScore();
  const riskScore = Math.round(clamp(30 + cryptoWeight * 0.75 + volatileWeight * 0.42 + Math.max(0, (topHolding?.weight || 0) - 15) * 0.65 - etfWeight * 0.18 - defensiveWeight * 0.22, 0, 100));
  const trendScore = Math.round(clamp(trendyWeight + cryptoWeight * 0.4 + Math.max(0, volatileWeight - 20) * 0.35, 0, 100));
  const trendDisciplineScore = Math.round(clamp(100 - Math.abs(trendScore - 42) * 1.05 - Math.max(0, trendyWeight - 55) * 0.45, 0, 100));
  const riskControlScore = Math.round(clamp(100 - (riskScore * 0.55 + Math.max(0, topThreeWeight - 45) * 0.45), 0, 100));
  const newsRisk = buildPortfolioNewsRisk();
  const newsScore = newsRisk.hasCoverage ? Math.round(clamp(100 - newsRisk.score, 0, 100)) : 55;
  const overallScore = Math.round(clamp(
    balanceScore * 0.22
    + sectorScore * 0.15
    + liquidity.score * 0.14
    + trendDisciplineScore * 0.13
    + newsScore * 0.15
    + riskControlScore * 0.21,
    0,
    100,
  ));

  const title = getPortfolioRatingTitle(overallScore);
  const summary = `This portfolio rates ${overallScore} / 100: ${formatPortfolioRatingDescriptor(overallScore)}. The largest theme is ${topTheme ? `${topTheme.label} at ${formatPercent(topTheme.weight)}` : "not clear yet"}, the top three positions are ${formatPercent(topThreeWeight)}, and news risk is ${newsRisk.hasCoverage ? newsRisk.level.toLowerCase() : "not fully loaded yet"}.`;
  const realizedRows = getRealizedGainRows();

  const insights = [
    `Sector/theme weights: ${formatWeightList(themeRows, 4)}. Top three themes are ${formatPercent(topThreeThemeWeight)}.`,
    `Asset class split: ${formatWeightList(assetRows, 4)}. Diversification sub-score is ${diversificationScore} / 100.`,
    topHolding ? `Largest holding is ${topHolding.symbol} at ${formatPercent(topHolding.weight)}; top 3 holdings are ${formatPercent(topThreeWeight)}.` : "No single open holding dominates yet.",
    liquidity.coveredWeight > 0 ? `Liquidity check covered ${formatPercent(liquidity.coveredWeight)} of open value; weakest volume signal is ${liquidity.weakestLabel}.` : "Volume data is still limited; open a few stock windows to enrich liquidity scoring.",
    newsRisk.hasCoverage ? newsRisk.summary : "News score will sharpen as ticker headlines are checked.",
    realizedRows.length ? `Realized G/L by class: ${formatSignedWeightList(realizedRows, 3)}.` : "No realized gains or losses are recorded yet.",
  ];

  const factors = [
    {
      label: "Balance",
      score: balanceScore,
      detail: topHolding && topHolding.weight > 25
        ? `${topHolding.symbol} is a large position, so balance depends on whether you are comfortable with that single-company exposure.`
        : "No single holding is overwhelming the portfolio based on the current open positions.",
    },
    {
      label: "Sector",
      score: sectorScore,
      detail: topTheme
        ? `${topTheme.label} is ${formatPercent(topTheme.weight)} of open value; top three themes are ${formatPercent(topThreeThemeWeight)}.`
        : "Sector/theme concentration is not clear yet.",
    },
    {
      label: "Liquidity",
      score: liquidity.score,
      detail: liquidity.detail,
    },
    {
      label: "Trend",
      score: trendDisciplineScore,
      detail: trendScore >= 65
        ? "Trend exposure is high, so the portfolio may move with current narratives such as AI, software, crypto, or security."
        : trendScore >= 35
          ? "Trend exposure is present but not dominant, which leaves room to be selective."
          : "Trend exposure is low; this can reduce narrative risk but may also limit growth-theme participation.",
    },
    {
      label: "News",
      score: newsScore,
      detail: newsRisk.hasCoverage
        ? `${newsRisk.summary} Coverage: ${newsRisk.detail}.`
        : "News sentiment is not fully loaded yet; open stock windows or wait for the background headline check.",
    },
    {
      label: "Risk control",
      score: riskControlScore,
      detail: riskScore >= 70
        ? "Underlying risk reads high because volatile themes, crypto, or concentration carry a lot of the portfolio."
        : riskScore >= 45
          ? "Underlying risk reads moderate: there is growth exposure, but it is not all concentrated in one risky bucket."
          : "Underlying risk reads relatively low because volatile themes are limited or diversified by broader holdings.",
    },
  ];

  return { title, overallScore, summary, insights, factors };
}

function getPortfolioRatingTitle(score) {
  if (score >= 82) return "Strong portfolio rating";
  if (score >= 68) return "Healthy portfolio rating";
  if (score >= 52) return "Watchlist portfolio rating";
  if (score >= 36) return "Fragile portfolio rating";
  return "High-review portfolio rating";
}

function formatPortfolioRatingDescriptor(score) {
  if (score >= 82) return "strong control across concentration, liquidity, news, and risk";
  if (score >= 68) return "healthy, with a few areas worth monitoring";
  if (score >= 52) return "mixed, with several factors that deserve review";
  if (score >= 36) return "fragile, with concentration or risk signals pulling the score down";
  return "high review, because multiple portfolio controls are weak or missing";
}

function calculatePortfolioLiquidityScore() {
  const totalValue = getTotalValue();
  const rows = getVisibleHoldings()
    .filter((holding) => holding.symbol && holding.symbol !== "CASH" && getMarketValue(holding) > 0)
    .map((holding) => {
      const score = getHoldingLiquidityScore(holding);
      const weight = safePercent(getMarketValue(holding), totalValue);
      return {
        symbol: holding.symbol,
        score,
        weight,
        hasVolume: hasHoldingVolumeData(holding),
      };
    });

  if (!rows.length) {
    return { score: 0, coveredWeight: 0, weakestLabel: "none", detail: "No open holdings are available for volume scoring." };
  }

  const score = Math.round(rows.reduce((sum, row) => sum + row.score * safeRatio(row.weight, 100), 0));
  const coveredWeight = rows.filter((row) => row.hasVolume).reduce((sum, row) => sum + row.weight, 0);
  const weakest = [...rows].sort((a, b) => a.score - b.score)[0];
  const detail = coveredWeight > 0
    ? `Volume/liquidity data covers ${formatPercent(coveredWeight)} of open value; ${weakest.symbol} is the weakest scored position at ${weakest.score} / 100.`
    : "Volume data is limited, so this uses conservative placeholder scores until market details are loaded.";

  return {
    score,
    coveredWeight,
    weakestLabel: weakest ? `${weakest.symbol} (${weakest.score} / 100)` : "none",
    detail,
  };
}

function hasHoldingVolumeData(holding) {
  const analysis = getAnalysisForHolding(holding);
  return Number(analysis.averageDailyVolume3Month || analysis.averageDailyVolume10Day) > 0;
}

function getHoldingLiquidityScore(holding) {
  const analysis = getAnalysisForHolding(holding);
  const volume = Number(analysis.averageDailyVolume3Month || analysis.averageDailyVolume10Day) || 0;
  const price = Number(analysis.regularMarketPrice ?? analysis.price ?? holding.price) || 0;
  const currency = normalizeCurrency(analysis.currency || holding.currency || BASE_CURRENCY);
  const marketValue = getMarketValue(holding);

  if (!volume || !price || marketValue <= 0) {
    if (/ETF|Broad ETF/i.test(`${holding.assetClass} ${getHoldingSectorTheme(holding)}`)) return 72;
    if (/Crypto/i.test(holding.assetClass)) return 58;
    return 55;
  }

  const dailyValueEUR = toEUR(volume * price, currency);
  const coverageRatio = safeRatio(dailyValueEUR, marketValue);
  return Math.round(clamp(25 + Math.log10(coverageRatio + 1) * 22, 25, 100));
}

function getThemeWeightRows() {
  const totalValue = getTotalValue();
  const grouped = getVisibleHoldings()
    .filter((holding) => getMarketValue(holding) > 0)
    .reduce((items, holding) => {
      const label = getHoldingSectorTheme(holding);
      items[label] = (items[label] || 0) + getMarketValue(holding);
      return items;
    }, {});

  return Object.entries(grouped)
    .map(([label, value]) => ({ label, value, weight: safePercent(value, totalValue) }))
    .sort((a, b) => b.weight - a.weight);
}

function getAssetWeightRows() {
  return Object.entries(getAssetWeights())
    .map(([assetClass, weight]) => ({ label: displayAssetClass(assetClass), weight }))
    .filter((row) => row.weight > 0)
    .sort((a, b) => b.weight - a.weight);
}

function getHoldingWeightRows() {
  const totalValue = getTotalValue();
  return getVisibleHoldings()
    .filter((holding) => getMarketValue(holding) > 0)
    .map((holding) => ({
      symbol: holding.symbol,
      name: getKnownCompanyName(holding.symbol, holding) || holding.name || holding.symbol,
      value: getMarketValue(holding),
      weight: safePercent(getMarketValue(holding), totalValue),
    }))
    .sort((a, b) => b.weight - a.weight);
}

function getRealizedGainRows() {
  return getAssetClasses()
    .map((assetClass) => ({
      label: displayAssetClass(assetClass),
      value: holdings
        .filter((holding) => holding.symbol && holding.symbol !== "CASH" && holding.assetClass === assetClass)
        .reduce((sum, holding) => sum + getRealizedGainEUR(holding), 0),
    }))
    .filter((row) => Math.abs(row.value) > 0.0000001)
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
}

function formatWeightList(rows, maxItems) {
  if (!rows.length) return "none yet";
  const visible = rows.slice(0, maxItems).map((row) => `${row.label} ${formatPercent(row.weight)}`);
  const other = rows.slice(maxItems).reduce((sum, row) => sum + row.weight, 0);
  if (other > 0.05) visible.push(`Other ${formatPercent(other)}`);
  return visible.join(", ");
}

function formatSignedWeightList(rows, maxItems) {
  return rows.slice(0, maxItems).map((row) => `${row.label} ${formatSignedEUR(row.value)}`).join(", ");
}
async function refreshMarketData({ quiet = false, refreshAnalysis = false } = {}) {
  state.marketRefreshing = true;
  state.marketMessage = "Refreshing visible values";
  state.refreshDetail = "Updating EUR/USD exchange rate...";
  renderVisibleRefreshOverlay();
  renderMarketStatus();

  let quoteResult = { updated: 0, total: 0 };
  let analysisResult = { updated: 0, total: uniqueVisibleTickersForQuotes().length };
  let benchmarkResult = { updated: 0, total: state.activeBenchmarks.length };
  let fxOk = false;

  try {
    try {
      await refreshFxRates();
      fxOk = true;
    } catch (error) {
      state.marketMessage = quiet ? "" : `FX refresh failed: ${error.message}`;
    }

    state.refreshDetail = "Updating open portfolio ticker prices...";
    renderVisibleRefreshOverlay();

    try {
      quoteResult = await refreshQuotes();
    } catch (error) {
      if (!quiet) state.marketMessage = `Price refresh failed: ${error.message}`;
    }

    state.refreshDetail = "Updating historical portfolio performance...";
    renderVisibleRefreshOverlay();
    try {
      await refreshPortfolioPerformanceHistory();
    } catch (error) {
      if (!quiet) state.marketMessage = `Portfolio history failed: ${error.message}`;
    }

    state.refreshDetail = "Updating market comparison history...";
    renderVisibleRefreshOverlay();
    try {
      benchmarkResult = await refreshBenchmarks();
      if (benchmarkResult.updated) saveBenchmarkSeries();
    } catch (error) {
      if (!quiet) state.marketMessage = `Market comparison failed: ${error.message}`;
    }

    if (refreshAnalysis) {
      state.refreshDetail = "Updating detailed ticker analysis on demand...";
      renderVisibleRefreshOverlay();
      try {
        await refreshTickerNames();
        analysisResult = await refreshStockAnalyses({ force: true });
      } catch (error) {
        if (!quiet) state.marketMessage = `Analysis refresh failed: ${error.message}`;
      }
    }

    const fxLabel = fxOk ? "live FX" : "fallback FX";
    const analysisLabel = refreshAnalysis ? ` | analysis ${analysisResult.updated}/${analysisResult.total}` : "";
    state.marketMessage = `${fxLabel} | USD/EUR ${formatDecimal(state.fx.ratesToEUR.USD)} | portfolio prices ${quoteResult.updated}/${quoteResult.total} | history ${state.performanceHistoryMessage || "ready"} | markets ${benchmarkResult.updated}/${benchmarkResult.total}${analysisLabel}`;

    saveFx();
    saveHoldings();
    saveTickers();
    if (refreshAnalysis) saveStockAnalysisCache();
    performanceData = buildPerformanceData();
  } catch (error) {
    state.marketMessage = quiet ? "Using locally cached portfolio data." : `Refresh failed: ${error.message}`;
  } finally {
    state.marketRefreshing = false;
    state.refreshDetail = "";
    render();
  }
}
async function refreshFxRates() {
  const response = await fetch("https://api.frankfurter.dev/v2/rate/USD/EUR", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const usdToEur = Number(data.rate);
  if (!Number.isFinite(usdToEur) || usdToEur <= 0) throw new Error("Invalid USD/EUR rate");

  state.fx = {
    ratesToEUR: { EUR: 1, USD: usdToEur },
    eurToUsd: 1 / usdToEur,
    updatedAt: new Date().toISOString(),
    provider: "Frankfurter",
  };
}

async function refreshQuotes() {
  const subjects = uniqueVisibleTickersForQuotes();
  const quotes = await fetchLatestQuotes(subjects);
  let updated = 0;

  quotes.forEach((quote, index) => {
    if (!quote) return;
    applyQuote(subjects[index].symbol, quote);
    updated += 1;
  });

  return { updated, total: subjects.length };
}

async function refreshPortfolioPerformanceHistory({ force = false } = {}) {
  const subjects = getPerformanceHistorySubjects();
  if (!subjects.length) {
    performanceData = buildPerformanceData();
    state.performanceHistoryMessage = "no transactions";
    renderPerformanceChart();
    return { updated: 0, total: 0 };
  }

  state.performanceHistoryLoading = true;
  const days = getPerformanceHistoryDays();
  let updated = 0;

  try {
    const results = await Promise.allSettled(
      subjects.map(async (subject) => {
        const cached = state.performancePriceSeries[subject.symbol];
        if (!force && cached?.points?.length && Number(cached.days || 0) >= days && Date.now() - Number(cached.fetchedAt || 0) < 6 * 60 * 60 * 1000) {
          return false;
        }

        const data = await fetchHistoricalPriceSeries(buildQuoteCandidates(subject), days);
        const points = (Array.isArray(data.points) ? data.points : [])
          .map(normalizeHistoricalPricePoint)
          .filter((point) => point.date && Number.isFinite(point.value) && point.value > 0);
        if (points.length < 2) throw new Error(`No history for ${subject.symbol}`);

        state.performancePriceSeries[subject.symbol] = {
          points,
          currency: normalizeCurrency(data.currency || subject.currency || BASE_CURRENCY),
          source: data.source || "Yahoo Finance",
          sourceSymbol: data.sourceSymbol || "",
          days,
          fetchedAt: Date.now(),
        };
        return true;
      }),
    );

    updated = results.filter((result) => result.status === "fulfilled" && result.value).length;
    performanceData = buildPerformanceData();
    state.performanceHistoryMessage = `${subjects.length - results.filter((result) => result.status === "rejected").length}/${subjects.length} tickers`;
    renderPerformanceChart();
    return { updated, total: subjects.length };
  } finally {
    state.performanceHistoryLoading = false;
  }
}

function getPerformanceHistorySubjects() {
  const subjectMap = new Map();

  state.transactions.forEach((transaction) => {
    const symbol = normalizeSymbol(transaction.symbol);
    if (!symbol || symbol === "CASH" || !["buy", "sell", "dividend"].includes(transaction.type)) return;
    const existing = subjectMap.get(symbol) || {};
    subjectMap.set(symbol, {
      ...existing,
      symbol,
      name: transaction.name || existing.name || symbol,
      assetClass: transaction.assetClass || existing.assetClass || inferAssetClassFromSymbol(symbol),
      currency: transaction.currency || existing.currency || inferCurrencyForSymbol(symbol, "", transaction.assetClass),
    });
  });

  getVisibleHoldings().forEach((holding) => {
    const symbol = normalizeSymbol(holding.symbol);
    if (!symbol || symbol === "CASH") return;
    subjectMap.set(symbol, {
      ...(subjectMap.get(symbol) || {}),
      ...holding,
      symbol,
    });
  });

  return [...subjectMap.values()];
}

function getPerformanceHistoryDays() {
  const times = state.transactions
    .map((transaction) => Date.parse(transaction.sortDate || parseTradeDate(transaction.date)?.iso || ""))
    .filter(Number.isFinite);
  if (!times.length) return 760;
  const first = Math.min(...times);
  const days = Math.ceil((Date.now() - first) / (24 * 60 * 60 * 1000)) + 14;
  return clamp(days, 45, 1825);
}

async function refreshTickerNames() {
  const subjects = uniqueVisibleTickersForQuotes().filter((ticker) => shouldLookupTickerName(ticker));
  let updated = 0;

  for (const ticker of subjects) {
    const name = await fetchTickerName(ticker);
    if (!name) continue;
    applyTickerName(ticker.symbol, name);
    updated += 1;
  }

  if (updated) {
    saveHoldings();
    saveTickers();
    saveTransactions();
    renderHoldings();
  }

  return { updated, total: subjects.length };
}

async function refreshStockAnalyses({ force = false } = {}) {
  const subjects = uniqueVisibleTickersForQuotes().filter((ticker) => ticker.symbol && ticker.symbol !== "CASH");
  let updated = 0;

  for (const ticker of subjects) {
    const symbol = normalizeSymbol(ticker.symbol);
    const cached = state.stockAnalysis[symbol];
    if (!force && cached && Date.now() - Number(cached.fetchedAt || 0) < 30 * 60 * 1000) continue;

    try {
      const analysis = await fetchStockAnalysisData(symbol, getHoldingForAnalysis(symbol), { force: true });
      state.stockAnalysis[symbol] = analysis;
      if (analysis.name) applyTickerName(symbol, analysis.name);
      updated += 1;
    } catch {
      continue;
    }
  }

  return { updated, total: subjects.length };
}

function shouldLookupTickerName(ticker) {
  if (!ticker?.symbol || ticker.symbol === "CASH") return false;
  const symbol = normalizeSymbol(ticker.symbol);
  const baseSymbol = getBaseTickerSymbol(symbol);
  if (companyNameOverrides[symbol] || companyNameOverrides[baseSymbol]) return true;
  const name = String(ticker.name || "").trim();
  return !name || normalizeSymbol(name) === symbol;
}

async function fetchTickerName(ticker) {
  const symbol = normalizeSymbol(ticker.symbol);
  const baseSymbol = getBaseTickerSymbol(symbol);
  const override = companyNameOverrides[symbol] || companyNameOverrides[baseSymbol];
  if (override) return override;

  const publicName = await fetchTickerNameFromPublicPages(symbol, ticker).catch(() => "");
  if (publicName) return publicName;

  const quote = await fetchYahooQuoteData(symbol, ticker).catch(() => null);
  return quote?.name || "";
}

function getNameFromYahooSearch(data, symbol) {
  const quotes = Array.isArray(data?.quotes) ? data.quotes : [];
  const normalized = normalizeSymbol(symbol).replace(/\.(US|DE|NL|PA|MI|LS)$/i, "");
  const exact = quotes.find((quote) => normalizeSymbol(quote.symbol) === normalized || normalizeSymbol(quote.symbol) === normalizeSymbol(symbol));
  const quote = exact || quotes.find((item) => item.quoteType === "EQUITY") || quotes[0];
  return String(quote?.longname || quote?.shortname || quote?.name || "").trim();
}

function applyTickerName(symbol, name) {
  const normalized = normalizeSymbol(symbol);
  const baseSymbol = getBaseTickerSymbol(normalized);
  const cleanName = cleanCompanyNameCandidate(normalized, name);
  if (!cleanName || normalizeSymbol(cleanName) === normalized || normalizeSymbol(cleanName) === baseSymbol) return;

  holdings.forEach((holding) => {
    if (holding.symbol === normalized || getBaseTickerSymbol(holding.symbol) === baseSymbol) holding.name = cleanName;
  });
  trackedTickers.forEach((ticker) => {
    if (ticker.symbol === normalized || getBaseTickerSymbol(ticker.symbol) === baseSymbol) ticker.name = cleanName;
  });
  state.transactions.forEach((transaction) => {
    if (transaction.symbol === normalized || getBaseTickerSymbol(transaction.symbol) === baseSymbol) transaction.name = cleanName;
  });
  if (state.stockAnalysis[normalized]) state.stockAnalysis[normalized].name = cleanName;
}

async function refreshBenchmarkOnDemand(id) {
  if (!id) return;
  state.marketRefreshing = true;
  state.refreshDetail = "Updating selected market comparison line...";
  renderVisibleRefreshOverlay();
  renderMarketStatus();

  try {
    const result = await refreshBenchmarks([id]);
    saveBenchmarkSeries();
    state.marketMessage = `Updated market comparison ${result.updated}/${result.total}`;
  } catch (error) {
    state.marketMessage = `Benchmark refresh failed: ${error.message}`;
  } finally {
    state.marketRefreshing = false;
    state.refreshDetail = "";
    render();
  }
}
async function refreshBenchmarks(ids = state.activeBenchmarks) {
  const activeIds = new Set((ids?.length ? ids : state.activeBenchmarks).filter(Boolean));
  const benchmarks = benchmarkDefinitions.filter((benchmark) => activeIds.has(benchmark.id));
  let updated = 0;
  let available = 0;

  for (const benchmark of benchmarks) {
    if (state.benchmarkSeries[benchmark.id]?.length > 1) {
      available += 1;
      continue;
    }
    const series = await fetchBenchmarkHistory(benchmark);
    if (!series.length) continue;
    state.benchmarkSeries[benchmark.id] = series;
    available += 1;
    updated += 1;
  }

  return { updated: available, total: benchmarks.length };
}

async function fetchBenchmarkHistory(benchmark) {
  const data = await fetchHistoricalPriceSeries(
    [{ symbol: benchmark.sourceSymbol, currency: benchmark.currency }],
    getPerformanceHistoryDays(),
  );
  return (Array.isArray(data.points) ? data.points : [])
    .map(normalizeHistoricalPricePoint)
    .filter((point) => point.date && Number.isFinite(point.value) && point.value > 0);
}

async function fetchGoogleFinanceQuote(ticker) {
  const manualSymbol = getManualSourceSymbol(ticker.symbol);
  const sourceSymbol = manualSymbol || ticker.symbol;
  const targets = buildGoogleFinanceTargets(sourceSymbol, ticker);

  for (const target of targets) {
    const text = await fetchJinaText(target.url).catch(() => "");
    if (!text) continue;
    const data = parseGoogleFinanceText(text, target);
    const price = Number(data.price || data.regularMarketPrice);
    if (!Number.isFinite(price) || price <= 0) continue;
    return {
      price,
      currency: data.currency || inferCurrencyForSymbol(ticker.symbol, ticker.currency, ticker.assetClass),
      dayChangePct: Number(data.dayChangePct || data.regularMarketChangePercent) || 0,
      sourceSymbol: target.sourceSymbol,
      source: `Google Finance ${target.sourceSymbol}`,
    };
  }

  return null;
}
async function fetchLatestQuote(ticker) {
  const [serverQuote] = await fetchLatestQuotes([ticker]).catch(() => [null]);
  if (serverQuote) return serverQuote;

  const googleQuote = await fetchGoogleFinanceQuote(ticker).catch(() => null);
  if (googleQuote) return googleQuote;

  return null;
}

async function fetchLatestQuotes(tickers) {
  const subjects = (Array.isArray(tickers) ? tickers : [])
    .filter((ticker) => normalizeSymbol(ticker?.symbol) && normalizeSymbol(ticker?.symbol) !== "CASH");
  if (!subjects.length) return [];

  const response = await fetch(getQuotesEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      items: subjects.map(buildQuoteRequestItem),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Quote server returned HTTP ${response.status}`);

  const quoteMap = new Map(
    (Array.isArray(data.items) ? data.items : [])
      .map((item) => [normalizeSymbol(item.symbol), normalizeLatestQuote(item)])
      .filter(([, quote]) => quote),
  );

  return subjects.map((ticker) => quoteMap.get(normalizeSymbol(ticker.symbol)) || null);
}

function buildQuoteRequestItem(ticker) {
  return {
    symbol: normalizeSymbol(ticker.symbol),
    currency: normalizeCurrency(ticker.currency || inferCurrencyForSymbol(ticker.symbol, "", ticker.assetClass)),
    assetClass: ticker.assetClass || inferAssetClassFromSymbol(ticker.symbol),
    candidates: buildQuoteCandidates(ticker),
  };
}

function normalizeLatestQuote(item) {
  const price = Number(item?.price);
  if (!Number.isFinite(price) || price <= 0) return null;
  return {
    price,
    currency: normalizeCurrency(item.currency || BASE_CURRENCY),
    dayChangePct: Number(item.dayChangePct) || 0,
    sourceSymbol: item.sourceSymbol || "",
    source: item.source || "Local quote API",
    marketTime: item.marketTime || "",
    fetchedAt: item.fetchedAt || "",
  };
}

function getQuotesEndpoint() {
  const path = "/api/quotes";
  if (/^https?:$/i.test(window.location.protocol)) return path;
  return `http://localhost:8787${path}`;
}

async function refreshQuoteForSymbol(symbol, holding = getHoldingForAnalysis(symbol)) {
  const normalized = normalizeSymbol(symbol);
  if (!normalized || normalized === "CASH") return null;
  const quote = await fetchLatestQuote({ ...holding, symbol: normalized });
  if (!quote) return null;

  applyQuote(normalized, quote);
  saveHoldings();
  saveTickers();
  saveStockAnalysisCache();

  if (state.selectedStockSymbol === normalized) {
    renderStockAnalysisModal(normalized, getHoldingForAnalysis(normalized), state.stockAnalysis[normalized] || null, false);
  }
  renderHoldings();
  renderSummary();
  return quote;
}

function buildQuoteCandidates(ticker) {
  const symbol = ticker.symbol.toLowerCase();
  const raw = symbol.replace(/\s/g, "");
  const candidates = [];
  const manualSymbol = getManualSourceSymbol(ticker.symbol).toLowerCase();
  const manualRaw = manualSymbol.replace(/\s/g, "");

  if (manualRaw) {
    candidates.push({ symbol: manualRaw, currency: inferCurrencyFromSymbol(manualRaw, ticker.currency) });
    if (!manualRaw.includes(".")) {
      candidates.push({ symbol: `${manualRaw}.us`, currency: "USD" });
      candidates.push({ symbol: `${manualRaw}.de`, currency: "EUR" });
      candidates.push({ symbol: `${manualRaw}.ls`, currency: "EUR" });
    }
  }

  if (isCryptoTicker(ticker)) {
    const cryptoSymbol = raw.replace(/[^a-z0-9]/g, "");
    const preferredCurrency = normalizeCurrency(ticker.currency || inferCurrencyForSymbol(ticker.symbol, "", ticker.assetClass));
    const otherCurrency = preferredCurrency === "USD" ? "EUR" : "USD";
    candidates.push({ symbol: `${cryptoSymbol}${preferredCurrency.toLowerCase()}`, currency: preferredCurrency });
    candidates.push({ symbol: `${cryptoSymbol}${otherCurrency.toLowerCase()}`, currency: otherCurrency });
  }

  if (raw.includes(".")) {
    candidates.push({ symbol: raw, currency: inferCurrencyFromSymbol(raw, ticker.currency) });
  } else if (ticker.currency === "USD") {
    candidates.push({ symbol: `${raw}.us`, currency: "USD" });
    candidates.push({ symbol: raw, currency: ticker.currency });
  } else {
    candidates.push({ symbol: raw, currency: "EUR" });
    candidates.push({ symbol: `${raw}.de`, currency: "EUR" });
    candidates.push({ symbol: `${raw}.nl`, currency: "EUR" });
    candidates.push({ symbol: `${raw}.pa`, currency: "EUR" });
    candidates.push({ symbol: `${raw}.mi`, currency: "EUR" });
    candidates.push({ symbol: `${raw}.ls`, currency: "EUR" });
    candidates.push({ symbol: `${raw}.us`, currency: "USD" });
  }

  return uniqueBy(candidates, (candidate) => `${candidate.symbol}-${candidate.currency}`);
}

function isCryptoTicker(ticker) {
  const assetClass = String(ticker?.assetClass || "").toLowerCase();
  const symbol = normalizeSymbol(ticker?.symbol);
  return assetClass.includes("crypto") || /^(BTC|ETH|SOL|DOGE|XRP|ADA|BNB|AVAX|DOT|LINK|LTC|BCH)$/.test(symbol);
}

function applyQuote(symbol, quote) {
  const normalized = normalizeSymbol(symbol);
  holdings.forEach((holding) => {
    if (holding.symbol !== normalized) return;
    holding.price = quote.price;
    holding.currency = quote.currency;
    holding.dayChangePct = quote.dayChangePct;
    holding.quoteSource = quote.source || "";
    holding.quoteSourceSymbol = quote.sourceSymbol || "";
    holding.quoteFetchedAt = quote.fetchedAt || new Date().toISOString();
  });

  trackedTickers.forEach((ticker) => {
    if (ticker.symbol !== normalized) return;
    ticker.price = quote.price;
    ticker.currency = quote.currency;
    ticker.dayChangePct = quote.dayChangePct;
    ticker.quoteSource = quote.source || "";
    ticker.quoteSourceSymbol = quote.sourceSymbol || "";
    ticker.quoteFetchedAt = quote.fetchedAt || new Date().toISOString();
  });

  if (state.stockAnalysis[normalized]) {
    state.stockAnalysis[normalized] = {
      ...state.stockAnalysis[normalized],
      currency: quote.currency,
      regularMarketPrice: quote.price,
      price: quote.price,
      regularMarketChangePercent: quote.dayChangePct,
      dayChangePct: quote.dayChangePct,
      sourceSymbol: quote.sourceSymbol || state.stockAnalysis[normalized].sourceSymbol || "",
      source: formatDataSources([quote.source, state.stockAnalysis[normalized].source]),
      quoteFetchedAt: quote.fetchedAt || new Date().toISOString(),
    };
  }
}

async function importCsvFile() {
  const input = document.getElementById("csvFile");
  const file = input.files[0];

  if (!file) {
    setImportStatus("Choose a CSV file first.", "error");
    return;
  }

  try {
    const text = await file.text();
    const rows = getCsvRows(text);

    if (isTransactionCsv(rows)) {
      const importedTransactions = parseTransactionsCsvRows(rows);

      if (state.importMode === "replace") {
        if (!window.confirm(`Replace the current transactions and rebuild the portfolio from ${importedTransactions.length} imported transactions?`)) return;
        const rebuild = rebuildPortfolioFromTransactions(importedTransactions);
        state.transactions = rebuild.transactions;
        saveTransactions();
        saveHoldings();
        saveTickers();
        rebuildAfterDataChange();
        closeModals();
        setImportStatus(
          `Imported ${state.transactions.length} transactions${rebuild.errors.length ? `, skipped ${rebuild.errors.length}` : ""}.`,
          rebuild.errors.length ? "error" : "success",
        );
        return;
      }

      const applied = applyImportedTransactions(importedTransactions);
      state.transactions = [...state.transactions, ...applied.transactions].sort(compareTransactionsDesc);
      saveTransactions();
      saveHoldings();
      saveTickers();
      rebuildAfterDataChange();
      closeModals();
      setImportStatus(
        `Appended ${applied.transactions.length} transactions${applied.errors.length ? `, skipped ${applied.errors.length}` : ""}.`,
        applied.errors.length ? "error" : "success",
      );
      return;
    }

    const imported = parseHoldingsCsvRows(rows);

    if (state.importMode === "replace") {
      if (!window.confirm(`Replace the current holdings with ${imported.length} imported rows?`)) return;
      holdings = imported;
    } else {
      holdings = mergeHoldings(holdings, imported);
    }

    trackedTickers = mergeTickers(trackedTickers, holdingsToTickers(imported));
    saveHoldings();
    saveTickers();
    rebuildAfterDataChange();
    closeModals();
    setImportStatus(`Imported ${imported.length} holding${imported.length === 1 ? "" : "s"}.`, "success");
  } catch (error) {
    setImportStatus(error.message, "error");
  }
}

function addTicker(event) {
  event.preventDefault();

  try {
    const ticker = {
      symbol: normalizeSymbol(document.getElementById("tickerSymbol").value),
      name: document.getElementById("tickerName").value.trim() || normalizeSymbol(document.getElementById("tickerSymbol").value),
      assetClass: document.getElementById("tickerAssetClass").value,
      platform: normalizePlatform(document.getElementById("tickerPlatform").value),
      currency: document.getElementById("tickerCurrency").value,
      price: parseNumber(document.getElementById("tickerPrice").value) || 0,
      dayChangePct: 0,
      risk: defaultRiskForClass(document.getElementById("tickerAssetClass").value),
    };

    if (!ticker.symbol) throw new Error("Ticker is required.");

    trackedTickers = mergeTickers(trackedTickers, [ticker]);
    saveTickers();
    event.target.reset();
    rebuildAfterDataChange();
    setStatus("tickerStatus", `${ticker.symbol} added.`, "success");
    closeModals();
    refreshMarketData({ quiet: true });
  } catch (error) {
    setStatus("tickerStatus", error.message, "error");
  }
}

function addTickerFromTransactionSearch() {
  try {
    const existingTicker = getSelectedTicker();
    const ticker = existingTicker || buildTickerFromTransactionSearch();

    if (!ticker?.symbol) {
      throw new Error("Search or enter a ticker first.");
    }

    const alreadyExists = trackedTickers.some((item) => tickerKey(item.symbol, item.platform) === tickerKey(ticker.symbol, ticker.platform));
    trackedTickers = mergeTickers(trackedTickers, [ticker]);
    saveTickers();
    renderFormOptions();
    document.getElementById("transactionTickerSearch").value = formatTickerOption(ticker);
    hydrateTransactionFromTicker();
    updateTickerCount();
    setStatus("transactionStatus", alreadyExists ? `${ticker.symbol} is already available.` : `${ticker.symbol} added to your ticker list.`, alreadyExists ? "" : "success");
    refreshMarketData({ quiet: true });
  } catch (error) {
    setStatus("transactionStatus", error.message, "error");
  }
}

function addTransaction(event) {
  event.preventDefault();

  try {
    const transaction = getTransactionFromForm();
    ensureTickerForTransaction(transaction);
    if (state.editingTransactionId) {
      state.transactions = state.transactions.map((item) => (item.id === state.editingTransactionId ? transaction : item));
      const rebuilt = rebuildPortfolioFromTransactions(state.transactions);
      state.transactions = rebuilt.transactions;
      saveTransactions();
      saveHoldings();
      saveTickers();
      rebuildAfterDataChange();
      setStatus(
        "transactionStatus",
        `Transaction updated${rebuilt.errors.length ? `, skipped ${rebuilt.errors.length} during rebuild` : ""}.`,
        rebuilt.errors.length ? "error" : "success",
      );
    } else {
      applyTransaction(transaction);
      state.transactions.unshift(transaction);
      saveTransactions();
      saveHoldings();
      saveTickers();
      rebuildAfterDataChange();
      setStatus("transactionStatus", `${capitalize(transaction.type)} recorded.`, "success");
    }
    state.editingTransactionId = null;
    event.target.reset();
    renderFormOptions();
    closeModals();
  } catch (error) {
    setStatus("transactionStatus", error.message, "error");
  }
}

function deleteEditingTransaction() {
  if (!state.editingTransactionId) return;
  const transaction = state.transactions.find((item) => item.id === state.editingTransactionId);
  if (!transaction) return;
  if (!window.confirm(`Delete ${transaction.symbol || "this"} transaction?`)) return;

  try {
    state.transactions = state.transactions.filter((item) => item.id !== state.editingTransactionId);
    state.selectedTransactionIds.delete(state.editingTransactionId);
    const rebuilt = rebuildPortfolioFromTransactions(state.transactions);
    state.transactions = rebuilt.transactions;
    saveTransactions();
    saveHoldings();
    saveTickers();
    rebuildAfterDataChange();
    closeModals();
  } catch (error) {
    setStatus("transactionStatus", error.message, "error");
  }
}

function getTransactionFromForm() {
  const type = document.getElementById("transactionType").value;
  const cashType = ["deposit", "withdraw", "fee"].includes(type);
  const selectedTicker = getSelectedTicker();
  const typedTicker = cashType ? null : selectedTicker || buildTickerFromTransactionSearch();
  const platform = normalizePlatform(selectedTicker?.platform || typedTicker?.platform || document.getElementById("transactionPlatform").value);
  const assetClass = cashType ? "Cash" : document.getElementById("transactionAssetClass").value || typedTicker?.assetClass || "Equity";
  const currency = document.getElementById("transactionCurrency").value;
  const quantity = parseNumber(document.getElementById("transactionQuantity").value) || 0;
  const price = parseNumber(document.getElementById("transactionPrice").value) || 0;
  const fees = parseNumber(document.getElementById("transactionFees").value) || 0;
  const symbol = cashType ? "CASH" : typedTicker?.symbol || "";
  const name = cashType ? `${platform} cash` : typedTicker?.name || symbol;
  const dateInput = document.getElementById("transactionDate").value;
  const transactionDate = parseTradeDate(dateInput) || makeDisplayDate(new Date());

  if (["buy", "sell", "dividend"].includes(type) && !symbol) {
    throw new Error("Add or select a ticker first.");
  }

  if (["buy", "sell"].includes(type) && (quantity <= 0 || price <= 0)) {
    throw new Error("Buy and sell transactions need quantity and price.");
  }

  const stockQuantityAdjustment = isStockQuantityAdjustment({ type, symbol, quantity, price });
  if (["deposit", "withdraw", "dividend", "fee"].includes(type) && getTransactionAmount(type, quantity, price) <= 0 && !stockQuantityAdjustment) {
    throw new Error("Enter an amount in the Price field.");
  }

  const cashImpactNative = getCashImpact(type, quantity, price, fees);
  const cashImpactEUR = toEUR(cashImpactNative, currency);

  return {
    id: state.editingTransactionId || randomId(),
    date: transactionDate.display,
    sortDate: transactionDate.iso,
    type,
    symbol,
    name,
    assetClass,
    platform,
    quantity,
    price,
    fees,
    currency,
    cashImpactNative,
    cashImpactEUR,
    fxRateToEUR: fxRateToEUR(currency),
    createdAt: Date.now(),
  };
}

function applyTransaction(transaction) {
  if (transaction.type === "buy") {
    upsertBoughtHolding(transaction);
    updateCash(transaction.cashImpactEUR, transaction.platform);
  }

  if (transaction.type === "sell") {
    sellHolding(transaction);
    updateCash(transaction.cashImpactEUR, transaction.platform);
  }

  if (isStockQuantityAdjustment(transaction)) {
    upsertStockQuantityAdjustment(transaction);
    return;
  }

  if (["deposit", "withdraw", "dividend", "fee"].includes(transaction.type)) {
    updateCash(transaction.cashImpactEUR, transaction.platform);
  }
}

function upsertBoughtHolding(transaction) {
  const existing = findHolding(transaction.symbol, transaction.platform);
  const tradeCostEUR = toEUR(transaction.quantity * transaction.price + transaction.fees, transaction.currency);

  if (existing) {
    existing.quantity += transaction.quantity;
    existing.costBasisEUR = getCostBasisEUR(existing) + tradeCostEUR;
    existing.lifetimeInvestedEUR = getLifetimeInvestedEUR(existing) + tradeCostEUR;
    existing.price = transaction.price;
    existing.currency = transaction.currency;
    existing.name = transaction.name || existing.name;
    existing.assetClass = transaction.assetClass || existing.assetClass;
    existing.risk = existing.risk || defaultRiskForClass(existing.assetClass);
    existing.closed = false;
  } else {
    holdings.push({
      symbol: transaction.symbol,
      name: transaction.name || transaction.symbol,
      assetClass: transaction.assetClass,
      platform: transaction.platform,
      currency: transaction.currency,
      quantity: transaction.quantity,
      price: transaction.price,
      costBasisEUR: tradeCostEUR,
      lifetimeInvestedEUR: tradeCostEUR,
      realizedGainEUR: 0,
      closed: false,
      dayChangePct: 0,
      risk: defaultRiskForClass(transaction.assetClass),
    });
  }

  trackedTickers = mergeTickers(trackedTickers, [
    {
      symbol: transaction.symbol,
      name: transaction.name || transaction.symbol,
      assetClass: transaction.assetClass,
      platform: transaction.platform,
      currency: transaction.currency,
      price: transaction.price,
      dayChangePct: 0,
      risk: defaultRiskForClass(transaction.assetClass),
    },
  ]);
}

function upsertStockQuantityAdjustment(transaction) {
  const existing = findHolding(transaction.symbol, transaction.platform);

  if (existing) {
    existing.quantity += transaction.quantity;
    existing.price = existing.price || transaction.price || 0;
    existing.currency = existing.currency || transaction.currency;
    existing.name = transaction.name || existing.name;
    existing.assetClass = transaction.assetClass || existing.assetClass;
    existing.risk = existing.risk || defaultRiskForClass(existing.assetClass);
    existing.closed = false;
    return;
  }

  holdings.push({
    symbol: transaction.symbol,
    name: transaction.name || transaction.symbol,
    assetClass: transaction.assetClass || inferAssetClassFromSymbol(transaction.symbol),
    platform: transaction.platform,
    currency: transaction.currency,
    quantity: transaction.quantity,
    price: transaction.price || 0,
    costBasisEUR: 0,
    lifetimeInvestedEUR: 0,
    realizedGainEUR: 0,
    closed: false,
    dayChangePct: 0,
    risk: defaultRiskForClass(transaction.assetClass),
  });
}

function sellHolding(transaction) {
  const existing = findHolding(transaction.symbol, transaction.platform);

  if (!existing) {
    throw new Error(`${transaction.symbol} is not in your holdings.`);
  }

  const currentQuantity = Number(existing.quantity) || 0;
  const quantityTolerance = getSellQuantityTolerance(existing, transaction);
  const oversoldQuantity = transaction.quantity - currentQuantity;

  if (oversoldQuantity > quantityTolerance) {
    throw new Error(`You only hold ${formatQuantity(existing.quantity)} ${transaction.symbol}.`);
  }

  const closesHolding = transaction.quantity >= currentQuantity || Math.abs(currentQuantity - transaction.quantity) <= 0.0000001;
  const quantityForCostBasis = closesHolding ? currentQuantity : transaction.quantity;
  const currentCostBasis = getCostBasisEUR(existing);
  const soldRatio = quantityForCostBasis / currentQuantity;
  const removedCostBasis = currentCostBasis * soldRatio;
  const sellProceedsEUR = toEUR(transaction.quantity * transaction.price - transaction.fees, transaction.currency);
  const realizedGain = sellProceedsEUR - removedCostBasis;
  existing.quantity = closesHolding ? 0 : currentQuantity - transaction.quantity;
  existing.costBasisEUR = closesHolding ? 0 : currentCostBasis - removedCostBasis;
  existing.realizedGainEUR = getRealizedGainEUR(existing) + realizedGain;
  existing.lifetimeInvestedEUR = getLifetimeInvestedEUR(existing);
  existing.price = transaction.price;
  existing.currency = transaction.currency;

  if (existing.quantity <= 0.0000001) {
    existing.quantity = 0;
    existing.closed = true;
    existing.closedAt = transaction.sortDate || transaction.date || new Date().toISOString().slice(0, 10);
    existing.costBasisEUR = 0;
  }
}

function getSellQuantityTolerance(holding, transaction) {
  const assetClass = String(holding.assetClass || transaction.assetClass || "").toLowerCase();
  if (assetClass.includes("crypto")) return 0.00000001;
  return 0.011;
}

function updateCash(amountEUR, platform) {
  if (!Number.isFinite(amountEUR) || amountEUR === 0) return;

  const cash = findHolding("CASH", platform);
  if (cash) {
    const balance = getMarketValue(cash) + amountEUR;
    cash.quantity = 1;
    cash.price = balance;
    cash.costBasisEUR = balance;
    cash.currency = BASE_CURRENCY;
    cash.name = `${platform} cash`;
    cash.assetClass = "Cash";
    cash.dayChangePct = 0;
    cash.risk = 4;
    return;
  }

  holdings.push({
    symbol: "CASH",
    name: `${platform} cash`,
    assetClass: "Cash",
    platform,
    currency: BASE_CURRENCY,
    quantity: 1,
    price: amountEUR,
    costBasisEUR: amountEUR,
    dayChangePct: 0,
    risk: 4,
  });
}

function updateTransactionPreview() {
  const type = document.getElementById("transactionType").value;
  const quantity = parseNumber(document.getElementById("transactionQuantity").value) || 0;
  const price = parseNumber(document.getElementById("transactionPrice").value) || 0;
  const fees = parseNumber(document.getElementById("transactionFees").value) || 0;
  const currency = document.getElementById("transactionCurrency").value || BASE_CURRENCY;
  document.getElementById("transactionPreview").textContent = formatSignedEUR(toEUR(getCashImpact(type, quantity, price, fees), currency));
}

function getCashImpact(type, quantity, price, fees) {
  const amount = getTransactionAmount(type, quantity, price);

  if (type === "buy") return -(quantity * price + fees);
  if (type === "sell") return quantity * price - fees;
  if (type === "withdraw" || type === "fee") return -(amount + fees);
  return amount - fees;
}

function getTransactionAmount(type, quantity, price) {
  if (type === "buy" || type === "sell") return quantity * price;
  if (type === "dividend" && quantity > 0) return quantity * price;
  return price;
}

function openTransactionModal(transactionId = null) {
  state.editingTransactionId = transactionId;
  document.getElementById("transactionForm").reset();
  renderFormOptions();
  document.getElementById("deleteTransaction").hidden = !transactionId;

  if (transactionId) {
    const transaction = state.transactions.find((item) => item.id === transactionId);
    if (!transaction) return;
    document.getElementById("transactionModalTitle").textContent = "Edit transaction";
    ensureTickerForTransaction(transaction);
    renderFormOptions();
    document.getElementById("transactionDate").value = transaction.sortDate || parseTradeDate(transaction.date)?.iso || "";
    document.getElementById("transactionType").value = transaction.type || "buy";
    document.getElementById("transactionAssetClass").value = transaction.assetClass || "Equity";
    setPlatformValue("transactionPlatform", transaction.platform || "Other");
    renderPlatformPicker("transactionPlatformPicker", "transactionPlatform");
    renderTransactionTickerOptions();
    document.getElementById("transactionTickerSearch").value =
      transaction.symbol && transaction.symbol !== "CASH" ? formatTickerOption(transaction) : "";
    document.getElementById("transactionQuantity").value = transaction.quantity || "";
    document.getElementById("transactionPrice").value = transaction.price || "";
    document.getElementById("transactionFees").value = transaction.fees || "";
    document.getElementById("transactionCurrency").value = normalizeCurrency(transaction.currency);
  } else {
    document.getElementById("transactionModalTitle").textContent = "Add transaction";
    document.getElementById("transactionDate").value = makeDisplayDate(new Date()).iso;
    setPlatformValue("transactionPlatform", "Other");
    renderPlatformPicker("transactionPlatformPicker", "transactionPlatform");
  }

  updateTransactionMode();
  updateTransactionPreview();
  openModal("transactionModal");
}

function openModal(id) {
  document.getElementById("modalBackdrop").hidden = false;
  document.getElementById(id).hidden = false;
  setStatus("transactionStatus", "", "");
  setStatus("tickerStatus", "", "");
  setImportStatus("", "");
  renderFormOptions();
  if (id === "transactionModal") {
    updateTransactionMode();
    updateTransactionPreview();
  }
  const firstField = id === "stockModal" ? null : document.querySelector(`#${id} select, #${id} input`);
  if (firstField) firstField.focus();
}

function closeModals() {
  state.editingTransactionId = null;
  document.getElementById("modalBackdrop").hidden = true;
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.hidden = true;
  });
}

function getCsvRows(text) {
  const rows = parseCsv(text).filter((row) => row.some((cell) => cell.trim() !== ""));
  if (rows.length < 2) {
    throw new Error("CSV needs a header row and at least one data row.");
  }
  return rows;
}

function isTransactionCsv(rows) {
  const headers = rows[0].map(normalizeHeader);
  return headers.some((header) => ["tradedate", "transactiondate", "executiondate", "date"].includes(header))
    && headers.some((header) => ["type", "transactiontype", "action", "operation", "activitytype", "side", "buysell"].includes(header));
}

function parseTransactionsCsvRows(rows) {
  const headers = rows[0].map(normalizeHeader);
  const imported = [];
  const skipped = [];

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const rawType = getCsvValue(row, headers, ["type", "transactiontype", "action", "operation", "activitytype", "side", "buysell"]);
    let type = normalizeTransactionType(rawType);
    const parsedDate = parseTradeDate(getCsvValue(row, headers, ["tradedate", "transactiondate", "executiondate", "date"]));
    const symbol = normalizeSymbol(getCsvValue(row, headers, ["symbol", "ticker", "instrument", "security", "product", "isin"]));
    const platform = normalizePlatform(getCsvValue(row, headers, ["platform", "broker", "account", "accountname"]) || "Other");
    const explicitCurrency = getCsvValue(row, headers, ["currency", "pricecurrency", "tradecurrency", "ccy"]);
    const assetClass = getCsvValue(row, headers, ["assetclass", "class", "category"]) || inferAssetClassFromSymbol(symbol);
    const currency = inferCurrencyForSymbol(symbol, explicitCurrency, assetClass);
    const quantityValue = parseNumber(getCsvValue(row, headers, ["quantity", "shares", "units", "qty"]));
    if (!type && Number.isFinite(quantityValue) && quantityValue < 0) type = "sell";
    const quantity = Math.abs(quantityValue || 0);
    let fees = Math.abs(parseNumber(getCsvValue(row, headers, ["fees", "fee", "commission", "commissions", "brokeragefee"])) || 0);
    const amount = Math.abs(parseNumber(getCsvValue(row, headers, ["amount", "total", "grossamount", "netamount", "value", "tradevalue", "cashamount"])) || 0);
    let price = Math.abs(parseNumber(getCsvValue(row, headers, ["price", "unitprice", "shareprice", "executionprice", "averageprice"])) || 0);

    if (!price && amount && quantity) {
      price = amount / quantity;
    }
    if (!price && amount && ["deposit", "withdraw", "dividend", "fee"].includes(type)) {
      price = amount;
    }
    if (!price && type === "fee" && fees) {
      price = fees;
      fees = 0;
    }

    if (!type || !parsedDate || (!symbol && !["deposit", "withdraw", "fee"].includes(type))) {
      skipped.push(rowNumber);
      return;
    }

    if (["buy", "sell"].includes(type) && (!quantity || !price)) {
      skipped.push(rowNumber);
      return;
    }

    const stockQuantityAdjustment = isStockQuantityAdjustment({ type, symbol: safeTransactionSymbol(type, symbol), quantity, price });
    if (["deposit", "withdraw", "dividend", "fee"].includes(type) && !getTransactionAmount(type, quantity, price) && !stockQuantityAdjustment) {
      skipped.push(rowNumber);
      return;
    }

    const safeSymbol = safeTransactionSymbol(type, symbol);
    const cashImpactNative = getCashImpact(type, quantity, price, fees);

    imported.push({
      id: randomId(),
      date: parsedDate.display,
      sortDate: parsedDate.iso,
      sourceRow: rowNumber,
      type,
      symbol: safeSymbol,
      name: getCsvValue(row, headers, ["name", "description", "securityname", "instrumentname"]) || safeSymbol,
      assetClass: ["deposit", "withdraw", "fee"].includes(type) ? "Cash" : assetClass,
      platform,
      quantity,
      price,
      fees,
      currency,
      cashImpactNative,
      cashImpactEUR: toEUR(cashImpactNative, currency),
      fxRateToEUR: fxRateToEUR(currency),
    });
  });

  if (!imported.length) {
    throw new Error("No valid transactions found. Check trade date, type, ticker, quantity, and price columns.");
  }

  if (skipped.length) {
    setImportStatus(`Skipped rows: ${skipped.join(", ")}`, "error");
  }

  return imported;
}

function parseHoldingsCsvRows(rows) {
  if (rows.length < 2) {
    throw new Error("CSV needs a header row and at least one holding.");
  }

  const headers = rows[0].map(normalizeHeader);
  const imported = [];
  const skipped = [];

  rows.slice(1).forEach((row, index) => {
    const symbol = normalizeSymbol(getCsvValue(row, headers, ["symbol", "ticker"]));
    if (!symbol) {
      skipped.push(index + 2);
      return;
    }

    const currency = normalizeCurrency(getCsvValue(row, headers, ["currency", "ccy"]) || BASE_CURRENCY);
    const platform = normalizePlatform(getCsvValue(row, headers, ["platform", "broker", "account"]) || "Other");
    const quantityValue = getCsvValue(row, headers, ["quantity", "shares", "units"]);
    const marketValue = parseNumber(getCsvValue(row, headers, ["marketvalue", "value", "currentvalue"]));
    let quantity = parseNumber(quantityValue);
    if (!Number.isFinite(quantity) || quantity === 0) {
      quantity = symbol === "CASH" || Number.isFinite(marketValue) ? 1 : NaN;
    }

    let price = parseNumber(getCsvValue(row, headers, ["price", "currentprice", "lastprice", "last"]));
    const costBasis = parseNumber(getCsvValue(row, headers, ["costbasis", "cost", "bookcost", "totalcost"]));
    const costBasisEUR = parseNumber(getCsvValue(row, headers, ["costbasiseur", "costeur"]));
    if (!Number.isFinite(price) && Number.isFinite(marketValue) && quantity) {
      price = marketValue / quantity;
    }
    if (!Number.isFinite(price) && Number.isFinite(costBasis) && quantity) {
      price = costBasis / quantity;
    }

    if (!Number.isFinite(quantity) || !Number.isFinite(price)) {
      skipped.push(index + 2);
      return;
    }

    const assetClass = getCsvValue(row, headers, ["assetclass", "class", "type", "category"]) || "Equity";
    const dayChangePct = parseNumber(getCsvValue(row, headers, ["daychangepct", "changepercent", "changepct", "daychange"])) || 0;
    const normalizedCostEUR = Number.isFinite(costBasisEUR)
      ? costBasisEUR
      : toEUR(Number.isFinite(costBasis) ? costBasis : quantity * price, currency);
    const risk = parseNumber(getCsvValue(row, headers, ["risk", "riskscore"]));

    imported.push({
      symbol,
      name: getCsvValue(row, headers, ["name", "security", "description"]) || symbol,
      assetClass,
      platform,
      currency,
      quantity,
      price,
      costBasisEUR: normalizedCostEUR,
      dayChangePct,
      risk: Number.isFinite(risk) ? clamp(risk, 0, 100) : defaultRiskForClass(assetClass),
    });
  });

  if (!imported.length) {
    throw new Error("No valid holdings found. Check ticker, quantity, and price columns.");
  }

  if (skipped.length) {
    setImportStatus(`Skipped rows: ${skipped.join(", ")}`, "error");
  }

  return imported;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  rows.push(row);
  return rows;
}

function rebuildPortfolioFromTransactions(transactions) {
  const previousHoldings = holdings;
  const previousTickers = trackedTickers;
  const applied = [];
  const errors = [];

  holdings = [];
  trackedTickers = [];

  transactions
    .map(normalizeStoredTransaction)
    .sort(compareTransactionsAsc)
    .forEach((transaction) => {
      try {
        ensureTickerForTransaction(transaction);
        applyTransaction(transaction);
        applied.push(transaction);
      } catch (error) {
        errors.push({ transaction, message: error.message });
      }
    });

  if (!applied.length && transactions.length) {
    holdings = previousHoldings;
    trackedTickers = previousTickers;
    throw new Error("No transactions could be applied to the portfolio.");
  }

  return { transactions: applied.sort(compareTransactionsDesc), errors };
}

function applyImportedTransactions(transactions) {
  const applied = [];
  const errors = [];

  transactions
    .map(normalizeStoredTransaction)
    .sort(compareTransactionsAsc)
    .forEach((transaction) => {
      try {
        ensureTickerForTransaction(transaction);
        applyTransaction(transaction);
        applied.push(transaction);
      } catch (error) {
        errors.push({ transaction, message: error.message });
      }
    });

  return { transactions: applied, errors };
}

function normalizeStoredTransaction(transaction) {
  const parsedDate = parseTradeDate(transaction.sortDate || transaction.date || new Date().toISOString().slice(0, 10)) || makeDisplayDate(new Date());
  const type = normalizeTransactionType(transaction.type);
  const currency = normalizeCurrency(transaction.currency || inferCurrencyForSymbol(transaction.symbol, "", transaction.assetClass));
  const quantity = Math.abs(Number(transaction.quantity) || 0);
  const price = Math.abs(Number(transaction.price) || 0);
  const fees = Math.abs(Number(transaction.fees) || 0);
  const cashImpactNative = Number.isFinite(Number(transaction.cashImpactNative))
    ? Number(transaction.cashImpactNative)
    : getCashImpact(type, quantity, price, fees);

  return {
    ...transaction,
    id: transaction.id || randomId(),
    date: parsedDate.display,
    sortDate: parsedDate.iso,
    type,
    symbol: normalizeSymbol(transaction.symbol || "CASH"),
    name: transaction.name || normalizeSymbol(transaction.symbol || "CASH"),
    assetClass: transaction.assetClass || inferAssetClassFromSymbol(transaction.symbol),
    platform: normalizePlatform(transaction.platform || "Other"),
    quantity,
    price,
    fees,
    currency,
    cashImpactNative,
    cashImpactEUR: Number.isFinite(Number(transaction.cashImpactEUR)) ? Number(transaction.cashImpactEUR) : toEUR(cashImpactNative, currency),
    fxRateToEUR: Number.isFinite(Number(transaction.fxRateToEUR)) ? Number(transaction.fxRateToEUR) : fxRateToEUR(currency),
    createdAt: Number(transaction.createdAt) || 0,
  };
}

function compareTransactionsAsc(a, b) {
  const timeDelta = getTransactionSortTime(a) - getTransactionSortTime(b);
  if (timeDelta !== 0) return timeDelta;
  const priorityDelta = getTransactionApplyPriority(a) - getTransactionApplyPriority(b);
  if (priorityDelta !== 0) return priorityDelta;
  return getTransactionSequence(a) - getTransactionSequence(b);
}

function compareTransactionsDesc(a, b) {
  const timeDelta = getTransactionSortTime(b) - getTransactionSortTime(a);
  if (timeDelta !== 0) return timeDelta;
  const priorityDelta = getTransactionApplyPriority(b) - getTransactionApplyPriority(a);
  if (priorityDelta !== 0) return priorityDelta;
  return getTransactionSequence(b) - getTransactionSequence(a);
}

function getTransactionSortTime(transaction) {
  const parsed = parseTradeDate(transaction.sortDate || transaction.date || "");
  return parsed ? new Date(parsed.iso).getTime() : 0;
}

function getTransactionApplyPriority(transaction) {
  if (transaction.type === "deposit") return 0;
  if (isStockQuantityAdjustment(transaction)) return 1;
  if (transaction.type === "buy") return 2;
  if (transaction.type === "dividend") return 3;
  if (transaction.type === "sell") return 4;
  if (transaction.type === "withdraw" || transaction.type === "fee") return 5;
  return 6;
}

function getTransactionSequence(transaction) {
  const sourceRow = Number(transaction.sourceRow);
  if (Number.isFinite(sourceRow) && sourceRow > 0) return sourceRow;
  const createdAt = Number(transaction.createdAt);
  return Number.isFinite(createdAt) && createdAt > 0 ? createdAt : 0;
}

function mergeHoldings(existingHoldings, importedHoldings) {
  const merged = clone(existingHoldings).map(normalizeHolding);

  importedHoldings.forEach((incoming) => {
    const match = merged.find((holding) => holdingKey(holding.symbol, holding.platform) === holdingKey(incoming.symbol, incoming.platform));
    if (!match) {
      merged.push(incoming);
      return;
    }

    const currentValueEUR = getMarketValue(match);
    const incomingValueEUR = getMarketValue(incoming);
    match.quantity += incoming.quantity;
    match.costBasisEUR = getCostBasisEUR(match) + getCostBasisEUR(incoming);
    match.price = match.quantity ? fromEUR(currentValueEUR + incomingValueEUR, incoming.currency) / match.quantity : incoming.price;
    match.currency = incoming.currency;
    match.name = incoming.name || match.name;
    match.assetClass = incoming.assetClass || match.assetClass;
    match.dayChangePct = incoming.dayChangePct;
    match.risk = incoming.risk;
  });

  return merged;
}

function rebuildAfterDataChange() {
  ensureTargetsForHoldings();
  ensureTickersForHoldings();
  performanceData = buildPerformanceData();
  render();
  refreshPortfolioPerformanceHistory({ force: true }).catch((error) => {
    state.performanceHistoryMessage = error.message || "history unavailable";
    renderPerformanceChart();
  });
}

function rebuildSavedPortfolioFromTransactions() {
  if (!state.transactions.length) return;

  const normalizedTransactions = state.transactions.map(normalizeStoredTransaction).sort(compareTransactionsDesc);

  try {
    const rebuilt = rebuildPortfolioFromTransactions(normalizedTransactions);
    state.transactions = rebuilt.errors.length ? normalizedTransactions : rebuilt.transactions;
    if (!rebuilt.errors.length) saveTransactions();
    saveHoldings();
    saveTickers();
  } catch (error) {
    console.warn("Could not rebuild portfolio from transactions.", error);
  }
}

function ensureTargetsForHoldings() {
  getAssetClasses().forEach((assetClass) => {
    if (state.targets[assetClass] === undefined) {
      state.targets[assetClass] = defaultTargets[assetClass] ?? 0;
    }
  });
}

function ensureTickersForHoldings() {
  trackedTickers = mergeTickers(trackedTickers, holdingsToTickers(holdings));
}

function ensureTickerForTransaction(transaction) {
  if (!transaction.symbol || transaction.symbol === "CASH") return;
  trackedTickers = mergeTickers(trackedTickers, [
    {
      symbol: transaction.symbol,
      name: transaction.name || transaction.symbol,
      assetClass: transaction.assetClass || inferAssetClassFromSymbol(transaction.symbol),
      platform: normalizePlatform(transaction.platform || "Other"),
      currency: transaction.currency || inferCurrencyForSymbol(transaction.symbol, "", transaction.assetClass),
      price: transaction.price || 0,
      dayChangePct: 0,
      risk: defaultRiskForClass(transaction.assetClass || inferAssetClassFromSymbol(transaction.symbol)),
    },
  ]);
}

function prepareCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function drawReturnGrid(ctx, width, height, padding, min, max) {
  ctx.strokeStyle = "#e5ecea";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#65706e";
  ctx.font = "12px Inter, system-ui, sans-serif";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((height - padding.top - padding.bottom) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    const value = max - ((max - min) * i) / 4;
    const returnValue = value - 100;
    ctx.fillText(formatSignedPercent(returnValue), 8, y + 4);
  }
}

function drawIndexedLine(ctx, points, color, width, height, padding, min, max, dateDomain, lineWidth = 3) {
  if (!points.length) return;

  const yRange = height - padding.top - padding.bottom;

  ctx.beginPath();
  points.forEach((point, index) => {
    const x = getDatePosition(point.date, dateDomain, width, padding);
    const y = padding.top + (1 - (point.value - min) / (max - min)) * yRange;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  const last = points[points.length - 1];
  const lastX = getDatePosition(last.date, dateDomain, width, padding);
  const lastY = padding.top + (1 - (last.value - min) / (max - min)) * yRange;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawPerformanceHover(ctx, lines, width, height, padding, min, max, dateDomain) {
  if (!Number.isFinite(state.performanceHoverX) || !lines.length || !lines[0].points.length) return;

  const portfolio = lines[0];
  const points = portfolio.points;
  const xRange = width - padding.left - padding.right;
  const yRange = height - padding.top - padding.bottom;
  const x = clamp(state.performanceHoverX, padding.left, width - padding.right);
  const targetTime = dateDomain.min + ((x - padding.left) / Math.max(xRange, 1)) * (dateDomain.max - dateDomain.min);
  const point = getNearestPointByTime(points, targetTime);
  const pointX = getDatePosition(point.date, dateDomain, width, padding);
  const pointY = padding.top + (1 - (point.value - min) / (max - min)) * yRange;
  const returnValue = point.value - 100;
  const valueLabel = formatSignedPercent(returnValue);
  const dateLabel = formatMonth(point.date);
  const title = `Portfolio ${valueLabel}`;

  ctx.save();
  ctx.strokeStyle = "rgba(23, 32, 31, 0.22)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 5]);
  ctx.beginPath();
  ctx.moveTo(pointX, padding.top);
  ctx.lineTo(pointX, height - padding.bottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.arc(pointX, pointY, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = portfolio.color;
  ctx.stroke();

  ctx.font = "800 12px Inter, system-ui, sans-serif";
  const titleWidth = ctx.measureText(title).width;
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  const dateWidth = ctx.measureText(dateLabel).width;
  const boxWidth = Math.max(titleWidth, dateWidth) + 22;
  const boxHeight = 48;
  const boxX = clamp(pointX + 12, padding.left, width - padding.right - boxWidth);
  const boxY = clamp(pointY - boxHeight - 12, padding.top, height - padding.bottom - boxHeight);

  ctx.fillStyle = "rgba(23, 32, 31, 0.92)";
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(title, boxX + 11, boxY + 9);
  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = "700 11px Inter, system-ui, sans-serif";
  ctx.fillText(dateLabel, boxX + 11, boxY + 28);
  ctx.restore();
}

function getLineDateDomain(lines) {
  const timestamps = lines
    .flatMap((line) => line.points.map((point) => getPointTime(point.date)))
    .filter(Number.isFinite);
  if (!timestamps.length) {
    const now = Date.now();
    return { min: now - 24 * 60 * 60 * 1000, max: now };
  }

  const min = Math.min(...timestamps);
  const max = Math.max(...timestamps);
  return min === max ? { min: min - 12 * 60 * 60 * 1000, max: max + 12 * 60 * 60 * 1000 } : { min, max };
}

function getDatePosition(date, domain, width, padding) {
  const time = getPointTime(date);
  const xRange = width - padding.left - padding.right;
  const progress = Number.isFinite(time) ? (time - domain.min) / Math.max(domain.max - domain.min, 1) : 0;
  return padding.left + clamp(progress, 0, 1) * xRange;
}

function getPointTime(date) {
  return date instanceof Date ? date.getTime() : Date.parse(date);
}

function getNearestPointByTime(points, targetTime) {
  return points.reduce((nearest, point) => {
    const pointDelta = Math.abs(getPointTime(point.date) - targetTime);
    const nearestDelta = Math.abs(getPointTime(nearest.date) - targetTime);
    return pointDelta < nearestDelta ? point : nearest;
  }, points[0]);
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function drawGrid(ctx, width, height, padding, min, max) {
  ctx.strokeStyle = "#e5ecea";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#65706e";
  ctx.font = "12px Inter, system-ui, sans-serif";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((height - padding.top - padding.bottom) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    const value = max - ((max - min) * i) / 4;
    ctx.fillText(eurFormatter.format(value), 8, y + 4);
  }
}

function drawLine(ctx, data, key, color, width, height, padding, min, max) {
  const xRange = width - padding.left - padding.right;
  const yRange = height - padding.top - padding.bottom;

  ctx.beginPath();
  data.forEach((point, index) => {
    const x = padding.left + (index / Math.max(data.length - 1, 1)) * xRange;
    const y = padding.top + (1 - (point[key] - min) / (max - min)) * yRange;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  const last = data[data.length - 1];
  const lastX = width - padding.right;
  const lastY = padding.top + (1 - (last[key] - min) / (max - min)) * yRange;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawAxisLabels(ctx, dateDomain, width, height, padding) {
  ctx.fillStyle = "#65706e";
  ctx.font = "12px Inter, system-ui, sans-serif";
  const first = new Date(dateDomain.min);
  const last = new Date(dateDomain.max);
  ctx.fillText(formatMonth(first), padding.left, height - 10);
  const lastLabel = formatMonth(last);
  ctx.fillText(lastLabel, width - padding.right - ctx.measureText(lastLabel).width, height - 10);
}

function filterPerformanceData() {
  if (state.activePeriod === "ALL") return performanceData;
  const startDate = getPeriodStartDate();
  const filtered = performanceData.filter((point) => new Date(point.date) >= startDate);
  return filtered.length > 1 ? filtered : performanceData.slice(-2);
}

function filterBenchmarkSeries(id) {
  const source = state.benchmarkSeries[id]?.length ? state.benchmarkSeries[id] : [];
  const startDate = getPeriodStartDate();
  const filtered = state.activePeriod === "ALL"
    ? source
    : source.filter((point) => new Date(point.date) >= startDate);
  return (filtered.length > 1 ? filtered : source.slice(-2)).map((point) => ({
    date: new Date(point.date),
    value: Number(point.value) || 0,
  }));
}

function normalizeSeries(points) {
  if (!points.length) return [];
  const first = Number(points[0].value) || 1;
  return points.map((point) => ({
    date: point.date instanceof Date ? point.date : new Date(point.date),
    value: first ? (Number(point.value) / first) * 100 : 100,
  }));
}

function getPeriodStartDate() {
  const now = new Date();
  const start = new Date(now);
  if (state.activePeriod === "6M") start.setMonth(now.getMonth() - 6);
  if (state.activePeriod === "1Y") start.setFullYear(now.getFullYear() - 1);
  if (state.activePeriod === "3Y") start.setFullYear(now.getFullYear() - 3);
  return start;
}

function buildPerformanceData() {
  const transactions = state.transactions
    .map(normalizeStoredTransaction)
    .filter((transaction) => parseTradeDate(transaction.sortDate || transaction.date))
    .sort(compareTransactionsAsc);

  if (!transactions.length) return buildFlatPerformanceData();

  const firstDate = parseTradeDate(transactions[0].sortDate || transactions[0].date)?.iso;
  if (!firstDate) return buildFlatPerformanceData();

  const start = new Date(`${firstDate}T00:00:00`);
  const maxLookbackStart = new Date();
  maxLookbackStart.setDate(maxLookbackStart.getDate() - 1825);
  const cursor = start < maxLookbackStart ? maxLookbackStart : start;
  const today = new Date();
  const quantities = {};
  const output = [];
  let transactionIndex = 0;
  let previousValue = 0;
  let portfolioIndex = 100;

  while (cursor <= today) {
    const dateKey = toIsoDate(cursor);
    const dayTransactions = [];
    while (transactionIndex < transactions.length && getTransactionDateKey(transactions[transactionIndex]) <= dateKey) {
      dayTransactions.push(transactions[transactionIndex]);
      transactionIndex += 1;
    }

    let externalFlow = 0;
    let distribution = 0;
    dayTransactions.forEach((transaction) => {
      const symbol = normalizeSymbol(transaction.symbol);
      const currency = normalizeCurrency(transaction.currency || BASE_CURRENCY);
      const quantity = Number(transaction.quantity) || 0;
      const price = Number(transaction.price) || 0;
      const fees = Number(transaction.fees) || 0;
      const amount = getTransactionAmount(transaction.type, quantity, price);

      if (transaction.type === "buy" && symbol && symbol !== "CASH") {
        quantities[symbol] = (quantities[symbol] || 0) + quantity;
        externalFlow += toEUR(amount + fees, currency);
      } else if (transaction.type === "sell" && symbol && symbol !== "CASH") {
        quantities[symbol] = (quantities[symbol] || 0) - quantity;
        externalFlow -= toEUR(Math.max(amount - fees, 0), currency);
      } else if (transaction.type === "dividend") {
        distribution += toEUR(Math.max(amount - fees, 0), currency);
      } else if (transaction.type === "fee") {
        distribution -= toEUR(amount + fees, currency);
      }
    });

    const marketValue = Object.entries(quantities).reduce((sum, [symbol, quantity]) => {
      if (Math.abs(quantity) < 0.0000001) return sum;
      const price = getHistoricalPriceForSymbol(symbol, dateKey);
      const currency = normalizeCurrency(state.performancePriceSeries[symbol]?.currency || getHoldingForAnalysis(symbol).currency || BASE_CURRENCY);
      return sum + toEUR(quantity * price, currency);
    }, 0);

    const denominator = previousValue + Math.max(externalFlow, 0);
    if (previousValue > 0 || denominator > 0) {
      const dailyReturn = denominator > 0
        ? clamp((marketValue + distribution - previousValue - externalFlow) / denominator, -0.95, 2)
        : 0;
      portfolioIndex *= 1 + dailyReturn;
      output.push({ date: new Date(cursor), portfolio: portfolioIndex, marketValue });
    }

    previousValue = marketValue;
    cursor.setDate(cursor.getDate() + 1);
  }

  return output.length > 1 ? output : buildFlatPerformanceData();
}

function buildFlatPerformanceData() {
  const value = Math.max(getTotalValue(), getTotalCost(), 1);
  const start = new Date();
  start.setDate(start.getDate() - 1);
  return [
    { date: start, portfolio: 100, marketValue: value },
    { date: new Date(), portfolio: 100, marketValue: value },
  ];
}

function getTransactionDateKey(transaction) {
  return parseTradeDate(transaction.sortDate || transaction.date)?.iso || "9999-12-31";
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getHistoricalPriceForSymbol(symbol, dateKey) {
  const normalized = normalizeSymbol(symbol);
  const series = state.performancePriceSeries[normalized]?.points || [];
  if (!series.length) {
    const holding = getHoldingForAnalysis(normalized);
    return Number(holding.price) || 0;
  }

  let lastPrice = 0;
  for (const point of series) {
    const pointDate = String(point.date || "").slice(0, 10);
    if (pointDate > dateKey) break;
    lastPrice = Number(point.value) || lastPrice;
  }
  if (lastPrice > 0) return lastPrice;
  return Number(series[0]?.value) || Number(getHoldingForAnalysis(normalized).price) || 0;
}

function initializePortfolioProfiles() {
  const now = new Date().toISOString();
  let profiles = loadStoredPortfolioProfiles();
  if (!profiles.length) {
    profiles = [{ id: DEFAULT_PROFILE_ID, name: DEFAULT_PROFILE_NAME, createdAt: now, updatedAt: now }];
  }

  let activeProfileId = localStorage.getItem(profileStorageKeys.activeProfileId) || DEFAULT_PROFILE_ID;
  if (!profiles.some((profile) => profile.id === activeProfileId)) activeProfileId = profiles[0].id;

  localStorage.setItem(profileStorageKeys.activeProfileId, activeProfileId);
  writeStoredPortfolioProfiles(profiles);
  return { profiles, activeProfileId };
}

function loadStoredPortfolioProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(profileStorageKeys.profiles) || "[]");
    return Array.isArray(saved) ? saved.map(normalizePortfolioProfile).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function normalizePortfolioProfile(profile) {
  const id = String(profile?.id || "").trim();
  const name = String(profile?.name || "").trim();
  if (!id || !name) return null;
  return {
    id,
    name: name.slice(0, 48),
    createdAt: profile.createdAt || new Date().toISOString(),
    updatedAt: profile.updatedAt || profile.createdAt || new Date().toISOString(),
  };
}

function writeStoredPortfolioProfiles(profiles) {
  localStorage.setItem(profileStorageKeys.profiles, JSON.stringify(profiles));
}

function savePortfolioProfiles() {
  writeStoredPortfolioProfiles(state.profiles);
}

function getActivePortfolioProfile() {
  return state.profiles.find((profile) => profile.id === state.activeProfileId) || state.profiles[0] || {
    id: DEFAULT_PROFILE_ID,
    name: DEFAULT_PROFILE_NAME,
  };
}

function getProfileStorageKey(baseKey, profileId = activePortfolioProfileId) {
  return `${baseKey}:${profileId || DEFAULT_PROFILE_ID}`;
}

function getProfileStorageItem(baseKey) {
  const profileValue = localStorage.getItem(getProfileStorageKey(baseKey));
  if (profileValue !== null) return profileValue;
  if ((activePortfolioProfileId || DEFAULT_PROFILE_ID) === DEFAULT_PROFILE_ID) return localStorage.getItem(baseKey);
  return null;
}

function setProfileStorageItem(baseKey, value) {
  localStorage.setItem(getProfileStorageKey(baseKey), value);
  touchActivePortfolioProfile();
}

function touchActivePortfolioProfile() {
  if (!Array.isArray(state.profiles)) return;
  const profile = state.profiles.find((item) => item.id === state.activeProfileId);
  if (!profile) return;
  profile.updatedAt = new Date().toISOString();
  savePortfolioProfiles();
}

function initializeBlankPortfolioProfile(profileId) {
  localStorage.setItem(getProfileStorageKey(storageKeys.holdings, profileId), JSON.stringify([]));
  localStorage.setItem(getProfileStorageKey(storageKeys.tickers, profileId), JSON.stringify([]));
  localStorage.setItem(getProfileStorageKey(storageKeys.transactions, profileId), JSON.stringify([]));
  localStorage.setItem(getProfileStorageKey(storageKeys.targets, profileId), JSON.stringify(defaultTargets));
  localStorage.setItem(getProfileStorageKey(storageKeys.fx, profileId), JSON.stringify(defaultFx));
  localStorage.setItem(getProfileStorageKey(storageKeys.benchmarks, profileId), JSON.stringify({}));
  localStorage.setItem(getProfileStorageKey(storageKeys.stockAnalysis, profileId), JSON.stringify({}));
  localStorage.setItem(getProfileStorageKey(storageKeys.newsSentiment, profileId), JSON.stringify({}));
  localStorage.setItem(getProfileStorageKey(storageKeys.manualYahooLinks, profileId), JSON.stringify({}));
  localStorage.setItem(getProfileStorageKey(storageKeys.watchlists, profileId), JSON.stringify([]));
}

function removePortfolioProfileStorage(profileId) {
  Object.values(storageKeys).forEach((baseKey) => {
    localStorage.removeItem(getProfileStorageKey(baseKey, profileId));
  });
}

function loadHoldings() {
  try {
    const raw = getProfileStorageItem(storageKeys.holdings);
    if (raw !== null) {
      const saved = JSON.parse(raw);
      return Array.isArray(saved) ? saved.map(normalizeHolding) : [];
    }
    return clone(sampleHoldings).map(normalizeHolding);
  } catch {
    return clone(sampleHoldings).map(normalizeHolding);
  }
}

function loadTickers() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.tickers) || "[]");
    return Array.isArray(saved) ? saved.map(normalizeTicker) : [];
  } catch {
    return [];
  }
}

function loadTargets() {
  try {
    return { ...defaultTargets, ...JSON.parse(getProfileStorageItem(storageKeys.targets) || "{}") };
  } catch {
    return { ...defaultTargets };
  }
}

function loadTransactions() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.transactions) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadFx() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.fx) || "null");
    return saved?.ratesToEUR?.USD ? saved : clone(defaultFx);
  } catch {
    return clone(defaultFx);
  }
}

function loadBenchmarkSeries() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.benchmarks) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function loadStockAnalysisCache() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.stockAnalysis) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function loadNewsSentimentCache() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.newsSentiment) || "{}");
    if (!saved || typeof saved !== "object") return {};
    return Object.fromEntries(
      Object.entries(saved)
        .map(([symbol, item]) => [normalizeSymbol(symbol), normalizeNewsSentimentItem({ ...item, symbol: item?.symbol || symbol }, item?.generatedAt)])
        .filter(([symbol]) => symbol),
    );
  } catch {
    return {};
  }
}

function loadManualYahooLinks() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.manualYahooLinks) || "{}");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function loadWatchlists() {
  try {
    const saved = JSON.parse(getProfileStorageItem(storageKeys.watchlists) || "[]");
    return Array.isArray(saved) ? saved.map(normalizeStoredWatchlist).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function normalizeStoredWatchlist(watchlist) {
  const normalized = normalizeWatchlistAction({
    type: "watchlist",
    title: watchlist?.title,
    theme: watchlist?.theme,
    items: watchlist?.items,
  });
  if (!normalized) return null;
  return {
    ...normalized,
    id: watchlist.id || randomId(),
    createdAt: watchlist.createdAt || new Date().toISOString(),
    updatedAt: watchlist.updatedAt || watchlist.createdAt || new Date().toISOString(),
  };
}
function saveHoldings() {
  setProfileStorageItem(storageKeys.holdings, JSON.stringify(holdings));
}

function saveTickers() {
  setProfileStorageItem(storageKeys.tickers, JSON.stringify(trackedTickers));
}

function saveTargets() {
  setProfileStorageItem(storageKeys.targets, JSON.stringify(state.targets));
}

function saveTransactions(options = {}) {
  setProfileStorageItem(storageKeys.transactions, JSON.stringify(state.transactions));
  if (!options.skipRemoteSync) syncActiveProfileTransactionsToDb();
}

function saveFx() {
  setProfileStorageItem(storageKeys.fx, JSON.stringify(state.fx));
}

function saveBenchmarkSeries() {
  setProfileStorageItem(storageKeys.benchmarks, JSON.stringify(state.benchmarkSeries));
}

function saveStockAnalysisCache() {
  setProfileStorageItem(storageKeys.stockAnalysis, JSON.stringify(state.stockAnalysis));
}

function saveNewsSentimentCache() {
  setProfileStorageItem(storageKeys.newsSentiment, JSON.stringify(state.newsSentiment));
}

function saveManualYahooLinks() {
  setProfileStorageItem(storageKeys.manualYahooLinks, JSON.stringify(state.manualYahooLinks));
}

function saveWatchlists() {
  setProfileStorageItem(storageKeys.watchlists, JSON.stringify(state.watchlists));
}

function hasSavedHoldings() {
  return getProfileStorageItem(storageKeys.holdings) !== null;
}

function ensureTransactionIds() {
  let changed = false;
  state.transactions.forEach((transaction) => {
    if (!transaction.id) {
      transaction.id = randomId();
      changed = true;
    }
  });
  if (changed) saveTransactions();
}

function normalizeHolding(holding) {
  const assetClass = String(holding.assetClass || "Equity").trim();
  const currency = normalizeCurrency(holding.currency || BASE_CURRENCY);
  const platform = normalizePlatform(holding.platform || holding.broker || "Other");
  const symbol = normalizeSymbol(holding.symbol || "");
  const nativeCostBasis = Number(holding.costBasis);
  const costBasisEUR = Number.isFinite(Number(holding.costBasisEUR))
    ? Number(holding.costBasisEUR)
    : toEUR(Number.isFinite(nativeCostBasis) ? nativeCostBasis : (Number(holding.quantity) || 0) * (Number(holding.price) || 0), currency);

  return {
    symbol,
    name: String(holding.name || symbol).trim(),
    assetClass,
    platform,
    currency,
    quantity: Number(holding.quantity) || 0,
    price: Number(holding.price) || 0,
    costBasisEUR,
    lifetimeInvestedEUR: Number.isFinite(Number(holding.lifetimeInvestedEUR)) ? Number(holding.lifetimeInvestedEUR) : costBasisEUR,
    realizedGainEUR: Number(holding.realizedGainEUR) || 0,
    closed: Boolean(holding.closed) || (Number(holding.quantity) || 0) === 0 && symbol !== "CASH",
    closedAt: holding.closedAt || "",
    dayChangePct: Number(holding.dayChangePct) || 0,
    risk: Number.isFinite(Number(holding.risk)) ? clamp(Number(holding.risk), 0, 100) : defaultRiskForClass(assetClass),
  };
}

function normalizeTicker(ticker) {
  const symbol = normalizeSymbol(ticker.symbol || "");
  const assetClass = String(ticker.assetClass || "Equity").trim();
  return {
    symbol,
    name: String(ticker.name || symbol).trim(),
    assetClass,
    platform: normalizePlatform(ticker.platform || "Other"),
    currency: normalizeCurrency(ticker.currency || BASE_CURRENCY),
    price: Number(ticker.price) || 0,
    dayChangePct: Number(ticker.dayChangePct) || 0,
    risk: Number.isFinite(Number(ticker.risk)) ? clamp(Number(ticker.risk), 0, 100) : defaultRiskForClass(assetClass),
  };
}

function holdingsToTickers(sourceHoldings) {
  return sourceHoldings
    .filter((holding) => holding.symbol !== "CASH")
    .map((holding) =>
      normalizeTicker({
        symbol: holding.symbol,
        name: holding.name,
        assetClass: holding.assetClass,
        platform: holding.platform,
        currency: holding.currency,
        price: holding.price,
        dayChangePct: holding.dayChangePct,
        risk: holding.risk,
      }),
    );
}

function mergeTickers(existing, incoming) {
  const merged = existing.map(normalizeTicker).filter((ticker) => ticker.symbol);

  incoming.map(normalizeTicker).forEach((ticker) => {
    const index = merged.findIndex((item) => tickerKey(item.symbol, item.platform) === tickerKey(ticker.symbol, ticker.platform));
    if (index >= 0) {
      merged[index] = { ...merged[index], ...ticker };
    } else {
      merged.push(ticker);
    }
  });

  return merged;
}

function uniqueTickersForQuotes() {
  return uniqueBy(trackedTickers.filter((ticker) => ticker.symbol && ticker.symbol !== "CASH"), (ticker) => ticker.symbol);
}
function uniqueVisibleTickersForQuotes() {
  const openSymbols = new Set(getVisibleHoldings().map((holding) => holding.symbol).filter((symbol) => symbol && symbol !== "CASH"));
  const visibleTickers = getVisibleHoldings().map((holding) => {
    const tracked = trackedTickers.find((ticker) => ticker.symbol === holding.symbol) || {};
    return { ...tracked, ...holding };
  });
  const trackedOpen = trackedTickers.filter((ticker) => openSymbols.has(ticker.symbol));
  return uniqueBy([...visibleTickers, ...trackedOpen].filter((ticker) => ticker.symbol && ticker.symbol !== "CASH"), (ticker) => ticker.symbol);
}

function getVisibleHoldings() {
  return holdings.filter((holding) => isHoldingOpen(holding) && holding.symbol !== "CASH");
}

function getSummaryVisibleHoldings() {
  return getVisibleHoldings().filter((holding) => state.activeFilter === "All" || holding.assetClass === state.activeFilter);
}

function getSummaryRelatedHoldings() {
  return holdings.filter((holding) =>
    holding.symbol
    && holding.symbol !== "CASH"
    && (state.activeFilter === "All" || holding.assetClass === state.activeFilter),
  );
}

function getDisplayHoldings() {
  return holdings.filter((holding) => holding.symbol && holding.symbol !== "CASH" && isHoldingOpen(holding));
}

function getClosedDisplayHoldings() {
  return holdings.filter((holding) => holding.symbol && holding.symbol !== "CASH" && isHoldingClosed(holding));
}

function isHoldingOpen(holding) {
  return Math.abs(Number(holding.quantity) || 0) > 0.0000001 || (holding.symbol === "CASH" && Math.abs(getMarketValue(holding)) > 0.0000001);
}

function isHoldingClosed(holding) {
  return !isHoldingOpen(holding) && (Boolean(holding.closed) || Math.abs(getLifetimeInvestedEUR(holding)) > 0.0000001 || Math.abs(getRealizedGainEUR(holding)) > 0.0000001);
}

function getPortfolioRiskScore() {
  const totalValue = getTotalValue();
  if (totalValue <= 0) return 0;
  return getVisibleHoldings().reduce((sum, holding) => sum + holding.risk * safeRatio(getMarketValue(holding), totalValue), 0);
}

function getAssetWeights() {
  const totalValue = getTotalValue();
  return getVisibleHoldings().reduce((weights, holding) => {
    weights[holding.assetClass] = (weights[holding.assetClass] || 0) + safePercent(getMarketValue(holding), totalValue);
    return weights;
  }, {});
}

function getPlatformWeights() {
  const totalValue = getTotalValue();
  const weights = getVisibleHoldings().reduce((items, holding) => {
    items[holding.platform] = (items[holding.platform] || 0) + safePercent(getMarketValue(holding), totalValue);
    return items;
  }, {});
  return Object.entries(weights)
    .map(([platform, weight]) => ({ platform, weight }))
    .sort((a, b) => b.weight - a.weight);
}

function getCurrencyWeights() {
  const totalValue = getTotalValue();
  return getVisibleHoldings().reduce((weights, holding) => {
    weights[holding.currency] = (weights[holding.currency] || 0) + safePercent(getMarketValue(holding), totalValue);
    return weights;
  }, {});
}

function getTopHolding() {
  const totalValue = getTotalValue();
  return getVisibleHoldings()
    .map((holding) => ({ ...holding, value: getMarketValue(holding), weight: safePercent(getMarketValue(holding), totalValue) }))
    .filter((holding) => holding.symbol !== "CASH")
    .sort((a, b) => b.value - a.value)[0];
}

function getRiskProfileLabel(riskScore, weights) {
  const cryptoWeight = weights.Crypto || 0;
  const cashWeight = weights.Cash || 0;

  if (riskScore >= 78 || cryptoWeight >= 12) {
    return {
      title: "Aggressive growth profile",
      summary: "an aggressive growth allocation with meaningful volatility tolerance implied by the holdings",
    };
  }
  if (riskScore >= 62) {
    return {
      title: "Growth profile",
      summary: "a growth-oriented allocation where long-term appreciation appears to matter more than short-term stability",
    };
  }
  if (riskScore >= 42) {
    return {
      title: "Balanced profile",
      summary: "a balanced allocation with both growth exposure and stabilizers",
    };
  }
  if (cashWeight >= 35 || riskScore < 42) {
    return {
      title: "Defensive profile",
      summary: "a defensive allocation where cash and lower-risk assets carry more of the portfolio",
    };
  }
  return {
    title: "Mixed profile",
    summary: "a mixed allocation with no single risk posture dominating yet",
  };
}

function getAssetClasses() {
  return [...new Set(
    holdings
      .filter((holding) => holding.symbol && holding.symbol !== "CASH")
      .filter((holding) => getMarketValue(holding) > 0 || Math.abs(getRealizedGainEUR(holding)) > 0.0000001)
      .map((holding) => holding.assetClass)
      .filter(Boolean),
  )];
}

function getAssetClassOptions() {
  return [...new Set([...assetClassOptions, ...getAssetClasses(), ...trackedTickers.map((ticker) => ticker.assetClass)])];
}

function getPlatforms() {
  return [
    ...new Set(
      [
        ...defaultPlatforms,
        ...holdings.map((holding) => holding.platform),
        ...trackedTickers.map((ticker) => ticker.platform),
        ...state.transactions.map((transaction) => transaction.platform),
      ]
        .filter(Boolean)
        .map(normalizePlatform),
    ),
  ];
}

function getOpenTickers(platform) {
  return trackedTickers
    .filter((ticker) => !platform || ticker.platform === platform)
    .sort((a, b) => `${a.symbol} ${a.platform}`.localeCompare(`${b.symbol} ${b.platform}`));
}

function getSelectedTicker() {
  return getTickerFromSearchValue(document.getElementById("transactionTickerSearch").value);
}

function getTickerFromSearchValue(value) {
  const { symbol, platform } = parseTickerSearchValue(value);
  if (!symbol) return null;

  if (platform) {
    return trackedTickers.find(
      (ticker) => ticker.symbol === symbol && normalizePlatform(ticker.platform) === normalizePlatform(platform),
    ) || null;
  }

  const selectedPlatform = normalizePlatform(document.getElementById("transactionPlatform")?.value || "");
  return trackedTickers.find((ticker) => ticker.symbol === symbol && normalizePlatform(ticker.platform) === selectedPlatform)
    || trackedTickers.find((ticker) => ticker.symbol === symbol)
    || null;
}

function buildTickerFromTransactionSearch() {
  const { symbol, platform: typedPlatform } = parseTickerSearchValue(document.getElementById("transactionTickerSearch").value);
  if (!symbol) return null;
  const assetClass = document.getElementById("transactionAssetClass").value || inferAssetClassFromSymbol(symbol);
  const platform = normalizePlatform(typedPlatform || document.getElementById("transactionPlatform").value || "Other");
  const currency = normalizeCurrency(document.getElementById("transactionCurrency").value || inferCurrencyForSymbol(symbol, "", assetClass));

  return normalizeTicker({
    symbol,
    name: symbol,
    assetClass,
    platform,
    currency,
    price: parseNumber(document.getElementById("transactionPrice").value) || 0,
    dayChangePct: 0,
    risk: defaultRiskForClass(assetClass),
  });
}

function formatTickerOption(ticker) {
  return ticker.symbol;
}

function parseTickerSearchValue(value) {
  const raw = String(value || "").trim();
  if (!raw) return { symbol: "", platform: "" };
  const [symbolPart, platformPart = ""] = raw.split("|");
  return {
    symbol: normalizeSymbol(symbolPart),
    platform: platformPart.trim(),
  };
}

function getMarketValue(holding) {
  return toEUR(holding.quantity * holding.price, holding.currency);
}

function getCostBasisEUR(holding) {
  return Number(holding.costBasisEUR) || 0;
}

function getLifetimeInvestedEUR(holding) {
  return Number.isFinite(Number(holding.lifetimeInvestedEUR)) ? Number(holding.lifetimeInvestedEUR) : getCostBasisEUR(holding);
}

function getRealizedGainEUR(holding) {
  return Number(holding.realizedGainEUR) || 0;
}

function getInvestedValueEUR(holding) {
  return isHoldingOpen(holding) ? getCostBasisEUR(holding) : getLifetimeInvestedEUR(holding);
}

function getHoldingGainEUR(holding) {
  if (isHoldingOpen(holding)) {
    return getMarketValue(holding) - getCostBasisEUR(holding);
  }
  return getRealizedGainEUR(holding);
}

function getAveragePriceNative(holding) {
  return holding.quantity ? fromEUR(getCostBasisEUR(holding), holding.currency) / holding.quantity : 0;
}

function getTotalValue() {
  return getVisibleHoldings().reduce((sum, holding) => sum + getMarketValue(holding), 0);
}

function getTotalCost() {
  return getVisibleHoldings().reduce((sum, holding) => sum + getCostBasisEUR(holding), 0);
}

function getClassValue(assetClass) {
  return getVisibleHoldings()
    .filter((holding) => holding.assetClass === assetClass)
    .reduce((sum, holding) => sum + getMarketValue(holding), 0);
}

function findHolding(symbol, platform) {
  const key = holdingKey(symbol, platform);
  return holdings.find((holding) => holdingKey(holding.symbol, holding.platform) === key);
}

function holdingKey(symbol, platform) {
  const normalized = normalizeSymbol(symbol);
  return normalized === "CASH" ? `${normalized}::${normalizePlatform(platform || "Other")}` : normalized;
}

function tickerKey(symbol) {
  return normalizeSymbol(symbol);
}

function getVisibleTargetTotal() {
  return getAssetClasses().reduce((sum, assetClass) => sum + Number(state.targets[assetClass] || 0), 0);
}

function getClassColor(assetClass, index) {
  return classColors[assetClass] || fallbackColors[index % fallbackColors.length];
}

function defaultRiskForClass(assetClass) {
  const risks = {
    Equity: 84,
    Bonds: 28,
    "Real Estate": 74,
    Commodities: 58,
    Crypto: 98,
    Cash: 4,
  };
  return risks[assetClass] ?? 60;
}

function inferAssetClassFromSymbol(symbol) {
  const normalized = normalizeSymbol(symbol);
  if (["BTC", "ETH", "SOL", "ADA", "DOGE"].includes(normalized.replace(/[^A-Z]/g, ""))) return "Crypto";
  if (normalized.includes("BND") || normalized.includes("AGG") || normalized.includes("TLT")) return "Bonds";
  if (normalized.includes("VNQ") || normalized.includes("REIT")) return "Real Estate";
  if (normalized.includes("GLD") || normalized.includes("SLV") || normalized.includes("DBC")) return "Commodities";
  return "Equity";
}

function getPeriodReturn(data, key) {
  if (!data.length) return 0;
  const first = data[0][key];
  const last = data[data.length - 1][key];
  return safePercent(last - first, first);
}

function getPrimaryBenchmarkReturn() {
  const benchmark = benchmarkDefinitions.find((item) => item.id === state.activeBenchmarks[0]) || benchmarkDefinitions[0];
  const series = filterBenchmarkSeries(benchmark.id);
  if (series.length < 2) {
    return { name: benchmark.name, returnValue: 0 };
  }
  const first = series[0].value;
  const last = series[series.length - 1].value;
  return { name: benchmark.name, returnValue: safePercent(last - first, first) };
}

function toEUR(amount, currency) {
  return Number(amount || 0) * fxRateToEUR(currency);
}

function fromEUR(amount, currency) {
  const rate = fxRateToEUR(currency);
  return rate ? Number(amount || 0) / rate : Number(amount || 0);
}

function fxRateToEUR(currency) {
  const normalized = normalizeCurrency(currency);
  return state?.fx?.ratesToEUR?.[normalized] || defaultFx.ratesToEUR[normalized] || 1;
}

function normalizeCurrency(currency) {
  const normalized = String(currency || BASE_CURRENCY).trim().toUpperCase();
  return supportedCurrencies.includes(normalized) ? normalized : BASE_CURRENCY;
}

function normalizePlatform(platform) {
  const raw = String(platform || "Other").trim();
  const key = raw.toLowerCase().replace(/\s+/g, " ");
  if (platformAliases.has(key)) return platformAliases.get(key);
  return getPlatformInfo(raw).name;
}

function getPlatformInfo(platform) {
  const raw = String(platform || "Other").trim();
  const key = raw.toLowerCase().replace(/\s+/g, "");
  const match = platformDefinitions.find((item) => item.name.toLowerCase().replace(/\s+/g, "") === key);
  if (match) return match;
  const label = raw || "Other";
  return {
    name: label,
    slug: "",
    color: "64748B",
    initials: label
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "O",
  };
}

function setPlatformValue(inputId, platform) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.value = normalizePlatform(platform);
}

function inferCurrencyFromSymbol(symbol, fallback) {
  const lower = symbol.toLowerCase();
  if (lower.endsWith(".us") || lower.endsWith("usd")) return "USD";
  if (lower.endsWith("eur") || [".de", ".nl", ".pa", ".mi", ".ls"].some((suffix) => lower.endsWith(suffix))) return "EUR";
  return normalizeCurrency(fallback);
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function setStatus(id, message, tone) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("error", tone === "error");
  element.classList.toggle("success", tone === "success");
}

function setImportStatus(message, tone) {
  setStatus("importStatus", message, tone);
  setStatus("importModalStatus", message, tone);
}

function setSelectOptions(select, options, selected) {
  select.innerHTML = options.map((option) => `<option value="${escapeAttribute(option)}">${escapeHtml(option)}</option>`).join("");
  if (options.includes(selected)) {
    select.value = selected;
  }
}

function selectedValue(id, fallback) {
  const element = document.getElementById(id);
  return element?.value || fallback;
}

function colorBySign(id, value) {
  const element = document.getElementById(id);
  element.classList.toggle("positive", value >= 0);
  element.classList.toggle("negative", value < 0);
}

function formatMoney(value, currency) {
  const normalized = normalizeCurrency(currency);
  if (!moneyFormatters.has(normalized)) {
    moneyFormatters.set(
      normalized,
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: normalized,
        maximumFractionDigits: 2,
      }),
    );
  }
  return moneyFormatters.get(normalized).format(Number(value) || 0);
}

function formatSignedEUR(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const sign = safeValue >= 0 ? "+" : "-";
  return `${sign}${exactEurFormatter.format(Math.abs(safeValue))}`;
}

function formatPercent(value) {
  return `${percentFormatter.format(Number.isFinite(value) ? value : 0)}%`;
}

function formatSignedPercent(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const sign = safeValue >= 0 ? "+" : "";
  return `${sign}${formatPercent(safeValue)}`;
}

function formatQuantity(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function formatDecimal(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

function shortTime(iso) {
  return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function setActiveButton(container, activeButton) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

function getCsvValue(row, headers, names) {
  const index = headers.findIndex((header) => names.includes(header));
  return index >= 0 ? (row[index] || "").trim() : "";
}

function normalizeHeader(header) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeSymbol(value) {
  return String(value || "").trim().toUpperCase();
}

function getBaseTickerSymbol(value) {
  return normalizeSymbol(value).replace(/\.(US|DE|NL|PA|MI|LS|SW|L)$/i, "");
}

function parseNumber(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value || "")
    .replace(/[$\u20ac\u00a3,%]/g, "")
    .replace(/,/g, "")
    .trim();
  if (!cleaned) return NaN;
  return Number(cleaned);
}

function safeRatio(value, total) {
  return total ? value / total : 0;
}

function safePercent(value, total) {
  return safeRatio(value, total) * 100;
}

function debounce(fn, delay) {
  let handle;
  return (...args) => {
    window.clearTimeout(handle);
    handle = window.setTimeout(() => fn(...args), delay);
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function randomId() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function roundForInput(value) {
  return Number(value).toFixed(2).replace(/\.?0+$/, "");
}

function formatDateForQuote(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function parseTradeDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const compact = raw.replace(/\D/g, "");
  if (compact.length === 8 && raw.indexOf(".") === -1 && raw.indexOf("/") === -1) {
    const year = compact.slice(0, 4);
    const month = compact.slice(4, 6);
    const day = compact.slice(6, 8);
    return isValidDateParts(year, month, day) ? { iso: `${year}-${month}-${day}`, display: `${day}.${month}.${year}` } : null;
  }

  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch && isValidDateParts(isoMatch[1], isoMatch[2], isoMatch[3])) {
    return { iso: `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`, display: `${isoMatch[3]}.${isoMatch[2]}.${isoMatch[1]}` };
  }

  const dottedMatch = raw.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (dottedMatch) {
    const day = dottedMatch[1].padStart(2, "0");
    const month = dottedMatch[2].padStart(2, "0");
    const year = dottedMatch[3];
    return isValidDateParts(year, month, day) ? { iso: `${year}-${month}-${day}`, display: `${day}.${month}.${year}` } : null;
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : makeDisplayDate(parsed);
}

function makeDisplayDate(date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return { iso: `${year}-${month}-${day}`, display: `${day}.${month}.${year}` };
}

function isValidDateParts(year, month, day) {
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return !Number.isNaN(date.getTime())
    && date.getFullYear() === Number(year)
    && date.getMonth() + 1 === Number(month)
    && date.getDate() === Number(day);
}

function formatTransactionDate(transaction) {
  const parsed = parseTradeDate(transaction.date || transaction.sortDate);
  return parsed ? parsed.display : transaction.date || "-";
}

function safeTransactionSymbol(type, symbol) {
  return ["deposit", "withdraw", "fee"].includes(type) ? "CASH" : symbol;
}

function isStockQuantityAdjustment(transaction) {
  return transaction?.type === "dividend"
    && normalizeSymbol(transaction.symbol) !== "CASH"
    && Math.abs(Number(transaction.quantity) || 0) > 0
    && Math.abs(Number(transaction.price) || 0) <= 0.0000001;
}

function normalizeTransactionType(value) {
  const normalized = String(value || "").toLowerCase().replace(/[^a-z]/g, "");
  if (!normalized) return "";
  if (normalized === "b") return "buy";
  if (normalized === "s") return "sell";
  if (normalized.includes("buy") || normalized.includes("bought") || normalized.includes("purchase")) return "buy";
  if (normalized.includes("sell") || normalized.includes("sold") || normalized.includes("sale")) return "sell";
  if (normalized.includes("deposit") || normalized.includes("transferin") || normalized.includes("cashin")) return "deposit";
  if (normalized.includes("withdraw") || normalized.includes("transferout") || normalized.includes("cashout")) return "withdraw";
  if (normalized.includes("dividend") || normalized.includes("distribution") || normalized.includes("interest")) return "dividend";
  if (normalized.includes("fee") || normalized.includes("commission") || normalized.includes("tax")) return "fee";
  return "";
}

function inferCurrencyForSymbol(symbol, explicitCurrency, assetClass) {
  const explicit = String(explicitCurrency || "").trim().toUpperCase();
  if (supportedCurrencies.includes(explicit)) return explicit;

  const normalized = normalizeSymbol(symbol);
  if (assetClass === "Cash") return BASE_CURRENCY;
  if (normalized.endsWith(".DE") || normalized.endsWith(".NL") || normalized.endsWith(".PA") || normalized.endsWith(".MI") || normalized.endsWith(".LS")) return "EUR";
  if (normalized.endsWith(".US")) return "USD";
  if (/^[A-Z]{1,5}$/.test(normalized)) return "USD";
  return BASE_CURRENCY;
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function cssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(value);
  }
  return value.replace(/"/g, '\\"');
}
