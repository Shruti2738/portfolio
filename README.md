# Shruti Ravikumar — Portfolio

A hand-crafted, editorial personal portfolio engineered for Shruti Ravikumar (B.Tech Computer Science and Engineering, IIITDM Kancheepuram).

Built with Next.js App Router, Tailwind CSS, Motion (`motion/react`), Lenis smooth scrolling, Embla Carousel, Zod, and Resend. Designed for zero-config Vercel deployment.

---

## Tech Stack & Architecture

- **Framework**: Next.js (App Router, Server Components by default, Route Handlers)
- **Styling**: Tailwind CSS v4 with custom fluid typography clamps and editorial palette tokens
- **Typography**: `next/font/google` featuring **Anton** (Display XL/L/M) and **Inter** (Body 400/600)
- **Motion & Physics**: `motion` (`motion/react`) with spring physics (`stiffness: 220, damping: 24` for UI; `stiffness: 120, damping: 20` for pointer tracking)
- **Smooth Scrolling**: Lenis (`lerp: 0.1`) with anchor link offset integration
- **Carousel**: Embla Carousel React with drag gestures and slide offset rhythms
- **Validation**: Zod schema validation with timed submissions and honeypot protection
- **Email Backend**: Resend with in-memory IP rate limiting (5 req / 10 min)
- **Texture**: Fixed global film-grain overlay (`SVG feTurbulence` at 5% opacity, multiply blend mode)

---

## Design System & Tokens

| Token | Hex | Role | Contrast Ratio |
|---|---|---|---|
| `--cream` | `#CDBF98` | Primary light bands & body ground | Meets WCAG AA with `--umber` text (5.8:1) |
| `--plum` | `#5E233C` | Hero accent block, primary CTAs, dark bands | Meets WCAG AAA with `--paper` text (8.4:1) |
| `--umber` | `#533B26` | Darkest band ground, primary text on cream | Meets WCAG AAA with `--paper` text (9.1:1) |
| `--bronze` | `#886945` | Accent rules, bars, timeline nodes, hover states | Graphic & focus accent (3px outline) |
| `--olive` | `#525844` | Wins band ground, category tags | Meets WCAG AA with `--paper` text (5.2:1) |
| `--mauve` | `#AB8C99` | Path band ground, subtle glares | Meets WCAG AAA with `--ink` text (7.9:1) |
| `--paper` | `#EFE8D2` | High-contrast body & heading text on dark bands | Crisp, readable tint |
| `--ink` | `#2A1B10` | Deep contrast text on mauve band | Editorial ink |

### "Plum Night" Dark Theme
Toggled via the top navigation theme button (`data-theme="night"` on `<html>`). Persisted in `localStorage` and initialized via an inline `<head>` script to eliminate flash of unstyled content (FOUC).

---

## Band Architecture

1. **Band A: Hero (`--cream`, min-height 100svh)**:
   - 12-column grid with dual-tone headline ("SHRUTI RAVIKUMAR")
   - B&W headshot cutout with shoulders bleeding over the `--plum` block
   - Pointer parallax (photo ±14px, plum block ±6px, bronze block ±20px, headline ±5px)
   - Scroll parallax (headline -0.15x, photo -0.05x)
   - Per-letter spring lift on hover (8px)
   - 3×2 flickering readout grid and animated scroll line
2. **Band B: Marquee (`--plum`, 72px)**:
   - Infinite horizontal track: AI, Computer Vision, Robotics, DevOps, Security, Full-Stack
   - Velocity-modulated speed with scroll-direction flip and smooth hover pause
3. **Band C: About & Stats (`--cream` / `--umber` split)**:
   - Left: Profile statement and 3 stat counters with live spring counting on view
   - Right: Distressed 3D-tilt "SR" monogram (40vw) with floating drifting bronze squares
4. **Band D: Wins (`--olive`)**:
   - Sticky title with stacking card deck (top offsets: 120px, 140px, 160px, 180px, 200px)
   - Features DECODE SIH 2026, Abu Dhabi University, Schneider Electric OptiFarm, Google Big Code, and interactive hackathon pill chips
5. **Band E: Roles (`--cream`)**:
   - Full-width interactive rows with 0.45s `--plum` clip-path sweep on hover
   - Height-animated accordion panels with keyboard navigation
6. **Band F: Selected Work (`--cream`)**:
   - Asymmetric 12-col grid (7+5, 5+7, 12)
   - 5 bespoke animated SVG/CSS diagrams: CVE Patcher loop, AURA traffic detection boxes, UpTimeX latency heartbeat, PitWall lap delta scrubber, Dashing Raptor mBot sweep
   - 3D pointer tilt with radial glare and slide-up action bar
   - Full-height sliding project detail drawer with focus trapping and ESC support
7. **Band G: Skills (`--umber`)**:
   - Monospace terminal prompt typing `$ shruti --skills --list`
   - Vertical tab bar with shared `layoutId` indicator and animated bar tracks with skill levels
8. **Band H: Path (`--mauve`, `--ink` text)**:
   - Self-drawing vertical timeline driven by scroll progress (`pathLength`)
   - Alternating nodes scaling into place
9. **Band I: Moments Gallery (`--plum`)**:
   - Embla carousel with staggered slide heights (even slides offset 48px)
   - Live counter, magnetic navigation arrows, drag cursor, and full-screen lightbox modal
10. **Band J: Contact Split**:
    - 3-block split: 4 cols plum title, 3 cols direct channels (copy email), 5 cols form with floating labels, focus-growing underlines, honeypot, and magnetic submit button
11. **Band K: Footer (`--cream`)**:
    - Copyright, direct links, 360° rotating back-to-top button, optional recently pushed GitHub repositories, and 15vw Anton cropped name with staggered wave lift

---

## Local Development

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your credentials in `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=shrutirj307@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
SEND_AUTOREPLY=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Quality Checks

Run the linter:
```bash
npm run lint
```

Run the production build:
```bash
npm run build
```

---

## Deploy to Vercel

This repository is ready to deploy to Vercel with **zero extra configuration**:

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project into your Vercel Dashboard.
3. In **Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY`: Your Resend API key (from [resend.com](https://resend.com))
   - `CONTACT_TO_EMAIL`: `shrutirj307@gmail.com`
   - `CONTACT_FROM_EMAIL`: `onboarding@resend.dev` (or your verified custom domain email)
   - `SEND_AUTOREPLY`: `false` (set to `true` if your sending domain is verified)
   - `NEXT_PUBLIC_SITE_URL`: Your Vercel production URL (e.g. `https://your-portfolio.vercel.app`)
4. Click **Deploy**.

---

## Assets Reference

Pre-configured palette placeholder graphics are generated in `public/images/`. To personalize with your authentic media, replace the following files:

- `public/images/headshot.png` (Portrait cutout with transparent background, ~600×750px)
- `public/images/decode-sih.jpg` (DECODE SIH award presentation photo, ~800×600px)
- `public/images/adu.jpg` (Abu Dhabi University award ceremony photo, ~800×600px)
- `public/images/school.jpg` (Outreach Club initiatives photo, ~800×600px)
- `public/images/gallery-1.jpg` through `gallery-6.jpg` (Moments gallery images, ~800×1000px)
- `public/Shruti_Ravikumar_CV.pdf` (Included in `public/`)

---

## License

Built with craft by Shruti Ravikumar. © 2026. All rights reserved.
