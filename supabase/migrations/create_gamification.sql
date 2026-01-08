-- Create badges table
create table public.badges (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  icon text not null, -- Name of the Lucide icon or visual asset
  criteria_type text not null, -- e.g., 'booking_count', 'review_count'
  criteria_value integer not null, -- e.g., 1, 5, 10
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_badges table
create table public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  badge_id uuid references public.badges not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, badge_id)
);

-- RLS Policies
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- Badges are readable by everyone
create policy "Badges are public"
  on public.badges for select
  using (true);

-- User badges are readable by everyone (social proof)
create policy "User badges are public"
  on public.user_badges for select
  using (true);

-- Only system/service_role can insert badges (for now) or via seed
-- We'll allow authenticated users to *read* their own potential badges? No, just read all.

-- Seed initial badges
insert into public.badges (name, description, icon, criteria_type, criteria_value) values
  ('First Wave', 'Completed your first activity booking!', 'Waves', 'booking_count', 1),
  ('Island Explorer', 'Booked 3 distinct activities.', 'Compass', 'booking_count', 3),
  ('Community Pillar', 'Posted 5 reviews.', 'Heart', 'review_count', 5),
  ('Early Bird', 'Booked a morning activity.', 'Sun', 'time_slot', 1);
