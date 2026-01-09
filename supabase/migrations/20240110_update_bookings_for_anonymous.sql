-- Update place_bookings to support both authenticated users and anonymous guests
-- This migration modifies the existing table structure

-- Step 1: Make user_id nullable and add anonymous_guest_id
ALTER TABLE place_bookings 
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE place_bookings
  ADD COLUMN IF NOT EXISTS anonymous_guest_id UUID REFERENCES anonymous_guests(id) ON DELETE CASCADE;

-- Step 2: Add guest contact information columns
ALTER TABLE place_bookings
  ADD COLUMN IF NOT EXISTS guest_name TEXT,
  ADD COLUMN IF NOT EXISTS guest_contact TEXT;

-- Step 3: Add constraint to ensure either user_id or anonymous_guest_id is set
ALTER TABLE place_bookings
  DROP CONSTRAINT IF EXISTS check_booking_user_type;

ALTER TABLE place_bookings
  ADD CONSTRAINT check_booking_user_type 
  CHECK (
    (user_id IS NOT NULL AND anonymous_guest_id IS NULL) OR 
    (user_id IS NULL AND anonymous_guest_id IS NOT NULL)
  );

-- Step 4: Create index for anonymous guest bookings
CREATE INDEX IF NOT EXISTS idx_place_bookings_anonymous_guest_id 
  ON place_bookings(anonymous_guest_id);

-- Step 5: Drop old RLS policies
DROP POLICY IF EXISTS "Users can view own bookings" ON place_bookings;
DROP POLICY IF EXISTS "Users can create own bookings" ON place_bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON place_bookings;
DROP POLICY IF EXISTS "Users can delete own bookings" ON place_bookings;

-- Step 6: Create new RLS policies that support both user types

-- Authenticated users can view their own bookings
CREATE POLICY "Authenticated users can view own bookings"
  ON place_bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Anonymous guests can view their own bookings (handled in application layer)
CREATE POLICY "Anonymous guests can view own bookings"
  ON place_bookings
  FOR SELECT
  USING (anonymous_guest_id IS NOT NULL);

-- Service providers can view bookings for their places
CREATE POLICY "Providers can view bookings for their places"
  ON place_bookings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM places 
      WHERE places.id = place_bookings.place_id 
      AND places.provider_id = auth.uid()
    )
  );

-- Authenticated users can create their own bookings
CREATE POLICY "Authenticated users can create own bookings"
  ON place_bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anonymous guests can create bookings
CREATE POLICY "Anonymous guests can create bookings"
  ON place_bookings
  FOR INSERT
  WITH CHECK (anonymous_guest_id IS NOT NULL AND user_id IS NULL);

-- Authenticated users can update their own bookings
CREATE POLICY "Authenticated users can update own bookings"
  ON place_bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Anonymous guests can update their own bookings
CREATE POLICY "Anonymous guests can update own bookings"
  ON place_bookings
  FOR UPDATE
  USING (anonymous_guest_id IS NOT NULL);

-- Service providers can update bookings for their places (status changes)
CREATE POLICY "Providers can update bookings for their places"
  ON place_bookings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM places 
      WHERE places.id = place_bookings.place_id 
      AND places.provider_id = auth.uid()
    )
  );

-- Authenticated users can delete their own bookings
CREATE POLICY "Authenticated users can delete own bookings"
  ON place_bookings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Anonymous guests can delete their own bookings
CREATE POLICY "Anonymous guests can delete own bookings"
  ON place_bookings
  FOR DELETE
  USING (anonymous_guest_id IS NOT NULL);
