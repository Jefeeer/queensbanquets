ALTER TABLE event_inquiries
  ADD COLUMN IF NOT EXISTS phone VARCHAR(60),
  ADD COLUMN IF NOT EXISTS preferred_meeting_date DATE,
  ADD COLUMN IF NOT EXISTS coordination_need VARCHAR(120);
