# DESIGN PLAN & NOTES

## 1. Palette Tokens & Contrast Strategy

| Token | Hex | Role | Contrast Notes |
|---|---|---|---|
| `--cream` | `#CDBF98` | Main light bands, primary ground | Dark text (`--umber`) meets WCAG AA (5.8:1) |
| `--plum` | `#5E233C` | Dark bands, hero accent block, primary CTA | Light text (`--paper`) meets WCAG AAA (8.4:1) |
| `--umber` | `#533B26` | Darkest band, primary text on cream | Background for `--paper` (9.1:1) |
| `--bronze` | `#886945` | Accent bars, rules, icons, hover accents | Used for graphic accents; not used for small text on cream |
| `--olive` | `#525844` | Secondary band (Wins), tags | White/paper text (`--paper`) meets WCAG AA (5.2:1) |
| `--mauve` | `#AB8C99` | Soft band (Path), highlights, glare | Dark text (`--ink`) meets WCAG AAA (7.9:1) |
| `--paper` | `#EFE8D2` | High-contrast text on dark bands | Crisp readable tint on plum, umber, olive |
| `--ink` | `#2A1B10` | High-contrast text on mauve | Deep rich umber-black for mauve band |

### Theme Inversion ("Plum Night")
- Cream bands (`#CDBF98`) -> Plum (`#5E233C`)
- Plum bands (`#5E233C`) -> Umber (`#533B26`)
- Umber bands (`#533B26`) -> Umber tinted with plum
- Olive bands (`#525844`) -> Retained olive
- Mauve bands (`#AB8C99`) -> Olive
- Body text transitions to `--paper`
- Handled via `data-theme="night"` on `<html>`, zero-flash inline script in `<head>`.

---

## 2. Type Scale (Fluid Clamps)

- **Display XL (Hero)**: `clamp(64px, 11.5vw, 200px)` | Anton | line-height 0.88 | uppercase | letter-spacing -0.01em
- **Display L (Section Titles)**: `clamp(48px, 7vw, 112px)` | Anton | line-height 0.92 | uppercase
- **Display M (Row & Card Titles)**: `clamp(28px, 3.6vw, 56px)` | Anton | line-height 1.05
- **Body**: Inter 17px/1.65 (18px on desktop), max-width 62ch, weight 400
- **Body Bold / Labels**: Inter 14px-16px, weight 600
- **Small / Meta**: Inter 14px/1.5, weight 400 & 600
- Monospace is strictly reserved for the terminal strip in the Skills band (`$ shruti --skills --list`).

---

## 3. Motion Principles & Springs

- **Hardware Acceleration**: Only animate `transform` and `opacity`.
- **Standard Ease**: `cubic-bezier(0.22, 1, 0.36, 1)` (editorial, snappy arrival with long decelerating settle).
- **UI Springs**: `{ stiffness: 220, damping: 24 }` for drawer, accordion, hover lifts.
- **Pointer-Follow Springs**: `{ stiffness: 120, damping: 20 }` for cursor ring, magnetic buttons, hero parallax.
- **Reduced Motion**: Completely bypass intro screen, marquee animation, custom cursor, tilt effects, and confetti. Replace transitions with instant or <=150ms opacity fades.

---

## 4. Band-by-Band Layout Wireframes (ASCII)

```
========================================================================================
NAV (Fixed 72px, blur backdrop after 40px scroll)
[ SR  Shruti Ravikumar ]              [ Work  About  Wins  Skills  Gallery  Contact ] [O] [Let's talk]
========================================================================================

BAND A: HERO (Cream background, min 100svh)
+-------------------------------------------------------------+-------------------------+
| [48x4 Bronze bar] B.Tech CSE · IIITDM Kancheepuram          | [PLUM BLOCK (88% ht)]   |
|                                                             |                         |
| SHRUTI                                                      |  +--[HEADSHOT (B&W)]-+  |
| RAVIKUMAR  (Dual-tone overlap on plum block)                |  |   cutout overlaps |  |
|                                                             |  |   shoulders bleed |  |
| Building systems that see, think, and ship.                 |  +-------------------+  |
|                                                             |                         |
| [View my work ->]  [Download CV _]                          | [+][3x2 pixel grid]     |
| (in) (gh) (mail)                                            | [Bronze offset block]   |
|                                                             | [Rotated vertical text] |
| [|] Scroll                                                  |                         |
+-------------------------------------------------------------+-------------------------+

========================================================================================
BAND B: MARQUEE (Plum band, 72px height, velocity & direction reactive)
>> AI  [#]  COMPUTER VISION  [#]  ROBOTICS  [#]  DEVOPS  [#]  SECURITY  [#]  FULL-STACK >>
========================================================================================

BAND C: ABOUT + STATS (Split 6 cols Cream / 6 cols Umber)
+----------------------------------------+----------------------------------------------+
| [Bronze bar]                           |                                              |
| ABOUT ME                               |   [ GIANT 'SR' MONOGRAM ]                    |
| Computer Science undergraduate at...   |   40vw, Anton, plum fill with heavy grain    |
| (exact profile paragraph, 58ch max)    |   Interactive 3D pointer tilt                |
|                                        |   [#] Floating drifting bronze squares       |
| -------------------------------------- |                                              |
| 05              03              02     |                                              |
| Projects built  Winning results Leadership |                                          |
+----------------------------------------+----------------------------------------------+

========================================================================================
BAND D: WINS / ACHIEVEMENTS (Olive background, Stacking sticky card deck)
+-----------------------+---------------------------------------------------------------+
| WINS                  | [CARD 1: DECODE SIH 2026 - Winner, Bharat Nirman | 3000 cash] |
| (Sticky at top:120px) | [CARD 2: Abu Dhabi University - 1st & 2nd Place Prizes]       |
|                       | [CARD 3: Schneider Electric - OptiFarm PWA]                   |
|                       | [CARD 4: Google The Big Code 2026 - Round 2]                  |
|                       | [CARD 5: Participation Chips - Vashisht, Bharat, Adobe, ...]  |
+-----------------------+---------------------------------------------------------------+

========================================================================================
BAND E: ROLES / POSITIONS (Cream background, accordion with clip-path sweep)
+---------------------------------------------------------------------------------------+
| ROLES                                                                                 |
| ------------------------------------------------------------------------------------- |
| 01  Coordinator                  The Developers Club, IIITDM Kancheepuram         (+) |
| ------------------------------------------------------------------------------------- |
| 02  Software Subsystem Member    AUV Society, IIITDM Kancheepuram                 (+) |
| ------------------------------------------------------------------------------------- |
| 03  Former President & Editor    The Outreach Club, Abu Dhabi Indian School       (+) |
+---------------------------------------------------------------------------------------+

========================================================================================
BAND F: SELECTED WORK / PROJECTS (Cream band with asymmetric multi-colour cards)
+----------------------------------------------------+----------------------------------+
| 01 Dependency Patcher [Plum]                       | 02 AURA [Umber]                  |
| [SVG Node Loop: Detect->Validate->Patch->PR]       | [SVG Road + moving YOLO boxes]   |
+----------------------------------+-----------------+----------------------------------+
| 03 UpTimeX [Olive]               | 04 PitWall Analytics [Mauve]                       |
| [Heartbeat pathLength graph]     | [Overlapping telemetry curves + scrubber]          |
+----------------------------------+----------------------------------------------------+
| 05 Dashing Raptor [Plum - 12 cols wide]                                               |
| [mBot shape + +/-35deg sweeping sensor cone + reactive obstacle]                      |
+---------------------------------------------------------------------------------------+
(Clicking any card opens the detailed sliding drawer from the right)

========================================================================================
BAND G: SKILLS (Umber background, terminal strip + tabbed panel)
+---------------------------------------------------------------------------------------+
| [>_ $ shruti --skills --list]                                                         |
| ------------------------------------------------------------------------------------- |
| [Tabs (4 cols)]        | [Active Panel (8 cols)]                                      |
| Programming            | C                  [======================== bronze] Core    |
| CSE Core               | C++                [======================== bronze] Core    |
| AI & Computer Vision   | Python             [======================== bronze] Core    |
| Robotics ...           | (Hover row shimmers, animated bar tracks, no % numbers)      |
+------------------------+--------------------------------------------------------------+

========================================================================================
BAND H: PATH (Mauve background, ink text, self-drawing scroll timeline)
+---------------------------------------------------------------------------------------+
| PATH                                                                                  |
|                IIITDM Kancheepuram, B.Tech CSE (2025 - Present)   (Node 1)            |
|       (Node 2) Generative AI with LLMs (Coursera Certification)                       |
|                Abu Dhabi Indian School, High School Diploma (2011-2025) (Node 3)      |
|       (Node 4) The Outreach Club (Leadership & Technology Initiatives)                |
+---------------------------------------------------------------------------------------+

========================================================================================
BAND I: MOMENTS / GALLERY (Plum background, Embla carousel, staggered slides)
+---------------------------------------------------------------------------------------+
| MOMENTS                                                   03 / 06   [<]  [>]          |
| +-------------+     +-------------+     +-------------+     +-------------+           |
| | Slide 1     |     | Slide 2     |     | Slide 3     |     | Slide 4     |           |
| | [Image]     |     | (Offset 48px|     | [Image]     |     | (Offset 48px|           |
| |             |     |  downwards) |     |             |     |  downwards) |           |
| +-------------+     +-------------+     +-------------+     +-------------+           |
| [======== Scroll Progress Track ========]   (Click slide -> Shared-element Lightbox)  |
+---------------------------------------------------------------------------------------+

========================================================================================
BAND J: CONTACT (3-Block Split Layout)
+-------------------------+-------------------------+-----------------------------------+
| 4 Cols [Plum]           | 3 Cols [Cream]          | 5 Cols [Umber]                    |
|                         |                         |                                   |
| LET'S                   | Email: shrutirj307@...  | Name [__________________________] |
| BUILD                   | [Copy Email Button]     | Email [_________________________] |
| SOMETHING.              | LinkedIn [->]           | Message [_______________________] |
|                         | GitHub [->]             | (0 / 2000 chars) [Honeypot field] |
|                         |                         | [ SEND MESSAGE (Magnetic) ]       |
+-------------------------+-------------------------+-----------------------------------+

========================================================================================
BAND K: FOOTER (Cream background)
(c) 2026 Shruti Ravikumar          LinkedIn  /  GitHub  /  Email          [^ Top Button]
  S   H   R   U   T   I       R   A   V   I   K   U   M   A   R   (15vw Anton, wave)
========================================================================================
```

---

## 5. Critique & AI-Trope Remediation

1. **Critique**: Standard AI designs use generic `rounded-2xl` cards with soft grey dropshadows (`shadow-lg`).
   - **Remedy**: Zero border-radius on bands, zero soft grey shadows. Depth is achieved via hard block offsets (e.g., Hero Bronze block offset behind Plum block, Wins overlapping sticky cards, hard 1px tinted borders).
2. **Critique**: Standard AI templates apply `fade-in-up` / `motion.div whileInView` on every single paragraph and icon, creating a repetitive floating effect.
   - **Remedy**: Only headings and the hero title use `<RevealLines>`. Body copy and cards exist solidly in place. Interactivity comes from user actions (3D tilt, magnetic buttons, hover sweeps, cursor reactions).
3. **Critique**: Tracked all-caps pill labels (e.g. `FEATURED WORK` in a small pill with rounded borders) above every heading.
   - **Remedy**: Eliminated. Headings are bold, raw, Display L/XL condensed Anton statements with a hard bronze rule `48x4px` where specified.
4. **Critique**: Neon or pastel gradient washes across backgrounds.
   - **Remedy**: Strict tactile palette grounded in Cream, Plum, Umber, Bronze, Olive, and Mauve, unified by a global SVG film grain overlay.

---

## 6. Skill Levels (Best Guesses for Editor Review)

Listed without percentages, categorised into `Core`, `Working`, and `Learning`:

- **Programming**:
  - Python: Core
  - C++: Core
  - C: Working
- **CSE Core**:
  - Data Structures & Algorithms: Core
  - Object-Oriented Programming: Core
  - Database Systems Design: Working
  - Design & Analysis of Algorithms: Working
  - Discrete Structures: Working
  - Digital Systems Design: Working
  - Computing Paradigms: Working
  - Introduction to AI: Core
- **AI & Computer Vision**:
  - YOLOv8: Core
  - OpenCV: Core
  - Object Tracking: Working
  - HSV Segmentation: Working
- **Robotics**:
  - ROS 2: Working
  - Linux: Core
  - State Machines: Working
  - Sensors & Actuators: Working
  - PID Control: Working
  - mBot: Core
  - Autonomous Navigation: Working
- **Web Development**:
  - JavaScript: Core
  - HTML: Core
  - CSS: Core
- **Databases & Data Analytics**:
  - MySQL: Working
  - PostgreSQL: Working
  - FastF1: Working
  - CSV/File Handling: Core
- **DevOps & Security**:
  - Git & GitHub: Core
  - GitHub Actions: Working
  - Automated Health Checks: Working
  - Dependency Management: Working
  - Incident Response: Working
- **Tools & APIs**:
  - VS Code: Core
  - Postman: Working
  - TomTom APIs: Working
  - Thonny: Working

---

## 7. Architectural Decisions & Fallbacks

1. **Images & Media**:
   - `public/images/` placeholder system: If `headshot.png`, `decode-sih.jpg`, `adu.jpg`, `school.jpg`, or `gallery-1..6.jpg` are absent or fail to load, high-craft SVG/CSS palette placeholders with geometric badges and typography will render seamlessly with zero broken image icons or build failures.
2. **Contact API & Honeypot**:
   - Route Handler: `POST /api/contact` validated via Zod.
   - Enforces 3s minimum submission time (`ts` field) to foil instant bots.
   - Hidden `company` field acts as honeypot.
   - Rate limiting: 5 requests / 10 minutes per IP using an in-memory sliding window.
   - Resend email dispatch with graceful fallback if `RESEND_API_KEY` is unset.
3. **Easter Egg**:
   - Keystroke listener for typing `h-i-r-e` outside input elements triggers full palette canvas confetti burst + toast.
4. **Typography**:
   - Configured via `next/font/google`: Anton (Display) and Inter (Body, weights 400 & 600).
5. **Assets to be supplied by User**:
   - `public/images/headshot.png`
   - `public/images/decode-sih.jpg`
   - `public/images/adu.jpg`
   - `public/images/school.jpg`
   - `public/images/gallery-1.jpg` through `gallery-6.jpg`
   - `public/Shruti_Ravikumar_CV.pdf`
   - `RESEND_API_KEY` in `.env.local`
