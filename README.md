# Queen's Banquet Events

Queen's Banquet Events is an elegant wedding and event coordination landing-page system designed with a black, gold, and ivory palette. The stack is a React frontend, Express API, shared backend package, and PostgreSQL (local Docker or **Supabase**).

## System Structure

```text
.
├── frontend/      # React landing page + admin (Vite)
├── api/           # Express HTTP API
├── backend/       # Business logic + Postgres access
├── database/      # SQL schema, migrations, seeds
├── docs/          # Architecture notes
├── supabase.md    # Step-by-step Supabase connection guide
└── .env.example   # Environment template
```

## Getting Started (local)

```bash
cp .env.example .env
npm install
npm run db:setup    # local Docker Postgres + migrate + seed
npm run dev:api     # API on http://localhost:4000
npm run dev         # frontend on http://localhost:5174
```

While `npm run dev` is running, Vite hot-reloads code changes. With the API running and `VITE_API_BASE_URL` set, admin saves and inquiries persist in Postgres.

## Connect to Supabase (local)

Full walkthrough (connection string, migrations, seed, SSL, security):

**→ [supabase.md](./supabase.md)**

Quick path:

1. Create/open your project in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Copy **Project Settings → Database → Connection string (URI)**.
3. Put it in `.env` as `DATABASE_URL=...`.
4. Run:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev
```

5. Confirm `GET http://localhost:4000/health` returns `"databaseConnected": true`.

The frontend talks only to the API — not to Supabase REST keys.

## Go live (Vercel + API + Supabase)

Frontend is on Vercel; the API must be deployed separately and pointed at Supabase.

**→ [DEPLOY.md](./DEPLOY.md)** — step-by-step (Render API + Vercel `VITE_API_BASE_URL`)

Short version:

1. Deploy API on [Render](https://render.com) with start command `npm run start --workspace api`.
2. Set `DATABASE_URL`, `CORS_ORIGIN` (your Vercel URL), `ADMIN_JWT_SECRET` on Render.
3. On Vercel, set `VITE_API_BASE_URL=https://your-api.onrender.com` and **redeploy**.
4. Test `/admin` login and Save → data appears in Supabase `landing_content`.

## Admin Page

```text
http://localhost:5174/admin
```

Default seeded credentials (override via `.env`):

```text
Email: queensbanquet07@gmail.com
Password: marou-admin
```

When the API is connected to Supabase, login and content saves use the database. Without the API, the admin falls back to local browser storage / env credentials.

## Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Frontend (port `5174`) |
| `npm run dev:api` | Express API (port `4000`) |
| `npm run build` | Production frontend build |
| `npm run preview` | Preview production build |
| `npm run db:up` | Start local Docker Postgres |
| `npm run db:migrate` | Apply SQL migrations (local or Supabase) |
| `npm run db:seed` | Seed admin + default content |
| `npm run db:setup` | Local Docker + migrate + seed |

## Environment

Copy `.env.example` → `.env`. Important keys:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres URI (local Docker or Supabase) |
| `DATABASE_SSL` | Optional; TLS auto-on for Supabase hosts |
| `VITE_API_BASE_URL` | Frontend → API base URL |
| `ADMIN_JWT_SECRET` | JWT signing secret for admin sessions |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin account |

See [supabase.md](./supabase.md) for Supabase-specific setup and security notes.

## Related docs

- [supabase.md](./supabase.md) — connect backend to Supabase
- [database/README.md](./database/README.md) — schema and migrations
- [api/README.md](./api/README.md) — API endpoints
- [docs/system-architecture.md](./docs/system-architecture.md) — architecture overview
