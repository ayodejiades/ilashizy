-- Create anonymous_guests table for tracking guests without authentication
CREATE TABLE IF NOT EXISTS anonymous_guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fingerprint TEXT UNIQUE NOT NULL,  -- Browser fingerprint for session persistence
  display_name TEXT,                  -- Optional name provided by guest
  phone TEXT,                         -- Optional phone for bookings
  email TEXT,                         -- Optional email for notifications
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster fingerprint lookups
CREATE INDEX IF NOT EXISTS idx_anonymous_guests_fingerprint ON anonymous_guests(fingerprint);

-- Enable Row Level Security
ALTER TABLE anonymous_guests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anonymous guests can view their own record by fingerprint
CREATE POLICY "Anonymous guests can view own record"
  ON anonymous_guests
  FOR SELECT
  USING (true);  -- We'll handle fingerprint matching in application layer

-- Anonymous guests can insert their own record
CREATE POLICY "Anonymous guests can create record"
  ON anonymous_guests
  FOR INSERT
  WITH CHECK (true);

-- Anonymous guests can update their own record
CREATE POLICY "Anonymous guests can update own record"
  ON anonymous_guests
  FOR UPDATE
  USING (true);

-- Function to update last_seen timestamp
CREATE OR REPLACE FUNCTION update_anonymous_guest_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_seen = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_seen on any update
CREATE TRIGGER trigger_update_anonymous_guest_last_seen
  BEFORE UPDATE ON anonymous_guests
  FOR EACH ROW
  EXECUTE FUNCTION update_anonymous_guest_last_seen();
