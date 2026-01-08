-- Create tips table
CREATE TABLE IF NOT EXISTS tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tip_likes table (to prevent double liking)
CREATE TABLE IF NOT EXISTS tip_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tip_id UUID REFERENCES tips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tip_id, user_id)
);

-- Enable RLS
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE tip_likes ENABLE ROW LEVEL SECURITY;

-- Policies for tips
CREATE POLICY "Tips are public" ON tips FOR SELECT USING (true);
CREATE POLICY "Anyone can post tips" ON tips FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can edit their own tips" ON tips FOR UPDATE USING (auth.uid() = user_id);

-- Policies for likes
CREATE POLICY "Likes are public" ON tip_likes FOR SELECT USING (true);
CREATE POLICY "Anyone can like tips" ON tip_likes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can unlike tips" ON tip_likes FOR DELETE USING (auth.uid() = user_id);

-- Function to update likes count
CREATE OR REPLACE FUNCTION update_tip_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE tips SET likes_count = likes_count + 1 WHERE id = NEW.tip_id;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE tips SET likes_count = likes_count - 1 WHERE id = OLD.tip_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for likes count
CREATE TRIGGER trigger_update_tip_likes_count
AFTER INSERT OR DELETE ON tip_likes
FOR EACH ROW EXECUTE FUNCTION update_tip_likes_count();
