-- Update tips and tip_likes tables to support anonymous guests

-- Step 1: Update tips table
ALTER TABLE tips 
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE tips
  ADD COLUMN IF NOT EXISTS anonymous_guest_id UUID REFERENCES anonymous_guests(id) ON DELETE CASCADE;

-- Add constraint to ensure either user_id or anonymous_guest_id is set
ALTER TABLE tips
  DROP CONSTRAINT IF EXISTS check_tip_user_type;

ALTER TABLE tips
  ADD CONSTRAINT check_tip_user_type 
  CHECK (
    (user_id IS NOT NULL AND anonymous_guest_id IS NULL) OR 
    (user_id IS NULL AND anonymous_guest_id IS NOT NULL)
  );

-- Create index for anonymous guest tips
CREATE INDEX IF NOT EXISTS idx_tips_anonymous_guest_id 
  ON tips(anonymous_guest_id);

-- Step 2: Update tip_likes table
ALTER TABLE tip_likes 
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE tip_likes
  ADD COLUMN IF NOT EXISTS anonymous_guest_id UUID REFERENCES anonymous_guests(id) ON DELETE CASCADE;

-- Add constraint to ensure either user_id or anonymous_guest_id is set
ALTER TABLE tip_likes
  DROP CONSTRAINT IF EXISTS check_tip_like_user_type;

ALTER TABLE tip_likes
  ADD CONSTRAINT check_tip_like_user_type 
  CHECK (
    (user_id IS NOT NULL AND anonymous_guest_id IS NULL) OR 
    (user_id IS NULL AND anonymous_guest_id IS NOT NULL)
  );

-- Update unique constraint to handle both user types
ALTER TABLE tip_likes
  DROP CONSTRAINT IF EXISTS tip_likes_tip_id_user_id_key;

-- Create partial unique indexes for each user type
CREATE UNIQUE INDEX IF NOT EXISTS tip_likes_tip_user_unique 
  ON tip_likes(tip_id, user_id) 
  WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS tip_likes_tip_anonymous_unique 
  ON tip_likes(tip_id, anonymous_guest_id) 
  WHERE anonymous_guest_id IS NOT NULL;

-- Create index for anonymous guest likes
CREATE INDEX IF NOT EXISTS idx_tip_likes_anonymous_guest_id 
  ON tip_likes(anonymous_guest_id);

-- Step 3: Drop old RLS policies for tips
DROP POLICY IF EXISTS "Tips are public" ON tips;
DROP POLICY IF EXISTS "Anyone can post tips" ON tips;
DROP POLICY IF EXISTS "Users can edit their own tips" ON tips;

-- Step 4: Create new RLS policies for tips

-- Tips are public (everyone can read)
CREATE POLICY "Tips are public"
  ON tips
  FOR SELECT
  USING (true);

-- Authenticated users can post tips
CREATE POLICY "Authenticated users can post tips"
  ON tips
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anonymous guests can post tips
CREATE POLICY "Anonymous guests can post tips"
  ON tips
  FOR INSERT
  WITH CHECK (anonymous_guest_id IS NOT NULL AND user_id IS NULL);

-- Authenticated users can edit their own tips
CREATE POLICY "Authenticated users can edit own tips"
  ON tips
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Anonymous guests can edit their own tips
CREATE POLICY "Anonymous guests can edit own tips"
  ON tips
  FOR UPDATE
  USING (anonymous_guest_id IS NOT NULL);

-- Step 5: Drop old RLS policies for tip_likes
DROP POLICY IF EXISTS "Likes are public" ON tip_likes;
DROP POLICY IF EXISTS "Anyone can like tips" ON tip_likes;
DROP POLICY IF EXISTS "Users can unlike tips" ON tip_likes;

-- Step 6: Create new RLS policies for tip_likes

-- Likes are public (everyone can read)
CREATE POLICY "Likes are public"
  ON tip_likes
  FOR SELECT
  USING (true);

-- Authenticated users can like tips
CREATE POLICY "Authenticated users can like tips"
  ON tip_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anonymous guests can like tips
CREATE POLICY "Anonymous guests can like tips"
  ON tip_likes
  FOR INSERT
  WITH CHECK (anonymous_guest_id IS NOT NULL AND user_id IS NULL);

-- Authenticated users can unlike their own likes
CREATE POLICY "Authenticated users can unlike tips"
  ON tip_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Anonymous guests can unlike their own likes
CREATE POLICY "Anonymous guests can unlike tips"
  ON tip_likes
  FOR DELETE
  USING (anonymous_guest_id IS NOT NULL);
