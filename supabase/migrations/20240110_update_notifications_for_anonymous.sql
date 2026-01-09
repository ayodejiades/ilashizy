-- Update notifications table to support anonymous guests

-- Step 1: Make recipient_id nullable and add anonymous_recipient_id
ALTER TABLE notifications 
  ALTER COLUMN recipient_id DROP NOT NULL;

ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS anonymous_recipient_id UUID REFERENCES anonymous_guests(id) ON DELETE CASCADE;

-- Step 2: Add constraint to ensure either recipient_id or anonymous_recipient_id is set
ALTER TABLE notifications
  DROP CONSTRAINT IF EXISTS check_notification_recipient_type;

ALTER TABLE notifications
  ADD CONSTRAINT check_notification_recipient_type 
  CHECK (
    (recipient_id IS NOT NULL AND anonymous_recipient_id IS NULL) OR 
    (recipient_id IS NULL AND anonymous_recipient_id IS NOT NULL)
  );

-- Step 3: Create index for anonymous guest notifications
CREATE INDEX IF NOT EXISTS idx_notifications_anonymous_recipient_id 
  ON notifications(anonymous_recipient_id);

-- Step 4: Drop old RLS policy
DROP POLICY IF EXISTS "Users can manage their own notifications" ON notifications;

-- Step 5: Create new RLS policies

-- Authenticated users can manage their own notifications
CREATE POLICY "Authenticated users can manage own notifications"
  ON notifications
  FOR ALL
  USING (auth.uid() = recipient_id);

-- Anonymous guests can manage their own notifications
CREATE POLICY "Anonymous guests can manage own notifications"
  ON notifications
  FOR ALL
  USING (anonymous_recipient_id IS NOT NULL);

-- Service providers can create notifications for any user (for booking updates)
CREATE POLICY "Service providers can create notifications"
  ON notifications
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM places 
      WHERE places.provider_id = auth.uid()
    )
  );
