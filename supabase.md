# Connect Queen's Banquet to Supabase

This guide walks through connecting the **Node API + backend** to a **Supabase Postgres** database.

> Important: the frontend does **not** talk to Supabase directly.  
> Browser → `VITE_API_BASE_URL` (Express API) → `DATABASE_URL` (Supabase Postgres).

Your project ref (example): `ymazyolygjvbqrkmnbfk`  
Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)

---

## Architecture

```text
┌─────────────┐     HTTP/JSON      ┌──────────────┐     SQL (pg)     ┌──────────────────┐
│  Frontend   │ ─────────────────► │  Express API │ ───────────────► │ Supabase Postgres│
│  (Vite)     │  VITE_API_BASE_URL │  + backend   │   DATABASE_URL   │  (public schema) │
└─────────────┘                    └──────────────┘                  └──────────────────┘
```

Do **not** put the Supabase `anon` or `service_role` keys in the frontend for these tables. All reads/writes go through your API.

---

## Step 1 — Create or open the Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Open project **queens-banquet** (or create a new project).
3. Wait until the database status is healthy / ready.

---

## Step 2 — Copy the Postgres connection string

1. In the dashboard: **Project Settings** → **Database**.
2. Under **Connection string**, choose **URI**.
3. Prefer **Session mode** (port `5432`) for migrations and local API use.  
   Transaction pooler (port `6543`) can also work for the API, but Session mode is simpler for `npm run db:migrate`.
4. Copy the URI. It looks like:

```text
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

or (direct):

```text
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

5. Replace `[YOUR-PASSWORD]` with the database password you set when creating the project.  
   If you forgot it: **Database** → **Reset database password**.

---

## Step 3 — Configure environment variables

From the repo root:

```bash
cp .env.example .env
```

Edit `.env` and set at least:

```env
# Supabase Postgres (paste your URI from Step 2)
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres

# Optional: force TLS (auto-enabled when URL contains supabase.co / supabase.com)
DATABASE_SSL=true

# API
PORT=4000
CORS_ORIGIN=http://localhost:5174
ADMIN_JWT_SECRET=use-a-long-random-secret-here

# Seed / default admin account (used by npm run db:seed)
ADMIN_EMAIL=queensbanquet07@gmail.com
ADMIN_PASSWORD=marou-admin
ADMIN_NAME=Marou Madrid

# Frontend → API
VITE_API_BASE_URL=http://localhost:4000
```

Notes:

- Never commit `.env` (it is gitignored).
- `DATABASE_SSL` is optional; SSL turns on automatically for Supabase hosts.
- Change `ADMIN_JWT_SECRET` and `ADMIN_PASSWORD` before production.

---

## Step 4 — Install dependencies

From the repo root:

```bash
npm install
```

---

## Step 5 — Run migrations on Supabase

This creates tables: `admin_users`, `landing_content`, `event_inquiries`, `event_packages`, etc.

```bash
npm run db:migrate
```

Expected output includes lines like:

```text
Applied 001_create_inquiries.sql
Applied 002_add_meeting_fields_to_inquiries.sql
Applied 003_create_landing_content_and_admin.sql
Migrations complete.
```

### Verify in Supabase

1. Dashboard → **Table Editor** (or **SQL Editor**).
2. Confirm tables exist under the `public` schema.

Optional SQL check:

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

---

## Step 6 — Seed admin user + default content

```bash
npm run db:seed
```

This upserts:

- Admin login: `ADMIN_EMAIL` / `ADMIN_PASSWORD` (defaults above)
- Default `landing_content` row
- Sample `event_packages` rows

---

## Step 7 — Start the API against Supabase

```bash
npm run dev:api
```

Health check:

```bash
curl http://localhost:4000/health
```

You should see:

```json
{
  "status": "ok",
  "service": "queens-banquet-api",
  "databaseConnected": true
}
```

If `databaseConnected` is `false` or the request fails, re-check `DATABASE_URL`, password, and SSL.

---

## Step 8 — Start the frontend

In a second terminal:

```bash
npm run dev
```

Open:

- Landing: [http://localhost:5174](http://localhost:5174)
- Admin: [http://localhost:5174/admin](http://localhost:5174/admin)

Sign in with the seeded admin email/password.  
Saving content and inquiries should now persist in Supabase (when the API is running and `VITE_API_BASE_URL` is set).

---

## Step 9 — Confirm end-to-end

| Action | Where to verify |
|---|---|
| Admin login | API `POST /admin/login` succeeds |
| Save landing content | Supabase → `landing_content` updates |
| Submit contact form | Supabase → `event_inquiries` new row |
| List inquiries in admin | Admin → Inquiries panel |

---

## Security checklist (recommended)

Supabase exposes the `public` schema through its Data API (`anon` key). This app does not need that for these tables.

1. Dashboard → **Authentication** / **API** settings: keep keys private; do not add them to the frontend for table access.
2. Dashboard → **SQL Editor** — enable Row Level Security on app tables (blocks public REST access while your API still works with the Postgres connection string):

```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;

ALTER TABLE admin_users FORCE ROW LEVEL SECURITY;
ALTER TABLE landing_content FORCE ROW LEVEL SECURITY;
ALTER TABLE event_inquiries FORCE ROW LEVEL SECURITY;
ALTER TABLE event_packages FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE admin_users FROM anon, authenticated;
REVOKE ALL ON TABLE landing_content FROM anon, authenticated;
REVOKE ALL ON TABLE event_inquiries FROM anon, authenticated;
REVOKE ALL ON TABLE event_packages FROM anon, authenticated;
```

3. Check **Database → Security Advisor** after applying.
4. Use a strong `ADMIN_JWT_SECRET` and rotate the DB password if it was ever shared.

Your Node API uses `DATABASE_URL` (postgres role) and continues to work with RLS enabled.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `password authentication failed` | Reset DB password in Supabase; update `DATABASE_URL` |
| `SSL / self-signed certificate` | Ensure URL is Supabase (auto SSL) or set `DATABASE_SSL=true` |
| `ENOTFOUND` / timeout | Use Session pooler URI; confirm project is not paused |
| Migrations skip everything | Tables already applied — check `schema_migrations` in Table Editor |
| Frontend still uses localStorage only | Set `VITE_API_BASE_URL=http://localhost:4000` and restart `npm run dev` |
| Admin login fails after seed | Re-run `npm run db:seed`; confirm email/password in `.env` |
| CORS errors | Add your frontend origin to `CORS_ORIGIN` (comma-separated if multiple) |

---

## Local Docker vs Supabase

| Mode | `DATABASE_URL` | When to use |
|---|---|---|
| Local Docker | `postgresql://queensbanquet:queensbanquet@localhost:5432/queensbanquet` | Offline / quick local demos (`npm run db:setup`) |
| Supabase | Connection URI from dashboard | Shared cloud DB, staging, production |

Switch by changing `DATABASE_URL` in `.env`, then migrate/seed if the target database is empty.

---

## Useful commands (cheat sheet)

```bash
# From repo root, with .env pointing at Supabase
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev
```

Health:

```bash
curl http://localhost:4000/health
```

---

## Related files

| File | Role |
|---|---|
| `.env` / `.env.example` | `DATABASE_URL`, API, admin seed |
| `backend/src/db/pool.js` | Postgres pool (+ SSL for Supabase) |
| `database/scripts/migrate.js` | Applies SQL migrations |
| `database/scripts/seed.js` | Admin user + default content |
| `database/migrations/` | Schema history |
| `api/src/index.js` | Express API entry |
| `frontend/src/api/*` | Browser → API clients |

## Production (Vercel live site)

Local setup is not enough for the deployed site. Follow:

**→ [DEPLOY.md](./DEPLOY.md)**

You will deploy the API (e.g. Render), then set `VITE_API_BASE_URL` on Vercel to that API URL and redeploy the frontend.
