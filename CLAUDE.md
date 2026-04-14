# CLAUDE.md — Young, Wild & Pixel Agency Portfolio

## Project overview

Portfolio site for **Young, Wild & Pixel Agency** — a creative web design agency.
Goal: modern, bold, fluid design with pixel-perfect implementation and Lighthouse > 90.

Bilingual site: `/fr/` (French) and `/en/` (English). Root `index.html` redirects to `/fr/index.html`.

---

## Stack

- **Bundler**: Vite 5 (vanilla, no framework)
- **Language**: HTML + CSS + JavaScript ES Modules
- **Animations**: GSAP 3 + ScrollTrigger, Lenis (smooth scroll), Lottie Web
- **CSS**: Vanilla CSS with BEM + CSS custom properties, mobile-first
- **Content**: Static HTML, no CMS
- **Deploy**: Netlify or Vercel (`npm run build` → `dist/`)

### Dev commands
```
npm run dev       # Vite dev server
npm run build     # Production build (dist/)
npm run build:gh  # GitHub Pages build (base=/youngwildandpixels/)
npm run build:prod # Production build (base=/)
npm run format    # Prettier formatting
```

---

## File structure

```
root/
├── fr/                    # French pages (index, work, about, contact…)
├── en/                    # English pages
├── src/
│   ├── css/
│   │   ├── layout/        # header.css, hero.css, work.css
│   │   └── pages/         # hero.css, work.css (page-specific)
│   └── js/
│       └── modules/       # navigation.js + feature modules
├── fonts/                 # Local WOFF2 fonts (no Google Fonts)
├── img/                   # Optimized images (WebP preferred)
├── videos/
├── style.css              # Global styles (fonts, typography, variables, reset)
├── main.js                # JS entry point / orchestration
└── vite.config.js
```

---

## CSS design system

### Color palette (defined in `style.css` `:root`)

| Variable | Value | Role |
|---|---|---|
| `--color-text` | `#FF6565` | Primary text / accent (coral red) |
| `--color-bg` | `#FFFDEF` | Background (warm off-white) |
| `--color-bg-alt` | `#7D0406` | Alternate background (deep red) |
| `--color-light` | `#ffffff` | White |
| `--color-gray` | `#999999` | Secondary text |
| `--color-gray-light` | `#f5f5f5` | Light surfaces |

### Spacing scale

```
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-xxl: 4rem
```

### Typography

| Font | Weight | Use |
|---|---|---|
| `'DKS Grooveziilla'` | 400 | h1, h2, .headline (display) |
| `'PPMori'` | 400 | body, p, li |
| `'PPMori'` | 600 | Secondary headings |
| `'PPMori'` | 900 | h3, h4, bold UI text |
| `'Pix32'` | 400 | Logo, special accents (use sparingly) |

All fonts are served locally from `/fonts/` as WOFF2. No Google Fonts.

### Breakpoints (mobile-first)

```css
/* Mobile: default */
@media (min-width: 768px)  { /* tablet  */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1440px) { /* large   */ }
```

### Naming convention

BEM strict: `.block__element--modifier`

---

## JavaScript conventions

- All JS = ES Modules (type="module")
- Each feature = standalone module with `init()` export
- `main.js` is the orchestrator — no complex logic here
- Module location: `src/js/modules/`
- No external libraries except: GSAP, Lenis, Lottie

---

## Animations

- GSAP is the only animation library for DOM + SVG
- Lenis handles smooth scroll (wrap ScrollTrigger inside Lenis RAF)
- Lottie for pre-built JSON animations
- Always respect `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) { … }
  ```
- SVGs that need animation: inline them in HTML (not `<img>`)
- Animated text uses `[data-animated-text]` + `.animated-line` / `.animated-line-inner` pattern

---

## Rules for AI assistance

1. Read this file + `DECISIONS.md` before any code change
2. Never invent design decisions — ask if missing info
3. Work on one section or component at a time
4. Respect BEM naming strictly
5. Never add external npm dependencies without explicit approval
6. Never use a CSS framework (no Tailwind, Bootstrap, etc.)
7. Always use CSS custom properties from `:root` for colors/spacing
8. Fonts come from `/fonts/` — never link Google Fonts
9. Mobile-first always: write mobile styles first, then `min-width` queries
10. Run `npm run format` (Prettier) after any file edits

---

## Accessibility

- WCAG 2.1 AA minimum
- Semantic HTML (correct heading hierarchy, landmarks)
- Visible focus indicators
- All `<img>` must have `alt` text
- Contrast ≥ 4.5:1 for body text
- Keyboard navigation must work

---

## Performance targets

- Lighthouse Performance > 90
- Images: WebP format, `loading="lazy"` on non-critical images
- Critical fonts: preloaded via `<link rel="preload">`
- No render-blocking resources
- No console errors in production
