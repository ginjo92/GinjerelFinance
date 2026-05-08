# GinjerelFinance

Local-first portfolio dashboard with live quote APIs, stock history charts, news sentiment, and an optional AI portfolio coach.

## Run Locally

```powershell
npm start
```

Then open `http://localhost:8787`.

## Deploy On Render

This repo includes `render.yaml`, so Render can create the Node web service from the repository.

1. Open Render and create a new Blueprint from this GitHub repository.
2. Use the branch that contains `render.yaml`.
3. Render will run `npm install` and `npm start`.
4. Add `OPENAI_API_KEY` when Render prompts for it if you want the AI chat enabled. Leave it blank if you only want portfolio quotes, charts, and news sentiment.

The portfolio itself is currently stored in browser `localStorage`, so each browser/device has its own portfolio data unless a database/login layer is added later.

## Portfolio Profiles Database

The app supports a Postgres-backed profile database when `DATABASE_URL` is set on the server.

- Profiles are stored in `portfolio_profiles`.
- Transactions are stored in `portfolio_transactions`.
- The portfolio is rebuilt from the selected profile's transactions.
- If `DATABASE_URL` is not configured, the app falls back to browser-local profile storage.

To enable the database online, create a Postgres database on Render, Supabase, Neon, or another Postgres host, then set its connection string as the Render environment variable `DATABASE_URL`.
