# Queen's Banquet Events

Queen's Banquet Events is an elegant wedding and event coordination landing-page system designed with a black, gold, and ivory palette. The repository is structured for a React frontend today and future API, backend, and database integration.

## System Structure

```text
.
├── frontend/   # React landing page built with Vite
├── api/        # Future HTTP API layer: routes, controllers, schemas, services
├── backend/    # Future business logic, jobs, notifications, shared services
├── database/   # SQL schema, migrations, and seed data
└── docs/       # Architecture documentation
```

## Getting Started

Install dependencies and run the landing page:

```bash
npm install
npm run dev
```

The frontend app runs from `frontend/` at `http://localhost:5174` and is ready to connect to the API layer when backend services are implemented.

## Admin Page

The admin page is hidden from the landing page navigation and can be opened directly:

```text
http://localhost:5174/admin
```

Temporary local credentials are controlled by `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`. Until backend authentication and database persistence are added, admin edits are saved in the browser's local storage.

Default local credentials:

```text
Email: queensbanquet07@gmail.com
Password: marou-admin
```

## Available Scripts

- `npm run dev` - start the React landing page locally on port `5174`.
- `npm run build` - build the frontend for production.
- `npm run preview` - preview the production frontend build on port `4174`.

## Future Integration Notes

- Frontend contact/event inquiry submissions are centralized in `frontend/src/api/inquiries.js`.
- API request validation and controller boundaries are prepared in `api/src`.
- Backend notification and event-service boundaries are prepared in `backend/src`.
- Database tables and starter migration scripts live in `database/`.
