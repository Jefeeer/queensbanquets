# Queen's Banquet Events Frontend

React/Vite landing page for Queen's Banquet Events wedding and event coordination.

## Local URLs

- Development: `http://localhost:5174`
- Hidden admin: `http://localhost:5174/admin`
- Production preview: `http://localhost:4174`

Keep `npm run dev` running while editing. Vite hot-reloads code and style changes, and saved admin edits sync automatically to open landing-page tabs through browser local storage events.

The admin page is not linked from the landing page. Temporary local admin credentials can be configured with `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`.

Default local credentials:

```text
Email: queensbanquet07@gmail.com
Password: marou-admin
```

## Key Directories

- `src/components` - page sections and reusable UI components.
- `src/data` - editable content for navigation, packages, services, and contact channels.
- `src/api` - frontend API integration boundary.
- `src/styles` - global visual system and responsive layout.

## Environment

Set `VITE_API_BASE_URL` when the API is deployed:

```bash
VITE_API_BASE_URL=https://api.example.com npm run dev
```
