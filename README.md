# Jeeva Oli Friends — Sports Club Platform

> **Production-grade Kabaddi club platform for Maniyambet's Jeeva Oli Friends.**
> Mobile-first · Next.js 15 · MongoDB · Tailwind CSS

---

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url> jeeva-oli
cd jeeva-oli
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local — set MONGODB_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS

# 3. Seed the database
npm run seed
# Creates admin user: admin / jof@admin2025

# 4. Run dev server
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin
```

---

## Architecture

```
jeeva-oli/
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── page.tsx              # Home
│   │   │   ├── tournament/           # Tournament list + detail
│   │   │   ├── schedule/             # Match schedule & results
│   │   │   ├── players/              # Squad roster
│   │   │   ├── gallery/              # Photo gallery
│   │   │   ├── register/             # Team registration form
│   │   │   ├── sponsors/             # Sponsorship interest
│   │   │   └── about/                # Club story
│   │   ├── admin/                    # Protected admin panel
│   │   │   ├── login/
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── tournaments/
│   │   │   ├── matches/
│   │   │   ├── players/
│   │   │   ├── registrations/
│   │   │   ├── sponsorships/
│   │   │   └── gallery/
│   │   └── api/                      # REST API routes
│   │       ├── auth/login/
│   │       ├── tournaments/[id]/
│   │       ├── matches/[id]/
│   │       ├── players/[id]/
│   │       ├── registrations/[id]/
│   │       ├── sponsorships/[id]/
│   │       └── gallery/[id]/
│   ├── components/
│   │   ├── layout/    # Navbar, Footer, BottomNav, Ticker
│   │   ├── home/      # HeroSection, StatsStrip, FeaturedTournament, ...
│   │   └── ...
│   ├── lib/
│   │   ├── db/connect.ts      # MongoDB singleton
│   │   ├── models/index.ts    # All Mongoose models
│   │   ├── auth.ts            # JWT utilities
│   │   ├── email.ts           # Nodemailer service
│   │   └── mockData.ts        # Dev seed data
│   └── types/index.ts         # Shared TypeScript types
└── scripts/
    └── seed.js                # Database seeder
```

---

## Design System

| Token       | Value               | Usage                     |
|-------------|---------------------|---------------------------|
| `--black`   | `#0A0A0A`           | Page background           |
| `--red`     | `#C0392B`           | Primary accent, CTAs      |
| `--gold`    | `#C9A227`           | Prize, highlights         |
| `--white`   | `#F5F5F0`           | Body text                 |
| Font Display | Teko               | Hero headings, numbers    |
| Font Heading | Bebas Neue         | Section titles            |
| Font Body    | DM Sans            | UI, forms, paragraphs     |
| Font Tamil   | Noto Sans Tamil    | Tamil text                |

---

## API Reference

### Public Endpoints
| Method | Endpoint                    | Description                 |
|--------|-----------------------------|-----------------------------|
| GET    | `/api/tournaments`          | List all tournaments        |
| GET    | `/api/tournaments/:id`      | Tournament detail           |
| GET    | `/api/matches`              | All matches (filterable)    |
| GET    | `/api/players`              | All players (filterable)    |
| GET    | `/api/gallery`              | Gallery images (paginated)  |
| POST   | `/api/registrations`        | Submit team registration    |
| POST   | `/api/sponsorships`         | Submit sponsorship interest |

### Admin-only (JWT required)
| Method | Endpoint                    | Description                 |
|--------|-----------------------------|-----------------------------|
| POST   | `/api/auth/login`           | Admin login → JWT cookie    |
| DELETE | `/api/auth/login`           | Logout                      |
| POST   | `/api/tournaments`          | Create tournament           |
| PATCH  | `/api/tournaments/:id`      | Update tournament           |
| DELETE | `/api/tournaments/:id`      | Delete tournament           |
| POST   | `/api/matches`              | Schedule match              |
| PATCH  | `/api/matches/:id`          | Update score/status         |
| POST   | `/api/players`              | Add player                  |
| PATCH  | `/api/players/:id`          | Edit player                 |
| GET    | `/api/registrations`        | View all registrations      |
| PATCH  | `/api/registrations/:id`    | Approve/reject registration |
| GET    | `/api/sponsorships`         | View sponsor enquiries      |
| PATCH  | `/api/sponsorships/:id`     | Update sponsor status       |
| POST   | `/api/gallery`              | Add gallery image           |
| DELETE | `/api/gallery/:id`          | Delete gallery image        |

---

## Environment Variables

```env
MONGODB_URI=mongodb+srv://...        # MongoDB connection string
JWT_SECRET=<min 32 chars>            # JWT signing secret
EMAIL_USER=your@gmail.com            # Gmail address
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx       # Gmail app password
ADMIN_EMAIL=admin@example.com        # Receives form notifications
CLOUDINARY_CLOUD_NAME=...            # Cloudinary (image CDN)
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_APP_URL=https://...      # Production URL
```

---

## Deployment (Vercel + MongoDB Atlas)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "feat: initial platform"
git remote add origin <github-url>
git push -u origin main

# 2. Import project on vercel.com
# 3. Set all env vars in Vercel dashboard
# 4. MongoDB Atlas: whitelist 0.0.0.0/0 for Vercel IPs
# 5. Run seed against Atlas: MONGODB_URI=<atlas-uri> npm run seed
```

---

## Phase 2 Roadmap

- [ ] Live match scoring via WebSocket
- [ ] Tamil / English language toggle
- [ ] WhatsApp registration notifications (Twilio)
- [ ] Tournament bracket visualizer
- [ ] Player statistics tracking
- [ ] Cloudinary direct upload widget in admin
- [ ] PWA manifest + offline support
- [ ] Analytics dashboard

---

**Built with ♥ for Kabaddi · Jeeva Oli Friends · Maniyambet**
