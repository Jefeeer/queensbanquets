# Go live: Vercel frontend + API + Supabase

Your frontend is already on Vercel. To make admin saves, login, and contact forms use Supabase in production you need:

```text
Browser (Vercel site)
    →  VITE_API_BASE_URL  →  Express API (Render / Railway / Fly)
    →  DATABASE_URL       →  Supabase Postgres
```

The Vercel site **cannot** talk to Supabase tables directly with this architecture. It must call your API.

---

## Checklist overview

1. Confirm Supabase has migrations + seed (already done locally).
2. Deploy the **API** to a host that runs Node 24/7 (Render recommended below).
3. Set API env vars (`DATABASE_URL`, `CORS_ORIGIN`, `ADMIN_JWT_SECRET`, …).
4. Set `VITE_API_BASE_URL` on **Vercel** to your live API URL.
5. Redeploy the frontend.
6. Test login, Save, and contact form against Supabase.

---

## Step 1 — Supabase (already set up)

You should already have:

- Tables: `admin_users`, `landing_content`, `event_inquiries`, …
- Seeded admin user
- Connection URI working locally

If unsure, in Supabase **Table Editor** confirm those tables exist.

Use the **Session pooler** URI for cloud hosts if the direct `db.*.supabase.co` connection fails (common on free PaaS):

**Supabase → Project Settings → Database → Connection string → URI → Session mode**

---

## Step 2 — Deploy the API (Render)

### 2a. Create a Render account

1. Go to [https://render.com](https://render.com) and sign up (GitHub login is fine).
2. Connect the `queens-banquet` GitHub repo.

### 2b. New Web Service

1. **New → Web Service**
2. Select the repo
3. Settings:

| Field | Value |
|---|---|
| Name | `queens-banquet-api` |
| Region | Singapore (or closest to you) |
| Runtime | Node |
| Root Directory | *(leave empty — monorepo root)* |
| Build Command | `npm install` |
| Start Command | `npm run start --workspace api` |
| Instance | Free |

### 2c. Environment variables (Render → Environment)

Add these (use your real values):

```env
DATABASE_URL=postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
DATABASE_SSL=true
PORT=4000
NODE_ENV=production
ADMIN_JWT_SECRET=generate-a-long-random-string-here
ADMIN_EMAIL=queensbanquet07@gmail.com
ADMIN_PASSWORD=marou-admin
ADMIN_NAME=Marou Madrid
CORS_ORIGIN=https://YOUR-VERCEL-DOMAIN.vercel.app
```

Notes:

- Replace `CORS_ORIGIN` with your real Vercel URL (no trailing slash).  
  If you have a custom domain too:  
  `CORS_ORIGIN=https://yourdomain.com,https://YOUR-VERCEL-DOMAIN.vercel.app`
- Prefer the **Supabase Session pooler** URI for `DATABASE_URL` on Render.
- Change `ADMIN_JWT_SECRET` and consider changing `ADMIN_PASSWORD` for production.

### 2d. Deploy

Click **Create Web Service** and wait until it’s live.

Your API URL will look like:

```text
https://queens-banquet-api.onrender.com
```

### 2e. Health check

Open in a browser or run:

```bash
curl https://queens-banquet-api.onrender.com/health
```

Expect:

```json
{"status":"ok","service":"queens-banquet-api","databaseConnected":true}
```

> Free Render services sleep after inactivity. First request after sleep can take ~30–60s.

---

## Step 3 — Point Vercel frontend at the live API

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your Queens Banquet project.
2. **Settings → Environment Variables**
3. Add:

| Name | Value | Environments |
|---|---|---|
| `VITE_API_BASE_URL` | `https://queens-banquet-api.onrender.com` | Production (and Preview if you want) |

**No trailing slash.**

4. **Deployments → … on the latest → Redeploy**  
   (Required: Vite bakes env vars in at **build** time.)

Or push a commit to trigger a new deploy after saving the env var.

---

## Step 4 — Verify production end-to-end

| Test | How |
|---|---|
| Health | `https://YOUR-API.onrender.com/health` → `databaseConnected: true` |
| Landing loads | Open your Vercel URL |
| Admin login | `https://YOUR-VERCEL-URL/admin` with seeded email/password |
| Save content | Admin → Packages → Save → toast **Saved to the database** |
| Supabase | `landing_content` → `content` JSON updated |
| Contact form | Submit on live site → new row in `event_inquiries` |

If the toast still says “Saved locally”, the frontend build did not pick up `VITE_API_BASE_URL` — redeploy after setting the env var.

If login fails with CORS, add the exact Vercel origin to API `CORS_ORIGIN` and restart/redeploy the API.

---

## Step 5 — Production security (recommended)

1. Strong `ADMIN_JWT_SECRET` (32+ random characters).
2. Strong admin password (update via Account Security in admin, or re-seed with new `ADMIN_PASSWORD`).
3. In Supabase SQL Editor, keep RLS enabled / revoke `anon` on app tables (see [supabase.md](./supabase.md)).
4. Do not put Supabase DB password or `service_role` key in Vercel frontend env vars.
5. Only `VITE_API_BASE_URL` belongs on Vercel for this app.

---

## Alternatives to Render

| Host | Notes |
|---|---|
| [Railway](https://railway.app) | Connect repo → set start `npm run start --workspace api` → same env vars |
| [Fly.io](https://fly.io) | Good for always-on; needs `fly.toml` |
| Vercel Serverless | Possible but needs Express→serverless adapter; not set up in this repo |

---

## Local vs production env summary

| Variable | Local `.env` | Render (API) | Vercel (frontend) |
|---|---|---|---|
| `DATABASE_URL` | Yes | Yes | No |
| `DATABASE_SSL` | Optional | `true` | No |
| `ADMIN_JWT_SECRET` | Yes | Yes | No |
| `CORS_ORIGIN` | `http://localhost:5174` | Your Vercel URL(s) | No |
| `VITE_API_BASE_URL` | `http://localhost:4000` | No | Your Render API URL |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `databaseConnected: false` on Render | Use Session pooler URI; confirm password; set `DATABASE_SSL=true` |
| CORS error in browser console | Set `CORS_ORIGIN` to exact Vercel origin(s), redeploy API |
| Still “Saved locally” on live site | Set `VITE_API_BASE_URL` on Vercel and **redeploy** frontend |
| Admin login 401 | Seed ran on this Supabase project; check email/password |
| Render cold start timeout | Retry after ~1 minute; upgrade plan if needed |
| Contact form fails | Same as API URL / CORS issues |

---

## Quick command reference

```bash
# Confirm API (replace with your Render URL)
curl https://queens-banquet-api.onrender.com/health

# After changing Vercel env, redeploy from dashboard or:
git commit --allow-empty -m "chore: trigger vercel redeploy"
git push
```

---

## Related docs

- [supabase.md](./supabase.md) — database connection & migrations  
- [README.md](./README.md) — local development  
- [api/README.md](./api/README.md) — API endpoints  
