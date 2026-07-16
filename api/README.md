# Queen's Banquet Events API

Express API for landing content, admin authentication, and meeting requests.

## Endpoints

### Public

- `GET /health` - service and database health check
- `GET /content` - published landing page content
- `POST /inquiries` - save a meeting/contact request

### Admin

- `POST /admin/login` - admin sign in, returns JWT
- `GET /admin/me` - current admin profile
- `PUT /admin/content` - save landing content
- `POST /admin/content/reset` - restore default landing content
- `GET /admin/inquiries` - list meeting requests

## Run locally

```bash
cp ../.env.example ../.env
npm install
npm run db:setup   # local Docker — or use Supabase (see ../supabase.md)
npm run dev:api    # from repo root
# or, from this workspace:
npm run dev
```

Default URL: `http://localhost:4000`

### Supabase

Point root `.env` `DATABASE_URL` at your Supabase Postgres URI, then:

```bash
npm run db:migrate
npm run db:seed
npm run dev:api
```

Step-by-step: **[../supabase.md](../supabase.md)**

## Structure

- `src/routes` - Express route definitions
- `src/controllers` - request handlers
- `src/schemas` - Zod validation
- `src/middleware` - admin auth middleware

Business logic and PostgreSQL access live in `@queens-banquet/backend`.
