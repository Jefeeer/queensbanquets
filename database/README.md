# Queen's Banquet Events Database

This directory prepares the data layer for future integration. The SQL is written to be portable for PostgreSQL-oriented deployments.

## Contents

- `schema.sql` - current target schema snapshot.
- `migrations/001_create_inquiries.sql` - starter migration for inquiry capture.
- `migrations/002_add_meeting_fields_to_inquiries.sql` - meeting request fields for coordination bookings.
- `seeds/sample_events.sql` - optional sample coordination package records for local development.

## Future Tables

- `event_inquiries` - contact form submissions and meeting requests.
- `event_packages` - coordination package cards such as Ivory Guidance, Golden Coordination, and Royal Full Coordination.
- `gallery_items` - image or media records for coordination moments and client proof.
- `meeting_schedules` - optional consultation availability for booking flows.
