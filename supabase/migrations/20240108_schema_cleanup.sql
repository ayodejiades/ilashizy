-- Add availability column to places
ALTER TABLE places ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;

-- Update place_bookings to include foreign key to places
-- (Assuming we might have orphaned bookings, we won't force it if data exists, but for a new project it's better)
ALTER TABLE place_bookings 
  ADD CONSTRAINT fk_place_bookings_place 
  FOREIGN KEY (place_id) 
  REFERENCES places(id) 
  ON DELETE CASCADE;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_places_provider_id ON places(provider_id);
CREATE INDEX IF NOT EXISTS idx_place_bookings_place_id ON place_bookings(place_id);
