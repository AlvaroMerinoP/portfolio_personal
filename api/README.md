# Portfolio API

Lightweight Node.js/Express backend for [alvaromerino.dev](https://alvaromerino.dev).

## Features

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET  /api/health` | — | Health check |
| `POST /api/contact` | JSON/FormData | Contact form submission (email notification) |
| `POST /api/newsletter` | JSON/FormData | Newsletter subscription + confirmation email |
| `GET  /api/github` | — | GitHub stats proxy with server-side caching |
| `POST /api/analytics` | JSON | Privacy-first event tracking |
| `GET  /api/analytics` | JSON | Basic event summary (requires auth) |

## Security

- **Helmet** — HTTP security headers (CSP, HSTS, X-Frame-Options, …)
- **CORS** — origin allowlist via `ALLOWED_ORIGINS` env var
- **Rate limiting** — per-IP request limits on every endpoint
- **Honeypot** — `_gotcha` field silently rejects bot submissions
- **Input validation** — all fields validated with the `validator` package; HTML stripped before emailing

## Setup

```bash
# 1. Install dependencies
cd api
npm install

# 2. Configure environment
cp .env.example .env
#    → Edit .env with your SMTP credentials and other settings

# 3. Run (development)
npm run dev

# 4. Run (production)
npm start
```

## Environment Variables

See [`.env.example`](.env.example) for the full list and descriptions.

| Variable | Required | Default |
|----------|----------|---------|
| `PORT` | No | `3000` |
| `ALLOWED_ORIGINS` | Yes (prod) | — |
| `SMTP_HOST/PORT/USER/PASS` | Yes | — |
| `MAIL_FROM` | No | `no-reply@alvaromerino.dev` |
| `MAIL_TO` | No | `alvaromerinopuerta@gmail.com` |
| `GITHUB_TOKEN` | No | — (60 req/h unauthenticated) |
| `GITHUB_USERNAME` | No | `AlvaroMerinoP` |
| `GITHUB_CACHE_TTL` | No | `3600` (1 h) |
| `ANALYTICS_SECRET` | No | — |

## Deployment Options

### Vercel (serverless)
Wrap `server.js` in a `vercel.json` routes config — the Express app exports cleanly.

### Railway / Render / Fly.io
Push the `api/` directory, set env vars in the dashboard, expose port `3000`.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Extending with a Database

To persist contacts and subscriptions replace the `console.info` lines in the
route handlers with calls to your DB client (e.g. `@supabase/supabase-js`,
`pg`, `mongoose`).

```js
// Example — Supabase
const { data, error } = await supabase
  .from('newsletter')
  .insert({ email, subscribed_at: new Date() });
```
