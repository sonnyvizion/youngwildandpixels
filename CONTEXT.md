# PROJECT CONTEXT























































































































































































































































































- **Backlinks**: [Ahrefs](https://ahrefs.com/), [Semrush](https://semrush.com/)- **Performance**: [PageSpeed Insights](https://pagespeed.web.dev/)- **Schema Validator**: [Schema.org validator](https://validator.schema.org/)- **Meta Tag Validator**: [Meta Tags](https://metatags.io/)- **SEO Audit**: [Lighthouse](https://developers.google.com/web/tools/lighthouse)## 🛠️ Tools---- [ ] Social media profiles linked- [ ] Bing Webmaster Tools setup- [ ] Google Analytics 4 installed- [ ] Google Search Console setup- [ ] Lighthouse audit > 90 all metrics- [ ] Open Graph images (1200x630px) created- [ ] Schema.org structured data on homepage- [ ] All meta tags added to all pages- [ ] sitemap.xml generated- [ ] robots.txt configured## 📋 Deployment Checklist (Before Live)---```<a href="https://twitter.com/youngwildpixel" rel="noopener">Twitter</a><a href="https://linkedin.com/company/youngwildpixel" rel="noopener">LinkedIn</a><a href="https://instagram.com/youngwildpixel" rel="noopener">Instagram</a>```html### Social Links (Footer)```<meta property="og:url" content="https://www.linkedin.com/company/youngwildpixel"><!-- LinkedIn --><link rel="alternate" href="instagram://profile/youngwildpixel"><!-- Instagram -->```html### Social Media Meta Tags## 🔗 Backlinks & Social---- SEO: > 90- Best Practices: > 90- Accessibility: > 90- Performance: > 90### Performance (Lighthouse)- Lastmod: à jour lors des déploiements- Priorité: 1.0 pour accueil, 0.8 pour autres pages- Lister toutes les pages statiques### Sitemap.xml (générer avec Vite plugin)```Sitemap: https://youngwildpixel.com/sitemap.xmlDisallow: /admin/Allow: /User-agent: *```### Robots.txt## 📱 Technical SEO---- Lowercase uniquement- Hyphens `-` pour séparer les mots- Pas de paramètres inutiles- URLs courtes et descriptivesBest practices:```youngwildpixel.com/contact/youngwildpixel.com/a-propos/youngwildpixel.com/services/youngwildpixel.com/projets/youngwildpixel.com/```## 🔗 URL Structure---```     height="600">     width="1200"      loading="lazy"      alt="Hero section avec design moderne Young, Wild & Pixel Agency" <img src="/images/hero-design.webp" ```htmlExample:- **Lazy loading**: `<img loading="lazy">`- **Compression**: TinyPNG / Squoosh- **Format**: WebP (principal) + PNG fallback- **Filename SEO**: `agency-hero-design.webp` (pas `IMG_2024_01.png`)- **Alt text obligatoire**: `<img alt="Description pertinente">`## 🖼️ Image Optimization---```    <h3>Projet 1</h3>  <h2>Nos Réalisations</h2>    <h3>Design Graphique</h3>    <h3>Création de Sites Web</h3>  <h2>Nos Services</h2><h1>Young, Wild & Pixel Agency</h1>```html### Heading Hierarchy Example- [ ] Page speed > 90 Lighthouse- [ ] Mobile-friendly (responsive)- [ ] Structured data (schema.org)- [ ] Internal links vers autres pages- [ ] Alt text sur toutes les images- [ ] H2/H3 hiérarchisés- [ ] H1 unique (une seule par page)- [ ] Meta description (150-160 characters)- [ ] Unique `<title>` (50-60 characters)### Each Page Must Have:## 📊 On-Page SEO Checklist---- Agence création site [Région]- Web design [Ville]### Location-Based (si applicable)- Design web audacieux- Site web performant et moderne- Agence web design Paris- Création de site web pour particulier### Long-tail Keywords- Développement web- Web design moderne- Création site web- Agence web design### Primary Keywords## 🔍 Keyword Strategy---```<meta name="description" content="Décourez l'histoire et les valeurs de Young, Wild & Pixel Agency, agence web design moderne."><title>À Propos - Young, Wild & Pixel Agency</title>```html### about.html (À propos)```<meta name="description" content="Parlons de votre projet web ! Contactez Young, Wild & Pixel Agency pour une consultation gratuite."><title>Contact - Young, Wild & Pixel Agency</title>```html### contact.html (Contact)```<meta name="description" content="Nos services : création de sites web, design graphique, animations GSAP, optimisation SEO et performance Lighthouse > 90."><title>Services - Création Site Web | Young, Wild & Pixel Agency</title>```html### services.html (Services)```<meta name="description" content="Décourez nos projets web design : sites modernes, animations fluides, designs innovants pour particuliers et petites entreprises."><title>Nos Réalisations - Young, Wild & Pixel Agency</title>```html### projects.html (Portfolio)```<meta name="description" content="Agence web design spécialisée dans la création de sites internet modernes, audacieux et performants pour particuliers et PME."><title>Young, Wild & Pixel Agency - Création de Sites Web Modernes</title>```html### index.html (Accueil)## 📄 Page-Specific Meta Tags---```</script>}  "priceRange": "$$"  "url": "https://youngwildpixel.com/",  "telephone": "+33-X-XX-XX-XX-XX",  },    "addressCountry": "FR"    "addressLocality": "Paris",    "@type": "PostalAddress",  "address": {  "description": "Agence de création de sites web modernes",  "image": "https://youngwildpixel.com/logo.png",  "name": "Young, Wild & Pixel Agency",  "@type": "LocalBusiness",  "@context": "https://schema.org",{<script type="application/ld+json">```html### LocalBusiness Schema (si applicable)```</script>}  }    "email": "hello@youngwildpixel.com"    "contactType": "Customer Service",    "telephone": "+33-X-XX-XX-XX-XX",    "@type": "ContactPoint",  "contactPoint": {  ],    "https://twitter.com/youngwildpixel"    "https://www.linkedin.com/company/youngwildpixel",    "https://www.instagram.com/youngwildpixel",  "sameAs": [  "description": "Agence web design spécialisée dans la création de sites web modernes et performants",  "logo": "https://youngwildpixel.com/logo.png",  "url": "https://youngwildpixel.com/",  "name": "Young, Wild & Pixel Agency",  "@type": "Organization",  "@context": "https://schema.org",{<script type="application/ld+json">```html### Organization Schema (à ajouter dans `<head>`)## 🏢 Schema.org Structured Data---```<meta name="theme-color" content="#FF6565"><!-- Theme Color --><link rel="canonical" href="https://youngwildpixel.com/"><!-- Canonical --><meta property="twitter:image" content="https://youngwildpixel.com/twitter-image.png"><meta property="twitter:description" content="Création de sites web modernes, audacieux et performants."><meta property="twitter:title" content="Young, Wild & Pixel Agency"><meta property="twitter:url" content="https://youngwildpixel.com/"><meta property="twitter:card" content="summary_large_image"><!-- Twitter --><meta property="og:image" content="https://youngwildpixel.com/og-image.png"><meta property="og:description" content="Agence web design spécialisée dans la création de sites web modernes, audacieux et performants."><meta property="og:title" content="Young, Wild & Pixel Agency - Création de Sites Web Modernes"><meta property="og:url" content="https://youngwildpixel.com/"><meta property="og:type" content="website"><!-- Open Graph / Facebook --><meta name="robots" content="index, follow"><meta name="author" content="Young, Wild & Pixel Agency"><meta name="keywords" content="agence web design, création site web, web design moderne, développement web, design graphique"><meta name="description" content="Young, Wild & Pixel Agency - Création de sites web modernes, audacieux et performants. Design innovant, animations fluides, performance optimale."><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="UTF-8"><!-- Primary Meta Tags -->```html### Global Meta Tags (à ajouter dans `<head>`)## 📝 Meta Tags & Structured Data---- Primary pages: Accueil, Portfolio, Services, Contact, À propos- Target audience: Particuliers & petites entreprises cherchant un nouveau site web- Rank for: "agence web design", "création site web", "web design moderne"## 🎯 SEO Objectives## 🎯 About the Agency

**Name**: Young, Wild & Pixel Agency  
**Mission**: Création de sites web modernes, audacieux et performants pour particuliers et petites entreprises  
**Specialization**: Web design, UI/UX, animations fluides, performance optimale

## Goal
Website portfolio for a creative web design agency.
Strong focus on design, UI/UX, smooth animations, and performance.
The site must feel modern, bold, and fluid while staying clear and fast.

## STACK

Framework: None (Vite vanilla setup)  
Language: HTML + CSS + JavaScript (ES Modules)

Build & Dev:
- Vite (vanilla)
- Local dev server via Vite
- Production build with optimized assets

Styling:
- Vanilla CSS
- Mobile-first approach
- BEM naming convention
- No CSS framework

Animations:
- GSAP as the main animation library
- ScrollTrigger allowed
- No other animation libraries

Routing:
- Static multi-page website
- Separate HTML files per page
- No client-side router

Assets:
- SVG inline when animated
- Images optimized (WebP preferred)
- **Local fonts in `/fonts/` directory** (see FONTS.md)

Content:
- Static content directly in HTML
- No CMS
- No external data fetching

Constraints:
- Pixel-perfect implementation from design
- Responsive mobile-first
- Smooth, subtle animations (no over-animation)
- Lighthouse score > 90
- Basic accessibility (semantic HTML, focus states, contrast)
- No console errors
- Clean, modular JavaScript (no monolithic files)

Tooling:
- Prettier for formatting
- Optional ESLint
- Git versioning
- Deployment: Netlify or Vercel

## Rules for AI assistance
- Always read this file before coding
- Do not assume or invent design decisions
- If information is missing, propose options and ask before implementing
- Work in small, focused tasks (one section or component at a time)
- Respect file structure and naming conventions strictly
