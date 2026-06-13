# Student Learning Dashboard

A premium, futuristic Student Learning Dashboard built with **Next.js 15 App Router**, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Tech Stack

- **Next.js 15** — App Router, Server Components, file-system routing
- **TypeScript** — strict typing throughout
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — all animations (stagger, spring physics, layoutId)
- **Lucide React** — icons
- **Supabase** — PostgreSQL database (optional — falls back to mock data)
- **Recharts** — analytics bar chart

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials (optional — app works without them using mock data):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Supabase (optional)

If you want live data from Supabase, create a `courses` table:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  description text not null default '',
  lessons_completed integer not null default 0,
  total_lessons integer not null default 10,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Seed sample data
insert into courses (title, progress, icon_name, description, lessons_completed, total_lessons) values
  ('Advanced React Patterns', 78, 'Code2', 'Master advanced React concepts including compound components, render props, and custom hooks.', 8, 10),
  ('Next.js Mastery', 45, 'Layers', 'Build production-ready apps with Next.js 15 App Router and server components.', 5, 12),
  ('UI Animation Fundamentals', 92, 'Sparkles', 'Implement stunning animations with Framer Motion, CSS transitions, and GSAP.', 11, 12),
  ('TypeScript Essentials', 31, 'FileType', 'Deep dive into TypeScript generics, conditional types, and mapped types.', 4, 13);
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout with sidebar + mobile nav
├── page.tsx            # Dashboard (Server Component — fetches summary + courses)
├── loading.tsx         # Global skeleton loader
├── error.tsx           # Global error boundary
├── courses/            # Courses page with search + animated modal
├── achievements/       # Achievement badge wall
├── analytics/          # Recharts bar chart + animated counters
├── profile/            # User profile card
└── settings/           # Accent color selector + notification toggles

components/
├── layout/
│   ├── sidebar.tsx     # Collapsible desktop sidebar with Framer Motion layoutId
│   └── mobile-nav.tsx  # Hamburger mobile navigation
└── dashboard/
    ├── dashboard-client.tsx
    ├── courses-client.tsx
    ├── achievements-client.tsx
    ├── analytics-client.tsx
    ├── profile-client.tsx
    └── settings-client.tsx

lib/supabase/
├── client.ts           # Browser Supabase client
└── server.ts           # Server-side Supabase client

services/               # Data fetching (Supabase or mock fallback)
types/index.ts          # TypeScript interfaces (Course, User, Achievement, Analytics)
hooks/use-counter.ts    # Animated number counter hook
```

## Features

- **Dark mode only** — deep near-black backgrounds with glassmorphism cards
- **Responsive** — desktop sidebar → tablet icon-only → mobile hamburger
- **Animated sidebar** — `layoutId` active indicator with spring transitions
- **Bento grid** — multi-column responsive dashboard layout
- **Activity heatmap** — GitHub-style 52-week contribution graph
- **Course modal** — animated `AnimatePresence` overlay with course detail
- **Animated counters** — easeOutQuart number animations on Analytics page
- **Accent color switcher** — live CSS variable update (Purple/Blue/Green/Orange)
- **Server Components** — all pages are async Server Components; client components only where interactivity is needed
- **Graceful fallback** — all data services fall back to mock data when Supabase is not configured
