# Case study split layout — design

## Context

The 9 static project pages (`fr/`+`en/`: mercure, rougail, brenda, sonnyvizion,
arimont, holora, el-conciergio, hormone-concept, kozy-sneakers) currently show
the case study (when present) as a plain stacked text block (`.proj-case`,
added in a previous change) followed by a separate, fully independent media
gallery (`.proj-content`). Only 3 of the 9 projects (arimont, holora,
el-conciergio) have a case study at all; the layout is described by the user
as "too basic."

Goal: give every project page a case study, and present it in a more
distinctive, editorial two-column layout where the case study text stays
pinned on screen while the project's media scrolls past it.

## Non-goals

- No new JS/animation library. `position: sticky` is native CSS.
- No change to `.proj-hero` or `.proj-cover` (the full-bleed hero video/image
  at the top of each page) — this redesign only replaces what currently sits
  between `.proj-cover` and `.proj-next`.
- No redesign of `.proj-next` (next-project teaser) or the header/footer.

## Layout

### Desktop (≥1024px)

`.proj-case` and `.proj-content` are merged into one new two-column block,
`.proj-split`:

- `.proj-split-case` (~60% width): the case study text. `position: sticky;
  top: 100px` (clears the fixed header + a small margin), so it stays in
  view while `.proj-split-media` scrolls past. Sticky naturally releases
  once the media column finishes scrolling past it — no JS pinning needed.
- `.proj-split-media` (~40% width): every media item that used to live in
  `.proj-content` (images/videos), stacked full-width, one per row, in the
  same order as before. The old `--duo`/`--full`/`--center` block variants
  are dropped — at ~40vw a duo (two side-by-side items) would make each item
  too narrow to read; a single vertical stack reads better in a narrow
  column and matches the "images qui défilent" request.

### Mobile (<768px)

Single column: `.proj-split-case` first (not sticky — nothing to pin
against), then `.proj-split-media` below it, both 100% width. This matches
the existing mobile pattern already used by `.proj-hero-body` (grid collapses
to a single column under 768px).

## Graphic treatment — vertical timeline (validated via visual mockup, option B)

Each numbered step in the case study becomes a filled dot connected by a
vertical line (opacity fading toward the end), instead of the current plain
numbered grid. Applies to the "steps" sub-block only; the surrounding
context/problem/result paragraphs keep their current plain-text treatment.

## Content plan

Arimont, Holora, El Conciergio keep their existing case-study text verbatim,
just moved into the new `.proj-split-case` column.

The remaining 6 projects get a new, written case study (problem + 2-3 steps +
result), grounded in each project's existing hero description — not
fabricated from nothing:

- **Mercure** (coques iPhone premium, Webflow): problem = besoin d'un site à
  la hauteur d'un produit premium ; steps = direction créative & identité →
  design minimaliste produit-first → développement Webflow & micro-
  interactions ; result = expérience fluide qui met le produit en valeur.
- **Rougail** (restaurant, Webflow): problem = traduire l'âme d'un restaurant
  en expérience digitale ; steps = direction créative & logo → illustrations
  sur-mesure → intégration Webflow ; result = identité vivante et chaleureuse.
- **Brenda Company** (conciergerie audiovisuelle premium, clients Zara/LV/
  Nike/Lancôme, Webflow): problem = positionnement premium sans bruit visuel ;
  steps = direction artistique & identité → design épuré → développement
  Webflow ; result = présence digitale raffinée et confiante.
- **Sonnyvizion** (portfolio perso, Webflow, Awwwards HM): problem = construire
  une identité personnelle forte sans template ; steps = direction artistique
  noir & blanc → typographie & mise en page → développement Webflow ; result
  = Honorable Mention Awwwards.
- **Hormone Concept** (Shopify sneakers resale): problem = mise en valeur
  produit tendue + catalogue à alimenter en continu ; steps = DA & thème
  Shopify custom → app de scrapping pour le catalogue → street shooting IA ;
  result = store rapide et visuellement tendu.
- **Kozy Sneakers** (Shopify sneakers resale): problem = alimenter un
  catalogue sneakers à grande échelle sans effort manuel ; steps = DA & thème
  Shopify custom → app de scrapping sur-mesure → mise en avant produit ;
  result = catalogue auto-alimenté, store cohérent.

Each new case study is written in both French and English, matching the tone
already established on the site.

## Files touched

- `src/css/pages/project.css`: replace `.proj-case*` rules with `.proj-split*`
  rules (two-column grid/sticky + timeline step styling), remove the old
  `.proj-content`/`.proj-block--*` variants that no longer apply inside
  `.proj-split-media` (keep them only if still used elsewhere — they are not).
- All 18 project HTML files (`fr/`+`en/` × 9 slugs): replace the
  `.proj-case` + `.proj-content` block pair with the new `.proj-split`
  markup.

## Verification

- `npm run build` succeeds.
- Manually check each of the 9 pages (fr+en) at 375px/768px/1440px: case
  study stays pinned on desktop while media scrolls, stacks cleanly on
  mobile, timeline dots/line render correctly, no layout overflow.
- No console errors; confirm the earlier marquee-freeze fix is unaffected
  (unrelated file, but re-check quickly since this is a full HTML rewrite of
  the same files).
