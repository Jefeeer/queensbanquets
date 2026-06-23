# Queen's Banquet Events API

HTTP API layer prepared for future website integration.

## Current Endpoint

- `GET /health` - service health check.
- `POST /inquiries` - validates and accepts coordination meeting request payloads with contact, event, guest, and preferred meeting details.

## Structure

- `src/routes` - Express route definitions.
- `src/controllers` - request and response orchestration.
- `src/schemas` - request validation with Zod.
- `src/services` - API-level service adapters.
