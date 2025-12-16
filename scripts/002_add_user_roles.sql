-- Add user_type column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN user_type TEXT DEFAULT 'tourist' CHECK (user_type IN ('tourist', 'service_provider'));

-- Create service_providers table
CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_description TEXT,
  business_type TEXT NOT NULL CHECK (business_type IN ('hotel', 'restaurant', 'transportation', 'tour_operator', 'equipment_rental', 'other')),
  contact_phone TEXT,
  contact_email TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create activity_availability table for service providers to toggle activities on/off
CREATE TABLE IF NOT EXISTS public.activity_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  available BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(service_provider_id, activity_id)
);

-- Create notifications table for booking alerts
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking_request', 'booking_confirmed', 'booking_cancelled')),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create reviews table for testimonials
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create activity_calendar table for seasonal events
CREATE TABLE IF NOT EXISTS public.activity_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  event_name TEXT NOT NULL,
  event_description TEXT,
  peak_season BOOLEAN DEFAULT FALSE,
  capacity_limit INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_type TEXT NOT NULL CHECK (contact_type IN ('police', 'ambulance', 'fire', 'coast_guard', 'lifeguard', 'tourist_police', 'hospital')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS on all new tables
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_providers
CREATE POLICY "Service providers can view own data" ON public.service_providers
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Service providers can update own data" ON public.service_providers
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view verified service providers" ON public.service_providers
  FOR SELECT USING (verified = TRUE);

-- RLS Policies for activity_availability
CREATE POLICY "Service providers can manage own activity availability" ON public.activity_availability
  FOR ALL USING (auth.uid() = service_provider_id);
CREATE POLICY "All users can view activity availability" ON public.activity_availability
  FOR SELECT USING (TRUE);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = recipient_id);

-- RLS Policies for reviews
CREATE POLICY "Users can view all reviews" ON public.reviews
  FOR SELECT USING (TRUE);
CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews
  FOR DELETE USING (auth.uid() = reviewer_id);

-- RLS Policies for activity_calendar
CREATE POLICY "All users can view activity calendar" ON public.activity_calendar
  FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage calendar" ON public.activity_calendar
  FOR ALL USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%@admin%'));

-- RLS Policies for emergency_contacts
CREATE POLICY "All users can view emergency contacts" ON public.emergency_contacts
  FOR SELECT USING (TRUE);
