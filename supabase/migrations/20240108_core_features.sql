-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name
  color TEXT, -- Tailwind gradient classes
  svg TEXT, -- Path to custom SVG
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create places table (where activities happen)
CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  activity_id TEXT REFERENCES activities(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  image TEXT,
  description TEXT,
  opening_time TEXT,
  price TEXT,
  is_free BOOLEAN DEFAULT false,
  contact TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'booking', 'account', 'community', etc.
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  link TEXT, -- Optional link to redirect user
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for activities
CREATE POLICY "Activities are public" ON activities FOR SELECT USING (true);

-- Policies for places
CREATE POLICY "Places are public" ON places FOR SELECT USING (true);
CREATE POLICY "Providers can manage their places" ON places
  FOR ALL USING (auth.uid() = provider_id);

-- Policies for notifications
CREATE POLICY "Users can manage their own notifications" ON notifications
  FOR ALL USING (auth.uid() = recipient_id);

-- Seed initial activities
INSERT INTO activities (id, title, description, icon, color, svg) VALUES
('surfing', 'Surfing', 'Ride the waves of the Atlantic. Perfect for beginners and pros alike.', 'Waves', 'from-teal-400 to-blue-500', '/svgs/Surfing.svg'),
('canoeing', 'Canoeing', 'Paddle through the serene lagoon waters and explore the mangroves.', 'Ship', 'from-cyan-400 to-blue-500', '/svgs/Canoeing.svg'),
('photography', 'Photography', 'Capture the stunning golden hour, vibrant culture, and scenic landscapes.', 'Camera', 'from-purple-400 to-pink-500', '/svgs/Photography.svg'),
('diving', 'Diving', 'Explore the underwater world and discover marine life off the coast.', 'Anchor', 'from-blue-500 to-indigo-600', '/svgs/Diving.svg'),
('fishing', 'Fishing', 'Join local fishermen or charter a boat for a deep-sea fishing adventure.', 'Fish', 'from-sky-400 to-blue-600', '/svgs/Fishing.svg'),
('beach-walks', 'Beach Walks', 'Take long, peaceful strolls along the pristine white sands of Ilashe.', 'Footprints', 'from-amber-300 to-orange-500', '/svgs/BeachWalks.svg'),
('picnicking', 'Picnicking', 'Enjoy a delicious meal with friends and family in a beautiful beach setting.', 'Utensils', 'from-green-400 to-emerald-600', '/svgs/Picnicking.svg'),
('meditation', 'Meditation', 'Find your inner peace with sunrise or sunset meditation sessions by the ocean.', 'Flower2', 'from-violet-400 to-fuchsia-500', '/svgs/Meditation.svg'),
('kayaking', 'Kayaking', 'Navigate the waterways at your own pace in a single or double kayak.', 'Ship', 'from-yellow-400 to-orange-500', '/svgs/Kayaking.svg'),
('snorkeling', 'Snorkeling', 'Swim on the surface and observe the fascinating sea life below.', 'LifeBuoy', 'from-pink-400 to-rose-500', '/svgs/Snorkeling.svg'),
('kite-surfing', 'Kite Surfing', 'Harness the power of the wind for an adrenaline-pumping experience.', 'Waves', 'from-teal-300 to-emerald-500', '/svgs/Kite-surfing.svg'),
('horse-riding', 'Horse Riding', 'Experience the freedom of riding a horse along the shoreline.', 'Ship', 'from-cyan-300 to-sky-500', '/svgs/Horseriding.svg');
