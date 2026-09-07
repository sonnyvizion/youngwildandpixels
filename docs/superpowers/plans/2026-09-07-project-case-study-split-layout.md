# Case Study Split Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current stacked `.proj-case` (text) + `.proj-content` (gallery) blocks on all 9 project pages with a single two-column `.proj-split` layout — case study text sticky on the left (~60%), media scrolling on the right (~40%) on desktop, stacked on mobile — and give every project a case study (writing new ones for the 6 that don't have one yet).

**Architecture:** Pure CSS change (`position: sticky`, CSS grid) in `src/css/pages/project.css`, no new JS/library. Each of the 18 HTML files (`fr/`+`en/` × 9 slugs) gets its `.proj-case`+`.proj-content` region replaced with one `.proj-split` block. Case-study step markers use a small vertical-timeline treatment (filled dot + connecting line).

**Tech Stack:** Plain HTML/CSS (existing site conventions: BEM-ish classes, `'PPMori'` font, `#FF6565` text color, `clamp()` spacing scale — no new dependencies).

**Reference:** `docs/superpowers/specs/2026-09-07-project-case-study-split-layout-design.md`

---

## Task 1: CSS — `.proj-split` + timeline steps

**Files:**
- Modify: `src/css/pages/project.css`

- [ ] **Step 1: Replace the `CASE STUDY` block with the new `SPLIT` block**

Find this entire block (currently right after the `.proj-cover-media img, .proj-cover-media video` rule, before `/* ─── CONTENT BLOCKS ────────────────────────────────────── */`):

```css
/* ─── CASE STUDY ────────────────────────────────────────── */
.proj-case {
  padding: clamp(2rem, 5vw, 5rem) 4%;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3.5rem);
}

.proj-case-subtitle {
  font-family: 'PPMori', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FF6565;
  opacity: 0.55;
}

.proj-case-block {
  max-width: 62ch;
}

.proj-case-block h3 {
  font-family: 'PPMori', sans-serif;
  font-weight: 600;
  font-size: clamp(1.1rem, 1.6vw, 1.5rem);
  color: #FF6565;
  margin: 0 0 0.6em;
}

.proj-case-block p {
  font-family: 'PPMori', sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.4;
  color: #FF6565;
  opacity: 0.85;
  margin: 0;
}

.proj-case-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(1.2rem, 2vw, 2rem);
}

.proj-case-step-num {
  font-family: 'PPMori', sans-serif;
  font-weight: 900;
  font-size: 0.85rem;
  color: #FF6565;
  opacity: 0.4;
  margin-bottom: 0.4em;
  display: block;
}

.proj-case-step h4 {
  font-family: 'PPMori', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #FF6565;
  margin: 0 0 0.4em;
}

.proj-case-step p {
  font-family: 'PPMori', sans-serif;
  font-size: 0.88rem;
  line-height: 1.35;
  color: #FF6565;
  opacity: 0.75;
  margin: 0;
}

.proj-case-role {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.proj-case-role span {
  display: inline-flex;
  padding: 0.4rem 1rem;
  border: 1px solid #FF6565;
  border-radius: 999px;
  font-family: 'PPMori', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #FF6565;
  opacity: 0.75;
}
```

Replace it with:

```css
/* ─── SPLIT (sticky case study + scrolling media) ───────── */
.proj-split {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: clamp(2rem, 4vw, 4rem);
  padding: clamp(2rem, 5vw, 5rem) 4% clamp(3rem, 6vw, 6rem);
  align-items: start;
}

.proj-split-case {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: clamp(1.8rem, 3vw, 3rem);
}

.proj-split-media {
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.2vw, 1.2rem);
}

.proj-split-subtitle {
  font-family: 'PPMori', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FF6565;
  opacity: 0.55;
}

.proj-split-block {
  max-width: 62ch;
}

.proj-split-block h3 {
  font-family: 'PPMori', sans-serif;
  font-weight: 600;
  font-size: clamp(1.1rem, 1.6vw, 1.5rem);
  color: #FF6565;
  margin: 0 0 0.6em;
}

.proj-split-block p {
  font-family: 'PPMori', sans-serif;
  font-weight: 400;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.4;
  color: #FF6565;
  opacity: 0.85;
  margin: 0;
}

.proj-split-role {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.proj-split-role span {
  display: inline-flex;
  padding: 0.4rem 1rem;
  border: 1px solid #FF6565;
  border-radius: 999px;
  font-family: 'PPMori', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #FF6565;
  opacity: 0.75;
}

/* Vertical timeline for case-study steps */
.proj-timeline {
  display: flex;
  flex-direction: column;
}

.proj-timeline-step {
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 1rem;
}

.proj-timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.proj-timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #FF6565;
  flex-shrink: 0;
}

.proj-timeline-line {
  width: 2px;
  flex: 1;
  background: #FF6565;
  opacity: 0.3;
  min-height: clamp(1.5rem, 3vw, 2.5rem);
}

.proj-timeline-step:last-child .proj-timeline-line {
  display: none;
}

.proj-timeline-content {
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.proj-timeline-content h4 {
  font-family: 'PPMori', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #FF6565;
  margin: 0 0 0.4em;
}

.proj-timeline-content p {
  font-family: 'PPMori', sans-serif;
  font-size: 0.88rem;
  line-height: 1.35;
  color: #FF6565;
  opacity: 0.75;
  margin: 0;
}
```

- [ ] **Step 2: Remove the old content-block variants, now unused**

Find and delete this entire block (the `/* ─── CONTENT BLOCKS ────────────────────────────────────── */` section, but KEEP the `.proj-media-wrap` rules that follow it — those are still used inside `.proj-split-media`):

```css
/* ─── CONTENT BLOCKS ────────────────────────────────────── */
.proj-content {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 0.8vw, 0.8rem);
  padding: clamp(0.5rem, 0.8vw, 0.8rem) 2%;
  padding-bottom: clamp(3rem, 6vw, 6rem);
}

.proj-block {
  overflow: hidden;
}

/* Full width */
.proj-block--full {
  width: 100%;
}

/* Two equal columns */
.proj-block--duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.5rem, 0.8vw, 0.8rem);
}

/* Three equal columns */
.proj-block--trio {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: clamp(0.5rem, 0.8vw, 0.8rem);
}

/* Centered — 60% width */
.proj-block--center {
  width: 60%;
  margin: 0 auto;
}

/* Wide left (2/3 + 1/3) */
.proj-block--left {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: clamp(0.5rem, 0.8vw, 0.8rem);
}

/* Wide right (1/3 + 2/3) */
.proj-block--right {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(0.5rem, 0.8vw, 0.8rem);
}

```

(Leave the `.proj-media-wrap { ... }` and `.proj-media-wrap img, .proj-media-wrap video { ... }` rules that come right after this block untouched — do not delete those.)

- [ ] **Step 3: Update the mobile media query**

Find this inside the `@media (max-width: 768px)` block:

```css
  .proj-block--duo,
  .proj-block--trio,
  .proj-block--left,
  .proj-block--right {
    grid-template-columns: 1fr;
  }

  .proj-block--center {
    width: 100%;
  }

  .proj-case-steps {
    grid-template-columns: 1fr;
  }
```

Replace with:

```css
  .proj-split {
    grid-template-columns: 1fr;
  }

  .proj-split-case {
    position: static;
    top: auto;
  }
```

- [ ] **Step 4: Verify no leftover references to removed classes**

Run: `grep -n "proj-case\|proj-block--\|proj-content" src/css/pages/project.css`
Expected: no output (all removed/renamed).

- [ ] **Step 5: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add src/css/pages/project.css
git commit -m "feat: replace proj-case/proj-content with sticky proj-split layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Mercure (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/mercure.html`
- Modify: `en/mercure.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/mercure.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/work-3.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail2.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Une marque premium de coques iPhone qui avait besoin d'un site à la hauteur du produit — minimaliste, précis, sans distraction.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Direction créative & identité</h4>
              <p>Définition d'une identité de marque sobre et intemporelle, pensée pour mettre le produit au centre.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Design produit-first</h4>
              <p>Mises en page épurées, typographie précise, palette de couleurs volontairement restreinte.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Développement Webflow</h4>
              <p>Intégration Webflow avec interactions subtiles et rythme visuel soigné à chaque scroll.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Un site aussi soigné que le produit lui-même, où forme et fonction s'alignent sans excès.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/work-3.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail2.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/mercure.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/work-3.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail2.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>A premium iPhone case brand needed a site as considered as the product itself — minimal, precise, distraction-free.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Creative direction & identity</h4>
              <p>Defined a restrained, timeless brand identity built to keep the product at the center.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Product-first design</h4>
              <p>Clean layouts, precise typography, and a deliberately narrow color palette.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Webflow development</h4>
              <p>Webflow build with subtle interactions and a considered visual rhythm on every scroll.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A site as polished as the product itself, where form and function align without excess.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/work-3.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Mercure" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail2.jpg" alt="Mercure" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-split" fr/mercure.html en/mercure.html`
Expected: `fr/mercure.html:2` and `en/mercure.html:2` (opening class + case/media sub-elements all use `proj-split*` prefix, so any count ≥1 per file confirms the replacement landed — the important check is no `proj-content`/`proj-block--` remain):

Run: `grep -c "proj-content\|proj-block--" fr/mercure.html en/mercure.html`
Expected: `fr/mercure.html:0` and `en/mercure.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/mercure.html en/mercure.html
git commit -m "feat: add case study + split layout to Mercure page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Rougail (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/rougail.html`
- Modify: `en/rougail.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/rougail.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail1.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail3.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail4.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail5.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Traduire l'âme d'un restaurant en une expérience digitale aussi chaleureuse qu'authentique, sans sacrifier la clarté.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Direction créative & logo</h4>
              <p>Création du logo et de l'identité visuelle complète, pensée pour refléter chaleur et personnalité.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Illustrations sur-mesure</h4>
              <p>Illustrations originales pour donner du caractère à chaque page sans surcharger la lecture.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Intégration Webflow</h4>
              <p>Mise en page structurée et intégration Webflow pour une navigation claire et fluide.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Une identité vibrante et ancrée, où le design raconte une histoire — presque à en sentir les saveurs.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail1.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail3.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail4.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail5.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/rougail.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail1.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail3.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail4.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail5.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>Translating a restaurant's soul into a digital experience that feels both warm and authentic, without losing clarity.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Creative direction & logo</h4>
              <p>Created the logo and full visual identity, built to reflect warmth and personality.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Custom illustrations</h4>
              <p>Original illustrations to give every page character without cluttering the read.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Webflow integration</h4>
              <p>Structured layout and Webflow build for clear, fluid navigation.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A vibrant, grounded identity — design that tells a story you can almost taste.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/rougail1.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail3.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail4.jpg" alt="Le Rougail" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/rougail5.jpg" alt="Le Rougail" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--" fr/rougail.html en/rougail.html`
Expected: `fr/rougail.html:0` and `en/rougail.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/rougail.html en/rougail.html
git commit -m "feat: add case study + split layout to Rougail page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Brenda Company (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/brenda.html`
- Modify: `en/brenda.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/brenda.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-2.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-1.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-3.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Une conciergerie audiovisuelle au service de grandes maisons (Zara, Louis Vuitton, Nike, Lancôme) avait besoin d'une présence digitale à la hauteur — raffinée, sûre d'elle, sans bruit visuel.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Direction artistique & identité</h4>
              <p>Définition de l'identité de marque, du logo à la direction créative complète.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Design épuré</h4>
              <p>Mises en page minimalistes, typographie précise, langage visuel cohérent du premier scroll au dernier.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Développement Webflow</h4>
              <p>Intégration Webflow soignée, sans effets superflus, pour une expérience fluide et intuitive.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Une présence digitale premium et confiante — parce que le vrai premium ne crie pas, il résonne.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-2.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-1.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-3.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/brenda.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-2.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-1.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-3.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>An audiovisual concierge service working with major houses — Zara, Louis Vuitton, Nike, Lancôme — needed a digital presence to match: refined, confident, no visual noise.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Art direction & identity</h4>
              <p>Defined the brand identity, from logo to full creative direction.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Clean design</h4>
              <p>Minimalist layouts, precise typography, a coherent visual language from first scroll to last.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Webflow development</h4>
              <p>Careful Webflow build, no unnecessary effects, for a smooth and intuitive experience.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A premium, confident digital presence — because true premium doesn't shout, it resonates.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-2.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-4.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-1.jpg" alt="Brenda Company" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/brenda-3.jpg" alt="Brenda Company" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--" fr/brenda.html en/brenda.html`
Expected: `fr/brenda.html:0` and `en/brenda.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/brenda.html en/brenda.html
git commit -m "feat: add case study + split layout to Brenda page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Sonnyvizion (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/sonnyvizion.html`
- Modify: `en/sonnyvizion.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/sonnyvizion.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/pf02.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf03.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/pf04.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/pf06.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf07.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Construire une identité personnelle forte, sans template, pour un portfolio qui ne ressemble à aucun autre.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Direction artistique noir & blanc</h4>
              <p>Un parti pris esthétique radical : minimalisme, contraste, typographie affirmée.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Typographie & mise en page</h4>
              <p>Rythme visuel travaillé pour laisser respirer chaque projet présenté.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Développement Webflow</h4>
              <p>Intégration Webflow avec des interactions soignées et un temps de chargement maîtrisé.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Un portfolio récompensé d'une Honorable Mention Awwwards — la preuve qu'un design sûr de lui n'a pas besoin de bruit.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/pf02.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf03.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf04.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf06.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf07.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/sonnyvizion.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/pf02.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf03.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/pf04.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/pf06.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf07.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>Building a strong personal identity, with no template, for a portfolio that looks like nothing else.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Black & white art direction</h4>
              <p>A radical aesthetic choice: minimalism, contrast, bold typography.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Typography & layout</h4>
              <p>Visual rhythm crafted to let every featured project breathe.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Webflow development</h4>
              <p>Webflow build with careful interactions and tightly controlled load times.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A portfolio awarded an Awwwards Honorable Mention — proof that confident design doesn't need to shout.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <img src="/img/work/pf02.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf03.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf04.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf06.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/pf07.jpg" alt="Sonnyvizion" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--" fr/sonnyvizion.html en/sonnyvizion.html`
Expected: `fr/sonnyvizion.html:0` and `en/sonnyvizion.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/sonnyvizion.html en/sonnyvizion.html
git commit -m "feat: add case study + split layout to Sonnyvizion page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Le Domaine d'Arimont (fr + en) — existing case study, reflow only

**Files:**
- Modify: `fr/arimont.html`
- Modify: `en/arimont.html`

- [ ] **Step 1: Replace the FR case+content region**

In `fr/arimont.html`, find:

```html
    <div class="proj-case">
      <div class="proj-case-block">
        <h3>Le problème</h3>
        <p>Un domaine ardennais sans présence digitale, avec uniquement des photos de téléphone comme matière visuelle. L'enjeu : créer une expérience en ligne premium en partant de rien.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Audit & stratégie</h4>
          <p>Analyse des assets existants, définition du positionnement, de l'architecture de contenu et de la DA.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>Réhabilitation IA</h4>
          <p>Upscaling et retouche IA des photos basse résolution. Génération de séquences vidéo immersives à partir des visuels réhabilités.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>Design & développement</h4>
          <p>Conception complète et développement sur Sanity CMS. Back-office sur-mesure pour une gestion autonome par le client.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Résultat</h3>
        <p>Site vitrine livré, visuels transformés de photos téléphone en assets premium. Le client gère son contenu en autonomie totale.</p>
      </div>
    </div>

    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <video src="/videos/arimont-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/arimont-2.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/arimont-3.jpg" alt="Le Domaine d'Arimont" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Un domaine ardennais sans présence digitale, avec uniquement des photos de téléphone comme matière visuelle. L'enjeu : créer une expérience en ligne premium en partant de rien.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Audit & stratégie</h4>
              <p>Analyse des assets existants, définition du positionnement, de l'architecture de contenu et de la DA.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Réhabilitation IA</h4>
              <p>Upscaling et retouche IA des photos basse résolution. Génération de séquences vidéo immersives à partir des visuels réhabilités.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Design & développement</h4>
              <p>Conception complète et développement sur Sanity CMS. Back-office sur-mesure pour une gestion autonome par le client.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Site vitrine livré, visuels transformés de photos téléphone en assets premium. Le client gère son contenu en autonomie totale.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/arimont-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/arimont-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/arimont-3.jpg" alt="Le Domaine d'Arimont" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN case+content region**

In `en/arimont.html`, find:

```html
    <!-- Case study -->
    <div class="proj-case">
      <div class="proj-case-block">
        <h3>The problem</h3>
        <p>An Ardennes retreat with no digital presence, and nothing but phone photos to work with. The challenge: build a premium online experience starting from scratch.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Audit & strategy</h4>
          <p>Auditing the existing assets, then defining the positioning, content architecture and art direction.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>AI restoration</h4>
          <p>Upscaling and AI retouching of the low-resolution photos, then generating immersive video sequences from the restored visuals.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>Design & development</h4>
          <p>Full design and build on Sanity CMS, with a bespoke back office so the client can manage content independently.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Result</h3>
        <p>A finished showcase site, with phone photos turned into premium visual assets. The client now manages their content in complete autonomy.</p>
      </div>
    </div>

    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <video src="/videos/arimont-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/arimont-2.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="/img/work/arimont-3.jpg" alt="Le Domaine d'Arimont" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>An Ardennes retreat with no digital presence, and nothing but phone photos to work with. The challenge: build a premium online experience starting from scratch.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Audit & strategy</h4>
              <p>Auditing the existing assets, then defining the positioning, content architecture and art direction.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>AI restoration</h4>
              <p>Upscaling and AI retouching of the low-resolution photos, then generating immersive video sequences from the restored visuals.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Design & development</h4>
              <p>Full design and build on Sanity CMS, with a bespoke back office so the client can manage content independently.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A finished showcase site, with phone photos turned into premium visual assets. The client now manages their content in complete autonomy.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/arimont-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/arimont-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/arimont-3.jpg" alt="Le Domaine d'Arimont" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--\|proj-case" fr/arimont.html en/arimont.html`
Expected: `fr/arimont.html:0` and `en/arimont.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/arimont.html en/arimont.html
git commit -m "feat: reflow Arimont case study into sticky split layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Holora (fr + en) — existing case study, reflow only

**Files:**
- Modify: `fr/holora.html`
- Modify: `en/holora.html`

- [ ] **Step 1: Replace the FR case+content region**

In `fr/holora.html`, find:

```html
    <div class="proj-case">
      <div class="proj-case-block">
        <h3>Le problème</h3>
        <p>Lancer une boutique TCG Pokémon et One Piece dans un marché saturé de templates génériques. Créer une identité forte et un store qui se démarque visuellement.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Univers & DA</h4>
          <p>Définition de l'identité visuelle complète : palette, typographie, tone of voice et direction artistique globale.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>Shopify custom</h4>
          <p>Développement d'un thème Shopify entièrement sur-mesure, zero template. Chaque section conçue pour la mise en valeur produit.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>Visuels IA</h4>
          <p>Génération de l'ensemble des visuels et vidéos du store par IA. Identité cohérente sans shooting physique.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Résultat</h3>
        <p>Store opérationnel avec une identité distincte dans le secteur TCG. DA et dev réalisés en solo, de la maquette au go-live.</p>
      </div>
    </div>

    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/holora-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/holora-2.webp" alt="Holora" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-3.jpg" alt="Holora" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Lancer une boutique TCG Pokémon et One Piece dans un marché saturé de templates génériques. Créer une identité forte et un store qui se démarque visuellement.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Univers & DA</h4>
              <p>Définition de l'identité visuelle complète : palette, typographie, tone of voice et direction artistique globale.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Shopify custom</h4>
              <p>Développement d'un thème Shopify entièrement sur-mesure, zero template. Chaque section conçue pour la mise en valeur produit.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Visuels IA</h4>
              <p>Génération de l'ensemble des visuels et vidéos du store par IA. Identité cohérente sans shooting physique.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Store opérationnel avec une identité distincte dans le secteur TCG. DA et dev réalisés en solo, de la maquette au go-live.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/holora-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-2.webp" alt="Holora" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-3.jpg" alt="Holora" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN case+content region**

In `en/holora.html`, find:

```html
    <!-- Case study -->
    <div class="proj-case">
      <div class="proj-case-block">
        <h3>The problem</h3>
        <p>Launching a Pokémon and One Piece TCG store into a market flooded with generic templates. The brief was a strong identity and a store that actually stands out visually.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Universe & art direction</h4>
          <p>Defining the full visual identity: palette, typography, tone of voice and overall art direction.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>Custom Shopify build</h4>
          <p>Building a fully bespoke Shopify theme, zero templates. Every section designed to put the product front and center.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>AI visuals</h4>
          <p>Generating every visual and video for the store with AI. A consistent identity, no physical shoot required.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Result</h3>
        <p>A live store with a distinct identity in the TCG space. Art direction and development handled solo, from mockup to go-live.</p>
      </div>
    </div>

    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/holora-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/holora-2.webp" alt="Holora" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-3.jpg" alt="Holora" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>Launching a Pokémon and One Piece TCG store into a market flooded with generic templates. The brief was a strong identity and a store that actually stands out visually.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Universe & art direction</h4>
              <p>Defining the full visual identity: palette, typography, tone of voice and overall art direction.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Custom Shopify build</h4>
              <p>Building a fully bespoke Shopify theme, zero templates. Every section designed to put the product front and center.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>AI visuals</h4>
              <p>Generating every visual and video for the store with AI. A consistent identity, no physical shoot required.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A live store with a distinct identity in the TCG space. Art direction and development handled solo, from mockup to go-live.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/holora-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-2.webp" alt="Holora" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/holora-3.jpg" alt="Holora" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--\|proj-case" fr/holora.html en/holora.html`
Expected: `fr/holora.html:0` and `en/holora.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/holora.html en/holora.html
git commit -m "feat: reflow Holora case study into sticky split layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: El Conciergio (fr + en) — richest existing case study, reflow only

**Files:**
- Modify: `fr/el-conciergio.html`
- Modify: `en/el-conciergio.html`

- [ ] **Step 1: Replace the FR case+content region**

In `fr/el-conciergio.html`, find:

```html
    <div class="proj-case">
      <div class="proj-case-subtitle">Product Design Case Study</div>
      <div class="proj-case-block">
        <h3>Contexte</h3>
        <p>El Conciergio est une solution de conciergerie alimentée par l'intelligence artificielle destinée aux propriétaires Airbnb, gîtes et locations saisonnières. L'objectif du produit est de répondre automatiquement aux demandes récurrentes des voyageurs via WhatsApp afin de réduire la charge opérationnelle des hôtes et d'améliorer l'expérience client. Mon rôle consistait à concevoir une plateforme capable de présenter une technologie complexe de manière simple, rassurante et orientée conversion.</p>
      </div>
      <div class="proj-case-block">
        <h3>Le problème</h3>
        <p>Les propriétaires de locations saisonnières font face à plusieurs difficultés : répondre aux mêmes questions plusieurs fois par jour, gérer les demandes à toute heure, maintenir un niveau de service élevé malgré un volume important de messages, et expliquer rapidement la valeur d'une solution IA parfois perçue comme complexe. Le véritable défi était de démontrer rapidement le bénéfice métier — pas de présenter la technologie.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Recherche marché</h4>
          <p>Analyse des conciergeries traditionnelles et des problématiques des propriétaires de locations courte durée. Points de friction identifiés : disponibilité permanente, répétition des tâches, gestion multilingue.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>Architecture de l'info</h4>
          <p>Restructuration du discours autour des bénéfices : gain de temps, amélioration de l'expérience voyageur, disponibilité 24h/24, réduction de la charge mentale — plutôt que la technologie.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>UX Design</h4>
          <p>Parcours conçu pour répondre en quelques secondes à : qu'est-ce que le produit, comment fonctionne-t-il, pourquoi est-il utile, comment l'essayer.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">04</span>
          <h4>UI & Développement</h4>
          <p>Interface moderne et rassurante axée lisibilité, hiérarchie et confiance. Maquettes UI, responsive, intégration, optimisation SEO et cohérence visuelle globale.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Résultat</h3>
        <p>Une solution technologique complexe transformée en expérience claire et orientée utilisateur. La plateforme met désormais l'accent sur les bénéfices concrets : disponibilité 24h/24, automatisation des demandes répétitives, amélioration de l'expérience voyageur, simplification de la gestion quotidienne.</p>
      </div>
      <div class="proj-case-block">
        <h3>Ce que j'ai appris</h3>
        <p>Ce projet a renforcé mes compétences en Product Thinking, UX Strategy, Conversion Design et communication produit. Il a confirmé l'importance de concevoir à partir des besoins utilisateurs plutôt qu'à partir de la technologie elle-même.</p>
      </div>
      <div class="proj-case-role">
        <span>Discovery</span>
        <span>Architecture de l'information</span>
        <span>UX Design</span>
        <span>UI Design</span>
        <span>Wireframing</span>
        <span>Prototypage</span>
        <span>Développement</span>
        <span>Intégration web</span>
        <span>Responsive Design</span>
        <span>Optimisation SEO</span>
      </div>
    </div>

    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-3.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/conciergio-4.jpg" alt="El Conciergio" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-subtitle">Product Design Case Study</div>
        <div class="proj-split-block">
          <h3>Contexte</h3>
          <p>El Conciergio est une solution de conciergerie alimentée par l'intelligence artificielle destinée aux propriétaires Airbnb, gîtes et locations saisonnières. L'objectif du produit est de répondre automatiquement aux demandes récurrentes des voyageurs via WhatsApp afin de réduire la charge opérationnelle des hôtes et d'améliorer l'expérience client. Mon rôle consistait à concevoir une plateforme capable de présenter une technologie complexe de manière simple, rassurante et orientée conversion.</p>
        </div>
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Les propriétaires de locations saisonnières font face à plusieurs difficultés : répondre aux mêmes questions plusieurs fois par jour, gérer les demandes à toute heure, maintenir un niveau de service élevé malgré un volume important de messages, et expliquer rapidement la valeur d'une solution IA parfois perçue comme complexe. Le véritable défi était de démontrer rapidement le bénéfice métier — pas de présenter la technologie.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Recherche marché</h4>
              <p>Analyse des conciergeries traditionnelles et des problématiques des propriétaires de locations courte durée. Points de friction identifiés : disponibilité permanente, répétition des tâches, gestion multilingue.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Architecture de l'info</h4>
              <p>Restructuration du discours autour des bénéfices : gain de temps, amélioration de l'expérience voyageur, disponibilité 24h/24, réduction de la charge mentale — plutôt que la technologie.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>UX Design</h4>
              <p>Parcours conçu pour répondre en quelques secondes à : qu'est-ce que le produit, comment fonctionne-t-il, pourquoi est-il utile, comment l'essayer.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>UI & Développement</h4>
              <p>Interface moderne et rassurante axée lisibilité, hiérarchie et confiance. Maquettes UI, responsive, intégration, optimisation SEO et cohérence visuelle globale.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Une solution technologique complexe transformée en expérience claire et orientée utilisateur. La plateforme met désormais l'accent sur les bénéfices concrets : disponibilité 24h/24, automatisation des demandes répétitives, amélioration de l'expérience voyageur, simplification de la gestion quotidienne.</p>
        </div>
        <div class="proj-split-block">
          <h3>Ce que j'ai appris</h3>
          <p>Ce projet a renforcé mes compétences en Product Thinking, UX Strategy, Conversion Design et communication produit. Il a confirmé l'importance de concevoir à partir des besoins utilisateurs plutôt qu'à partir de la technologie elle-même.</p>
        </div>
        <div class="proj-split-role">
          <span>Discovery</span>
          <span>Architecture de l'information</span>
          <span>UX Design</span>
          <span>UI Design</span>
          <span>Wireframing</span>
          <span>Prototypage</span>
          <span>Développement</span>
          <span>Intégration web</span>
          <span>Responsive Design</span>
          <span>Optimisation SEO</span>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-3.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/conciergio-4.jpg" alt="El Conciergio" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN case+content region**

In `en/el-conciergio.html`, find:

```html
    <div class="proj-case">
      <div class="proj-case-subtitle">Product Design Case Study</div>
      <div class="proj-case-block">
        <h3>Context</h3>
        <p>El Conciergio is an AI-powered concierge solution built for Airbnb hosts, gîte owners and short-term rental operators. The product's goal is to automatically answer travelers' recurring questions over WhatsApp, cutting down hosts' operational load while improving the guest experience. My role was to design a platform capable of presenting a genuinely complex technology in a way that felt simple, reassuring and conversion-focused.</p>
      </div>
      <div class="proj-case-block">
        <h3>The problem</h3>
        <p>Short-term rental owners face a recurring set of pains: answering the same questions several times a day, fielding requests at all hours, keeping service quality high despite a heavy volume of messages, and quickly explaining the value of an AI solution that can come across as complex. The real challenge was proving the business benefit fast — not showcasing the technology.</p>
      </div>
      <div class="proj-case-steps">
        <div class="proj-case-step">
          <span class="proj-case-step-num">01</span>
          <h4>Market research</h4>
          <p>Analysis of traditional concierge services and the pain points of short-term rental owners. Key friction points identified: round-the-clock availability, repetitive tasks, multilingual support.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">02</span>
          <h4>Information architecture</h4>
          <p>Restructured the messaging around outcomes — time saved, a better guest experience, 24/7 availability, less mental load for hosts — rather than the technology itself.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">03</span>
          <h4>UX Design</h4>
          <p>A flow built to answer, within seconds, four questions: what the product is, how it works, why it matters, and how to try it.</p>
        </div>
        <div class="proj-case-step">
          <span class="proj-case-step-num">04</span>
          <h4>UI & Development</h4>
          <p>A modern, reassuring interface built around readability, hierarchy and trust. UI mockups, responsive build, integration, SEO optimization and overall visual consistency.</p>
        </div>
      </div>
      <div class="proj-case-block">
        <h3>Result</h3>
        <p>A genuinely complex piece of technology turned into a clear, user-first experience. The platform now leads with concrete benefits: 24/7 availability, automated handling of repetitive requests, a better guest experience, and simpler day-to-day management for hosts.</p>
      </div>
      <div class="proj-case-block">
        <h3>What I learned</h3>
        <p>This project sharpened my skills in Product Thinking, UX Strategy, Conversion Design and product communication. It confirmed how much stronger a design gets when it starts from user needs rather than from the technology itself.</p>
      </div>
      <div class="proj-case-role">
        <span>Discovery</span>
        <span>Information architecture</span>
        <span>UX Design</span>
        <span>UI Design</span>
        <span>Wireframing</span>
        <span>Prototyping</span>
        <span>Development</span>
        <span>Web integration</span>
        <span>Responsive Design</span>
        <span>SEO Optimization</span>
      </div>
    </div>

    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-3.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--center">
        <div class="proj-media-wrap">
          <img src="/img/work/conciergio-4.jpg" alt="El Conciergio" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-subtitle">Product Design Case Study</div>
        <div class="proj-split-block">
          <h3>Context</h3>
          <p>El Conciergio is an AI-powered concierge solution built for Airbnb hosts, gîte owners and short-term rental operators. The product's goal is to automatically answer travelers' recurring questions over WhatsApp, cutting down hosts' operational load while improving the guest experience. My role was to design a platform capable of presenting a genuinely complex technology in a way that felt simple, reassuring and conversion-focused.</p>
        </div>
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>Short-term rental owners face a recurring set of pains: answering the same questions several times a day, fielding requests at all hours, keeping service quality high despite a heavy volume of messages, and quickly explaining the value of an AI solution that can come across as complex. The real challenge was proving the business benefit fast — not showcasing the technology.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Market research</h4>
              <p>Analysis of traditional concierge services and the pain points of short-term rental owners. Key friction points identified: round-the-clock availability, repetitive tasks, multilingual support.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Information architecture</h4>
              <p>Restructured the messaging around outcomes — time saved, a better guest experience, 24/7 availability, less mental load for hosts — rather than the technology itself.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>UX Design</h4>
              <p>A flow built to answer, within seconds, four questions: what the product is, how it works, why it matters, and how to try it.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>UI & Development</h4>
              <p>A modern, reassuring interface built around readability, hierarchy and trust. UI mockups, responsive build, integration, SEO optimization and overall visual consistency.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A genuinely complex piece of technology turned into a clear, user-first experience. The platform now leads with concrete benefits: 24/7 availability, automated handling of repetitive requests, a better guest experience, and simpler day-to-day management for hosts.</p>
        </div>
        <div class="proj-split-block">
          <h3>What I learned</h3>
          <p>This project sharpened my skills in Product Thinking, UX Strategy, Conversion Design and product communication. It confirmed how much stronger a design gets when it starts from user needs rather than from the technology itself.</p>
        </div>
        <div class="proj-split-role">
          <span>Discovery</span>
          <span>Information architecture</span>
          <span>UX Design</span>
          <span>UI Design</span>
          <span>Wireframing</span>
          <span>Prototyping</span>
          <span>Development</span>
          <span>Web integration</span>
          <span>Responsive Design</span>
          <span>SEO Optimization</span>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-2.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <video src="/videos/conciergio-3.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/conciergio-4.jpg" alt="El Conciergio" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--\|proj-case" fr/el-conciergio.html en/el-conciergio.html`
Expected: `fr/el-conciergio.html:0` and `en/el-conciergio.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/el-conciergio.html en/el-conciergio.html
git commit -m "feat: reflow El Conciergio case study into sticky split layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Hormone Concept (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/hormone-concept.html`
- Modify: `en/hormone-concept.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/hormone-concept.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/hormone-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-2.webp" alt="Hormone Concept" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-3.webp" alt="Hormone Concept" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Une boutique de revente sneakers avait besoin d'une mise en valeur produit tendue et immédiate, avec un catalogue à alimenter en continu.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>DA & thème Shopify custom</h4>
              <p>Thème Shopify entièrement sur-mesure, pensé pour une présentation produit directe et sans fioriture.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>App de scrapping</h4>
              <p>Développement d'une app dédiée pour automatiser l'ajout de nouvelles paires au catalogue.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Street shooting IA</h4>
              <p>Génération de visuels street shooting par IA pour habiller l'univers de la marque.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Un store rapide, visuellement tendu, avec un catalogue qui s'alimente sans intervention manuelle.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/hormone-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-2.webp" alt="Hormone Concept" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-3.webp" alt="Hormone Concept" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/hormone-concept.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/hormone-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-2.webp" alt="Hormone Concept" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-3.webp" alt="Hormone Concept" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>A sneaker resale store needed sharp, immediate product presentation, with a catalogue that keeps growing.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Custom Shopify theme</h4>
              <p>Fully bespoke Shopify theme built for direct, no-frills product presentation.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Scraping app</h4>
              <p>Built a dedicated app to automate adding new pairs to the catalogue.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>AI street shooting</h4>
              <p>Generated street-shooting visuals via AI to dress the brand's world.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A fast, visually sharp store with a catalogue that fills itself, no manual work required.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/hormone-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-2.webp" alt="Hormone Concept" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/hormone-3.webp" alt="Hormone Concept" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--" fr/hormone-concept.html en/hormone-concept.html`
Expected: `fr/hormone-concept.html:0` and `en/hormone-concept.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/hormone-concept.html en/hormone-concept.html
git commit -m "feat: add case study + split layout to Hormone Concept page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 10: Kozy Sneakers (fr + en) — no existing case study, write one

**Files:**
- Modify: `fr/kozy-sneakers.html`
- Modify: `en/kozy-sneakers.html`

- [ ] **Step 1: Replace the FR content region**

In `fr/kozy-sneakers.html`, find:

```html
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/kozy-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-2.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-3.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>Le problème</h3>
          <p>Alimenter un catalogue sneakers à grande échelle sans effort manuel, tout en gardant une identité de marque cohérente.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>DA & thème Shopify custom</h4>
              <p>Conception d'un thème Shopify entièrement sur-mesure pour la boutique de revente.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>App de scrapping sur-mesure</h4>
              <p>Développement d'une app de scrapping pour automatiser l'ajout de nouvelles paires au catalogue.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Mise en avant produit</h4>
              <p>Sections pensées pour une mise en valeur produit claire et efficace.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Résultat</h3>
          <p>Un catalogue auto-alimenté et un store cohérent, du design au développement.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/kozy-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-2.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-3.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the EN content region**

In `en/kozy-sneakers.html`, find:

```html
    <!-- Content blocks -->
    <div class="proj-content">
      <div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <video src="/videos/kozy-1.mp4" autoplay muted loop playsinline></video>
        </div>
      </div>
      <div class="proj-block proj-block--duo">
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-2.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-3.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
      </div>
    </div>
```

Replace with:

```html
    <!-- Case study + media -->
    <div class="proj-split">
      <div class="proj-split-case">
        <div class="proj-split-block">
          <h3>The problem</h3>
          <p>Feeding a sneaker catalogue at scale without manual effort, while keeping a coherent brand identity.</p>
        </div>
        <div class="proj-timeline">
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Custom Shopify theme</h4>
              <p>Designed a fully bespoke Shopify theme for the resale store.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Bespoke scraping app</h4>
              <p>Built a scraping app to automate adding new pairs to the catalogue.</p>
            </div>
          </div>
          <div class="proj-timeline-step">
            <div class="proj-timeline-marker">
              <span class="proj-timeline-dot"></span>
              <span class="proj-timeline-line"></span>
            </div>
            <div class="proj-timeline-content">
              <h4>Product-first sections</h4>
              <p>Sections built for clear, effective product presentation.</p>
            </div>
          </div>
        </div>
        <div class="proj-split-block">
          <h3>Result</h3>
          <p>A self-feeding catalogue and a coherent store, from design through development.</p>
        </div>
      </div>
      <div class="proj-split-media">
        <div class="proj-media-wrap">
          <video src="/videos/kozy-1.mp4" autoplay muted loop playsinline></video>
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-2.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
        <div class="proj-media-wrap">
          <img src="/img/work/kozy-3.webp" alt="Kozy Sneakers" loading="lazy">
        </div>
      </div>
    </div>
```

- [ ] **Step 3: Verify**

Run: `grep -c "proj-content\|proj-block--" fr/kozy-sneakers.html en/kozy-sneakers.html`
Expected: `fr/kozy-sneakers.html:0` and `en/kozy-sneakers.html:0`

- [ ] **Step 4: Commit**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add fr/kozy-sneakers.html en/kozy-sneakers.html
git commit -m "feat: add case study + split layout to Kozy Sneakers page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 11: Build + full regression check

**Files:** none (verification only)

- [ ] **Step 1: Build**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
npm run build
```
Expected: `✓ built in ...` with no errors.

- [ ] **Step 2: Confirm no stray old classes remain anywhere in fr/en**

```bash
grep -rn "proj-case\|proj-content\|proj-block--" fr/ en/ --include="*.html"
```
Expected: no output.

- [ ] **Step 3: Start (or reuse) the dev server**

```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
npm run dev -- --port 5173 --strictPort > /tmp/vite-dev-verify.log 2>&1 &
sleep 2
cat /tmp/vite-dev-verify.log
```
Expected: `VITE ... ready` (or a `--strictPort` error if a server from a previous session is already using 5173 — in that case just reuse the existing one).

- [ ] **Step 4: Verify sticky positioning is actually applied (computed style check)**

Use a headless browser (Playwright, installed earlier in this project's session under a scratch dir — reinstall if unavailable: `npm install --no-save playwright && npx playwright install chromium` in a scratch directory) to load each of the 9 fr pages and assert `getComputedStyle(document.querySelector('.proj-split-case')).position === 'sticky'` at a desktop viewport (≥1024px width), and `=== 'static'` at a mobile viewport (<768px width). Also assert zero console errors per page (`page.on('pageerror', ...)`), the same way the marquee-freeze fix was verified earlier in this session.

Expected for every one of `mercure, rougail, brenda, sonnyvizion, arimont, holora, el-conciergio, hormone-concept, kozy-sneakers`: `position: sticky` on desktop, `position: static` on mobile, zero console/page errors, page load under 1 second (confirms no repeat of the earlier marquee-freeze bug).

- [ ] **Step 5: Visual spot-check**

Take a full-page screenshot of `fr/el-conciergio.html` (richest case study, most content) at 1440px width and review it: case study column should stay pinned while scrolling past the media column, timeline dots/line should render, no visual overflow or overlap.

- [ ] **Step 6: Final commit (only if Steps 1-5 required any fixups)**

If any fixups were needed, commit them:
```bash
cd "/Users/inspee/Documents/S/PORTFOLIO 2026"
git add -A
git commit -m "fix: address issues found during split-layout regression check

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
