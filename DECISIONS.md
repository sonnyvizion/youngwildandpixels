# DECISIONS - Log des décisions architecturales

## 📌 Format ADR (Architecture Decision Record)

Pour chaque décision: **Titre** | **Contexte** | **Décision** | **Conséquences** | **Statut**

---

## ADR-001: Stack technique vanilla sans framework

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Site portfolio pour agence créative nécessitant contrôle total sur animations, performance et design pixel-perfect.

### Décision
Utiliser **Vite vanilla** (HTML + CSS + JavaScript ES Modules) plutôt que React/Vue/Svelte.

### Justification
- ✅ Contrôle total sur le rendu et animations
- ✅ Zero overhead de framework
- ✅ Performance optimale (Lighthouse > 90)
- ✅ Bundle size minimal
- ✅ Pas de dépendances complexes
- ❌ Plus de code manuel pour réactivité
- ❌ Scaling limité si besoin SPA futur

### Conséquences
- Pas de virtual DOM
- Manipulation DOM manuelle (mais minimaliste)
- Code bien structuré obligatoire
- Équipe: Vanilla JS + CSS requis

---

## ADR-002: GSAP comme unique lib d'animation

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Besoin d'animations fluides et performantes (parallax, scroll triggers, interactions).

### Décision
**GSAP seule** + ScrollTrigger plugin (pas Framer Motion, Three.js, etc).

### Justification
- ✅ Librairie d'animation la plus performante (GPU acceleration)
- ✅ ScrollTrigger inclus pour animations au scroll
- ✅ Timeline API intuitive et puissante
- ✅ Licence gratuite pour projets non-commerciaux
- ✅ Matériel d'apprentissage abondant
- ❌ Dépendance externe (mais légère)
- ❌ Pas d'effet 3D complexe (Three.js non utilisé)

### Conséquences
- Acquérir les skills GSAP (timeline, tweens, easing)
- Pas de mélange avec Anime.js, Motion.js, etc.
- ScrollTrigger pattern standard pour animations au défilement

---

## ADR-003: CSS vanille avec BEM et variables CSS

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Besoin de styles maintenables, performants et sans surcoûts.

### Décision
**CSS vanille** avec:
- BEM naming convention
- Variables CSS (custom properties)
- Mobile-first approach
- Pas de Tailwind/Bootstrap/SCSS

### Justification
- ✅ Performance (pas de compilation)
- ✅ Cohérence BEM = lisibilité
- ✅ Variables CSS = thème dynamique possible
- ✅ Codebase contrôlable et transparent
- ❌ Plus de CSS à écrire
- ❌ Pas d'utility classes (Tailwind)
- ❌ Préprocesseur SCSS manquant

### Conséquences
- Discipline stricte sur nommage BEM
- Fichiers CSS bien organisés (base, layout, components, pages)
- Variables centralisées pour couleurs/espacements
- Media queries mobiles-d'abord systématiquement

---

## ADR-004: Architecture modulaire JavaScript

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Code JavaScript doit être maintenable, testable et scalable sans framework.

### Décision
Structure en **modules ES6**:
- `src/js/modules/` : Logique métier spécifique
- `src/js/utils/` : Code réutilisable
- `main.js` : Orchestration centrale

### Justification
- ✅ Séparation des concerns claire
- ✅ Imports/exports explicites
- ✅ Chaque module autonome et testable
- ✅ Tree-shaking automatique (Vite)
- ✅ Pas de dépendances cachées
- ❌ Import statements obligatoires
- ❌ Async/await complexity

### Conséquences
- Chaque feature = nouveau module
- Pattern init() standard pour initialisation
- main.js décourage l'orchestration complexe
- Équipe doit comprendre ES modules

---

## ADR-005: Pages statiques HTML (pas de SPA router)

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Site statique avec quelques pages (accueil, projets, services, contact, about).

### Décision
Fichiers HTML **séparés** (index.html, projects.html, services.html, etc.) plutôt que client-side router (React Router).

### Justification
- ✅ Simplicity (pas de URL management code)
- ✅ SEO natif (chaque page = HTML complet)
- ✅ Vite handle automatiquement
- ✅ Chaque page peut avoir scripts spécifiques
- ❌ Plus de HTML duplication (header/footer)
- ❌ Pas de smooth page transitions natives
- ❌ State management entre pages complexe

### Conséquences
- Composants HTML réutilisés (header, footer, nav)
- Chaque page importe modules nécessaires
- Animations page-to-page gérées avec GSAP
- Partage d'état : localStorage si nécessaire

---

## ADR-006: Vite comme bundler & dev server

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Build setup requis pour optimisation et dev experience.

### Décision
**Vite** plutôt que Webpack/Parcel/esbuild.

### Justification
- ✅ HMR instantané (dev experience optimale)
- ✅ Build ultrarapide (esbuild backend)
- ✅ Tree-shaking automatique
- ✅ Optimisation assets native
- ✅ Config minimale
- ✅ Support ES modules natifs
- ❌ Écosystème plugins moins mature que Webpack

### Conséquences
- `npm run dev` pour development
- `npm run build` pour production
- `dist/` généré pour deployment
- Vite.config.js minimal et lisible

---

## ADR-007: Déploiement sur Netlify ou Vercel

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Besoin de déploiement rapide, gratuit, avec HTTPS et CDN.

### Décision
**Netlify** (principal) ou **Vercel** (fallback).

### Justification
- ✅ Deploy gratuit avec git (push = live)
- ✅ Build preview automatique
- ✅ HTTPS, CDN, compression globales
- ✅ Serverless functions optionnelles (contact form)
- ✅ Zero configuration
- ❌ Vendor lock-in (facile à switcher)
- ❌ Limites gratuites (rarement atteintes)

### Conséquences
- netlify.toml ou vercel.json config minimale
- `npm run build` doit être le build command
- `dist/` est la publish directory
- Forms : Netlify Forms ou formspree
- Monitoring : Netlify Analytics optionnel

---

## ADR-008: Accessibilité WCAG AA

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Portfolio professionnel doit être accessible à tous.

### Décision
Respecter **WCAG 2.1 AA** (minimum):
- Sémantique HTML stricte
- Contraste ≥ 4.5:1 (AAA pour headlines)
- Focus indicators visibles
- Alt text sur images
- Respect prefers-reduced-motion

### Justification
- ✅ Standard de l'industrie
- ✅ Legal compliance (certains pays)
- ✅ Meilleur SEO
- ✅ Inclusivité clients
- ❌ Overhead minimal en dev

### Conséquences
- Audit accessibility avant live
- Tests clavier systématiques
- Tests lecteur d'écran (NVDA/JAWS)
- CSS animations respectent prefers-reduced-motion

---

## ADR-009: Performance Lighthouse > 90

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Site portfolio doit démontrer excellence technique et rapidité.

### Décision
**Lighthouse score ≥ 90** sur tous les critères (Performance, Accessibility, Best Practices, SEO).

### Justification
- ✅ Démontre expertise technique
- ✅ Better UX & conversions
- ✅ SEO ranking boost
- ✅ Portfolio = showcase de qualité
- ❌ Peut nécessiter optimisations agressives

### Conséquences
- Audits réguliers (avant chaque release)
- Images optimisées & lazy-loaded
- Code splitting minimal
- No render-blocking resources
- Preload/prefetch strategique
- Caching headers optimisés (Netlify/Vercel)

---

## ADR-010: Mobile-first CSS approach

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Majorité du trafic sur mobile ; responsive design obligatoire.

### Décision
**Mobile-first**: styles mobiles d'abord, media queries `min-width` pour enlargement.

### Justification
- ✅ Progressive enhancement naturel
- ✅ CSS plus léger (pas d'override)
- ✅ Performance mobile-first thinking
- ✅ Patterns CSS plus propre
- ❌ Breakpoints à mémoriser

### Conséquences
- Styles mobiles = default
- `@media (min-width: 768px)` pour tablet+
- `@media (min-width: 1024px)` pour desktop
- `@media (min-width: 1440px)` pour large
- Tests systématiquement mobile → desktop

---

## ADR-011: Pas de CMS / contenu statique

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Portfolio personnel ; mises à jour peu fréquentes.

### Décision
Contenu **directement dans HTML** (pas Strapi, Contentful, Sanity, etc.).

### Justification
- ✅ Zéro overhead
- ✅ Pas d'API call en production
- ✅ Performance maximale
- ✅ Déploiement ultrarapide
- ❌ Édition = commit git
- ❌ Pas de preview CMS
- ❌ Scalabilité limitée si contenu explose

### Conséquences
- Contenu directement dans `.html`
- Changes = git commits
- Mises à jour = redeploy via Netlify
- Possibilité d'ajouter CMS futur si besoin

---

## ADR-012: Pas de framework CSS (Tailwind/Bootstrap)

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Design uniquement créatif/custom ; utility classes inadaptées.

### Décision
**CSS custom uniquement** (pas Tailwind, Bootstrap, etc.).

### Justification
- ✅ Contrôle complet du design
- ✅ Pas d'override CSS complexe
- ✅ Bundle léger
- ✅ Apprendre CSS "pur"
- ❌ Plus de CSS à écrire
- ❌ Pas d'utility-first speed

### Conséquences
- Tous les styles = custom CSS
- Variables CSS pour DRY
- BEM naming = clarté
- Équipe doit maîtriser CSS

---

## ADR-013: SVG inline pour animations

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
SVG animés requis (logo, icônes interactives).

### Décision
**SVG inline dans HTML** (pas d'img tags) pour SVGs animés.

### Justification
- ✅ Access aux paths via JavaScript
- ✅ Animations GSAP possibles
- ✅ Styling CSS possible
- ✅ Performance (pas de requête HTTP)
- ❌ HTML plus verbeux
- ❌ Cache problématique si dupliqué

### Conséquences
- Crisp SVGs = inline dans HTML
- Exports Figma/Illustrator → HTML
- GSAP peut animer SVG paths
- Sprites SVG pour icônes statiques

---

## ADR-014: Fonts locales (pas Google Fonts)

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Performance optimale ; Google Fonts = requête HTTP supplémentaire.

### Décision
**Fonts hébergées localement** en `src/assets/fonts/`.

### Justification
- ✅ Zero external requests
- ✅ Performance
- ✅ Offline support
- ✅ Pas de FOUT/FOIT
- ❌ Plus gros bundle
- ❌ Multiple formats requis (woff2, woff)

### Conséquences
- Fonts en woff2 (primaire) + woff (fallback)
- `@font-face` déclarations dans CSS
- Preload fonts critiques avec `<link rel="preload">`
- Subsetting fonts si possible (réduire size)

---

## ADR-015: Pas de dependencies externes non essentielles

**Statut**: ✅ Acceptée  
**Date**: 2026-01-20

### Contexte
Portfolio doit rester léger ; dépendances = surface d'attaque et maintenance.

### Décision
**Seulement GSAP** comme dependency externe. Utilities homemade sinon.

### Justification
- ✅ Bundle minimal
- ✅ Zéro npm audit warnings
- ✅ Maintenance réduite
- ✅ Compréhension complète du code
- ❌ Réinventer la roue pour certains cas
- ❌ Moins de libs éprouvées

### Conséquences
- Utilities: format dates, fetch, helpers = custom
- GSAP = seule npm dependency production
- DevDeps: Vite, Prettier, ESLint autorisés
- Évaluation stricte avant chaque nova dépendance

---

## 📊 Summary of decisions

| ADR | Décision | Statut | Impact |
|-----|----------|--------|--------|
| 001 | Vite vanilla (no framework) | ✅ | High |
| 002 | GSAP only (animations) | ✅ | High |
| 003 | CSS + BEM + variables | ✅ | High |
| 004 | Modular ES6 JavaScript | ✅ | High |
| 005 | Static HTML pages (no SPA) | ✅ | Medium |
| 006 | Vite bundler | ✅ | High |
| 007 | Netlify/Vercel deployment | ✅ | Medium |
| 008 | WCAG AA accessibility | ✅ | Medium |
| 009 | Lighthouse > 90 | ✅ | High |
| 010 | Mobile-first CSS | ✅ | High |
| 011 | No CMS (static content) | ✅ | Medium |
| 012 | No CSS framework | ✅ | High |
| 013 | SVG inline (animated) | ✅ | Low |
| 014 | Local fonts | ✅ | Medium |
| 015 | Minimal dependencies | ✅ | High |

---

## 🔄 Révision des décisions

- **Dernier review**: 2026-01-20
- **Prochain review**: Après milestone 1 (hero + nav)
- **Feedback process**: Ajouter ADR-0XX si nouvelle décision importante
- **Escalation**: Reconsidérer ADR si Lighthouse < 85 ou perf concern
