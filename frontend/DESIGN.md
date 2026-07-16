# Queen's Banquet — Design System

Anti-slop design rules for the marketing site and admin. Read this before changing UI.

**Design read:** Cavite wedding/event coordination for local couples and families. Premium but honest. Not global royalty theater.

**Dials (landing):** `VARIANCE 6` · `MOTION 4` · `DENSITY 4`  
**Dials (admin):** `VARIANCE 4` · `MOTION 3` · `DENSITY 6`

---

## 1. Brand truth

| Fact | Use this |
|------|----------|
| Business | Queen's Banquet Events |
| Owner | Marou Madrid |
| Place | Bacoor, Cavite |
| Job | Wedding & event coordination, meetings, timelines, vendors |
| Tone | Calm, clear, warm. Concrete verbs. No fake aristocracy. |

If copy could belong to a Mayfair palace brand after removing the logo, rewrite it.

---

## 2. Tokens

### Color

| Token | Hex | Role |
|-------|-----|------|
| Surface | `#fbf9f9` | Page background |
| Surface low | `#f5f3f3` | Section / sidebar wash |
| Surface high | `#efeded` | Nested panels |
| Ink | `#1b1c1c` | Primary text |
| Muted | `#5f5e5e` | Secondary text |
| Gold | `#d4af37` | Accent / primary CTA fill |
| Gold ink | `#735c00` | Accent text, active states |
| On gold | `#241a00` | Text on gold buttons |
| Outline | `#d0c5af` | Borders, rules |
| White | `#ffffff` | Cards on light admin |

**Rules**
- One accent: gold. Do not introduce teal, purple, or neon.
- Admin stays light. Do not flip sections to dark mid-app.
- No pure `#000` backgrounds. No glow shadows.
- Gold is for actions and active nav, not decorative gradients everywhere.

### Typography

| Role | Face | Where |
|------|------|--------|
| Display | Playfair Display | Brand wordmark, landing H1/H2 only |
| UI / body | Inter (current) → prefer Geist or Source Sans 3 when swapping | Admin UI, body, forms |
| Labels | Same as UI, uppercase + tracking | Max 1 eyebrow per 3 sections (landing). Rare in admin. |

Serif is not the default for admin screens. Playfair appears only on the brand mark and rare page titles.

### Shape

- Radius: `4px`–`8px` (sharp-soft). Not pill-heavy.
- Buttons: slight radius, not full-pill by default.
- Cards: use only when elevation aids scanning (tables, editors). Prefer borders and spacing.

### Icons

- One family per surface (Lucide is already in admin; keep it).
- Stroke `1.5`–`1.7`. No emoji. No hand-drawn SVGs.

---

## 3. Landing rules

1. Hero fits first viewport: brand/headline/subtext/CTAs only. No trust strips, fake stats, or scroll cues.
2. One CTA intent label site-wide (e.g. "Book a meeting").
3. No 3 equal marketing cards. Vary layout families per section.
4. No Roman numerals, section indexes (`01 / Capabilities`), or pulse eyebrows.
5. No invented metrics (`320+ Royal Events`, `100% Exclusivity`).
6. No em-dash (`—`) in visible copy. Use hyphen `-` or rewrite.
7. Images: prefer local `/public` assets over remote placeholder CDNs.
8. Testimonials: real PH names/places, or clearly placeholder. No Duchess / Lake Como fiction.
9. Contact copy books a meeting. No "request an invitation" exclusivity gate.

---

## 4. Admin rules

Admin is operational software for Marou, not a second brochure.

### Layout

```
┌──────────┬──────────────────────────────┐
│ Brand    │ Page title + primary actions │
│ Nav      ├──────────────────────────────┤
│          │ Content (metrics / table /   │
│ Owner    │ forms)                       │
└──────────┴──────────────────────────────┘
```

- Sticky left nav (~240–260px), light surface.
- Active item: gold left rail + gold ink.
- Top bar: page title, View site, Save, Reset (when editing CMS).
- Mobile: drawer nav + backdrop.

### Dashboard

Show only honest signals:
- Inquiry counts by status (New / Contacted / Confirmed / Archived)
- Upcoming meeting dates from real inquiries
- Recent bookings list from API (or empty state with next step)
- CMS snapshot counts (services, packages, testimonials)

**Banned:** fake revenue, fake sparklines, Met Gala / Vogue sample rows, doughnuts labeled "Doughnut Chart", invented "% growth".

### Editors

- Form-first. Labels above inputs.
- Photo fields with preview.
- Confirm destructive removes.
- Toast for save/error. Sentence case. Same verb as the button ("Save changes" → "Changes saved").

### Voice

| Do | Don't |
|----|--------|
| Bookings, Meeting requests | Royal access, Sovereign inbox |
| Save changes | Commit legacy |
| New / Contacted / Confirmed | Coveted / Heirloom status |
| Marou Madrid | Alex Carter (fake admin persona) |

---

## 5. Motion

- Landing: subtle scroll reveal + hover scale on imagery. Respect `prefers-reduced-motion`.
- Admin: transitions under 200ms on hover/focus only. No perpetual loops, no chart animations for show.

---

## 6. Pre-flight (ship checklist)

- [ ] Brand truth intact (Cavite, Marou, coordination)
- [ ] One accent color used consistently
- [ ] Zero em-dashes in UI copy
- [ ] No fake stats or fake luxury testimonials
- [ ] Landing: ≤ 1 eyebrow per 3 sections
- [ ] Admin: light theme locked, no marketing bento/hero patterns
- [ ] CTA labels share one intent
- [ ] Forms: label above, errors inline, contrast AA
- [ ] Empty / loading / error states present
- [ ] Mobile: nav drawer works; tables collapse cleanly

---

## 7. Out of scope for this system

Do not apply landing marketing patterns to dense product UI elsewhere without adaptation. Dashboards stay ops-first; landings stay story-first.
