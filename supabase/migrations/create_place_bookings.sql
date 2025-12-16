-- Create place_bookings table
CREATE TABLE IF NOT EXISTS place_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  place_id INTEGER NOT NULL,
  activity_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  number_of_people INTEGER DEFAULT 1 CHECK (number_of_people > 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_place_bookings_user_id ON place_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_place_bookings_status ON place_bookings(status);
CREATE INDEX IF NOT EXISTS idx_place_bookings_date ON place_bookings(booking_date);

-- Enable Row Level Security
ALTER TABLE place_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON place_bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings"
  ON place_bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings"
  ON place_bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own bookings
CREATE POLICY "Users can delete own bookings"
  ON place_bookings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_place_bookings_updated_at
  BEFORE UPDATE ON place_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
