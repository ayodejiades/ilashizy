-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create activities table for beach activities
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'beginner',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create tips table for local knowledge
CREATE TABLE IF NOT EXISTS public.tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create gallery table for user photos
CREATE TABLE IF NOT EXISTS public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table for activity registrations
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_id uuid NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  participants INT DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles viewable by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Activities policies (read-only for community)
CREATE POLICY "Activities viewable by all" ON public.activities FOR SELECT USING (true);

-- Tips policies
CREATE POLICY "Tips viewable by all" ON public.tips FOR SELECT USING (true);
CREATE POLICY "Users can insert their own tips" ON public.tips FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own tips" ON public.tips FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own tips" ON public.tips FOR DELETE USING (auth.uid() = author_id);

-- Gallery policies
CREATE POLICY "Gallery photos viewable by all" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Users can upload their own photos" ON public.gallery FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own photos" ON public.gallery FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own photos" ON public.gallery FOR DELETE USING (auth.uid() = author_id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookings" ON public.bookings FOR DELETE USING (auth.uid() = user_id);
