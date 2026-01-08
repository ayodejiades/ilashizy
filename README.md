# Ilashizy Platform

Ilashizy is a community-driven tourism platform for **Ilashe Beach**, Lagos. It connects guests with local service providers, offers real-time weather updates, and provides a curated list of beach activities.

## 🚀 Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Backend/Auth**: Supabase (PostgreSQL, Auth, RLS)
- **Icons**: Lucide React (Standardized via `ICON_MAP`)
- **Notifications**: Sonner (Toasts) + Real-time Database Notifications
- **I18n**: Custom Translation Hook (English & Yoruba supported)

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
  - `/(guest)`: Features for standard users (Activities, Profile, Dashboard).
  - `/provider`: Dashboard and tools for Service Providers.
  - `/auth`: Login, Signup, Password Reset, and Callback routes.
- `/components`: Reusable UI components.
  - `header.tsx`: Unified, auth-aware navigation and notification center.
  - `activity-card.tsx`: Visual card for activities/places with integrated i18n and icon mapping.
- `/lib`: Utility functions and shared logic.
  - `supabase/`: Server, Client, and Middleware initializers.
  - `translations.ts`: Central dictionary for English and Yoruba.
  - `use-translation.ts`: React hook for sitewide i18n.
- `/supabase/migrations`: SQL schema definitions and RLS policies.

## 🔑 Core Systems

### 1. Authentication & Roles
- Uses Supabase Auth with custom `profiles` table.
- Dual roles: `guest` and `service_provider`.
- Global Middleware (`middleware.ts`) handles session refreshing and prevents unauthorized access to protected routes (e.g., guests cannot access `/provider/*`).

### 2. Unified Header & Layout
- A single `<Header />` component is used on ALL pages. 
- Integrated `sonner` toasts for consistent feedback.
- Automatic redirection for unauthenticated users for protected features.

### 3. Internationalization (i18n)
- Centralized translation dictionary in `lib/translations.ts`.
- Activity names and descriptions are dynamically translated using their database IDs.
- **Yoruba Support**: Full coverage for navigation, activity statuses, and booking flows.

### 4. Database Schema
- `activities`: Master list of activity categories.
- `places`: Specific businesses/locations tagged to activities.
- `place_bookings`: Request/Confirm lifecycle for activity registration.
- `notifications`: Real-time alert system for bookings and interactions.
- `tips` & `tip_likes`: Community knowledge base with like tracking.

## 🛠️ Refactoring & Audit Wins (Completed)
- **Unified Middleware**: Consolidated conflicting middleware files into a single standard `middleware.ts`.
- **Real-time Search**: Connected homepage search to a dynamic search results page.
- **Provider Dashboard**: Implemented real DB fetching for places and pending bookings with Confirm/Decline actions.
- **Database Integrity**: Added missing foreign keys and availability columns to ensure data consistency.
- **Standardized UI**: Replaced local headers on all pages with the global `Header`.

## 🗺️ Future Roadmap
- [ ] **Dynamic SEO**: Implement dynamic metadata for individual activities and blog posts.
- [ ] **Gallery Storage**: Connect the gallery to Supabase Storage for community photo sharing.
- [ ] **Gamification**: Finalize the badge earning logic based on the existing `badges` table.

## 🛠️ Development
```bash
npm run dev        # Start development server
npm run build      # Production build
```
