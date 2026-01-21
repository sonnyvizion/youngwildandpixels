# ARCHITECTURE - Creative Web Agency Portfolio

## 📋 Vue d'ensemble

Site web pour une agence créative construit en vanilla JavaScript avec Vite. Architecture modulaire, statique, avec une performance optimale et animations fluides.

---

## 🏗️ Architecture Générale

```
Portfolio (Vite Vanilla)
│
├── 📄 Pages statiques (HTML)
│   ├── index.html (Accueil)
│   ├── projects.html (Portfolio)
│   ├── about.html (À propos)
│   ├── services.html (Services)
│   └── contact.html (Contact)
│
├── 🎨 Assets
│   ├── styles/ (CSS modulaire)
│   ├── images/ (Optimisées WebP)
│   ├── fonts/ (Locales)
│   └── icons/ (SVG inlinés)
│
└── ⚙️ JavaScript (ES Modules)
    ├── main.js (Point d'entrée)
    ├── modules/ (Logique métier)
    └── utils/ (Utilitaires)
```

---

## 📁 Structure des fichiers

```
root/
│
├── index.html                    # Page d'accueil
├── projects.html                 # Page portfolio/projets
├── about.html                    # Page à propos
├── services.html                 # Page services
├── contact.html                  # Page contact
│
├── main.js                       # Point d'entrée principal
├── style.css                     # Styles globaux & variables CSS
│
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── hero.js          # Section héros & animations
│   │   │   ├── navigation.js    # Menu & navigation
│   │   │   ├── animations.js    # Animations GSAP globales
│   │   │   ├── scroll.js        # Gestion scroll & ScrollTrigger
│   │   │   ├── lightbox.js      # Lightbox pour projets
│   │   │   └── forms.js         # Validation formulaires
│   │   │
│   │   └── utils/
│   │       ├── constants.js     # Constantes & breakpoints
│   │       ├── helpers.js       # Fonctions utilitaires
│   │       └── dom.js           # Manipulation DOM
│   │
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css        # Reset & normalize
│   │   │   ├── typography.css   # Typo & variables
│   │   │   └── variables.css    # Couleurs, espacements
│   │   │
│   │   ├── layout/
│   │   │   ├── header.css       # Header/nav
│   │   │   ├── footer.css       # Footer
│   │   │   └── grid.css         # Système de grille
│   │   │
│   │   ├── components/
│   │   │   ├── buttons.css      # Boutons
│   │   │   ├── cards.css        # Cartes projets
│   │   │   ├── forms.css        # Formulaires
│   │   │   └── modals.css       # Modales & lightbox
│   │   │
│   │   └── pages/
│   │       ├── hero.css         # Section héros
│   │       ├── projects.css     # Page projets
│   │       └── contact.css      # Page contact
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   └── general/
│   │   │
│   │   ├── fonts/
│   │   │   └── [fonts locales]
│   │   │
│   │   └── icons/
│   │       └── [SVG inlinés]
│
├── public/                       # Assets statiques (non traités)
│   └── favicon.ico
│
├── vite.config.js               # Configuration Vite
├── package.json
├── .prettierrc
├── .gitignore
└── README.md
```

---

## 🎯 Principes d'architecture

### 1️⃣ **Modularité CSS**
- **BEM naming**: `.block__element--modifier`
- **Variables CSS**: Couleurs, espacements, typographie centralisés
- **Mobile-first**: Styles mobiles d'abord, media queries pour desktop
- **Fichiers séparés**: Base, layout, composants, pages

### 2️⃣ **JavaScript modulaire**
- **ES Modules**: Import/export strict
- **Séparation des concerns**: 
  - `modules/`: Logique métier spécifique
  - `utils/`: Code réutilisable
- **Pas de dépendances globales**: Chaque module autonome
- **Init centralisée**: `main.js` orchestrent l'initialisation

### 3️⃣ **Performance**
- **Code splitting**: Chargement optimal des modules
- **Assets optimisés**: Images WebP, SVG inlinés
- **Lazy loading**: Images & contenu non critiques
- **Minification**: Vite s'en charge en production

### 4️⃣ **Animations**
- **GSAP uniquement**: ScrollTrigger pour animations au scroll
- **Performance**: GPU acceleration (transform, opacity)
- **Accessibilité**: Respect des préférences `prefers-reduced-motion`

---

## 🔄 Flux de données

```
User Interaction
    ↓
Event Listener (modules/)
    ↓
DOM Update / Animation (GSAP)
    ↓
Visual Feedback
```

### Exemple: Clic sur bouton CTA
```javascript
// 1. Écouteur d'événement
button.addEventListener('click', () => {
  // 2. Logique métier
  handleCTA();
  
  // 3. Animation
  gsap.to(button, { scale: 0.95 });
});
```

---

## 📱 Breakpoints responsive

```javascript
// src/js/utils/constants.js
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};
```

Media queries CSS:
```css
/* Mobile-first: styles mobiles d'abord */
.component { /* Mobile styles */ }

/* Tablet et plus */
@media (min-width: 768px) {
  .component { /* Tablet styles */ }
}

/* Desktop et plus */
@media (min-width: 1024px) {
  .component { /* Desktop styles */ }
}
```

---

## 🎬 Système d'animations

### GSAP Animations
- **Hero section**: Stagger animations, parallax
- **Scroll triggers**: Reveal au défilement
- **Hover states**: Animations fluides sur interactions
- **Page transitions**: Transitions entre pages

### Exemple pattern:
```javascript
// src/js/modules/animations.js
export function initHeroAnimation() {
  const timeline = gsap.timeline();
  
  timeline
    .fromTo('.hero__title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo('.hero__subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
}
```

---

## ♿ Accessibilité

- **Sémantique HTML**: Utiliser `<header>`, `<nav>`, `<main>`, `<section>`, etc.
- **ARIA labels**: Pour contrôles dynamiques
- **Focus management**: States visibles sur focus
- **Contraste**: WCAG AA minimum
- **Préférences utilisateur**: Respect de `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 Pipeline de développement

### Dev
```bash
npm run dev        # Vite dev server sur localhost:5173
```

### Build
```bash
npm run build      # Optimisation & minification
npm run preview    # Prévisualiser build production
```

### Linting
```bash
npm run format     # Prettier (optionnel)
npm run lint       # ESLint (optionnel)
```

### Déploiement
- **Netlify**: Deploy automatique sur push vers main
- **Vercel**: Alternative avec Edge Functions
- **Build output**: `dist/` prêt à déployer

---

## 📊 Métriques de qualité

| Métrique | Cible | Outils |
|----------|-------|--------|
| Performance | > 90 Lighthouse | Vite, optimisations |
| Accessibilité | WCAG AA | Sémantique, ARIA |
| Temps de chargement | < 2s | Code splitting, Images |
| Erreurs console | 0 | ESLint, Tests |

---

## 🔒 Normes de code

### JavaScript
- ES Modules obligatoires
- CamelCase pour variables/fonctions
- PascalCase pour classes
- Destructuration préférée
- No `var`, utiliser `const`/`let`

### CSS
- BEM naming convention
- Variables CSS pour valeurs répétées
- Pas de `!important` (exception: prefers-reduced-motion)
- Mobile-first media queries

### Commits
```
type(scope): description

feat(hero): add parallax animation
fix(nav): mobile menu toggle bug
docs(readme): update setup instructions
```

---

## 🛠️ Maintenabilité

### Ajouter une nouvelle page
1. Créer `page-name.html`
2. Importer le CSS spécifique
3. Importer & initialiser les modules
4. Ajouter dans la navigation

### Ajouter un nouveau module
1. Créer `src/js/modules/feature-name.js`
2. Exporter fonction `init()`
3. Importer & appeler dans `main.js`
4. Documenter le module

### Ajouter un composant CSS
1. Créer `src/css/components/component-name.css`
2. Suivre norme BEM
3. Importer dans `style.css` ou page spécifique
4. Tester sur mobile, tablet, desktop

---

## 📝 Notes importantes

- **Pas de CMS**: Contenu statique en HTML
- **Pas de framework**: Vanilla JS pour contrôle total
- **GSAP seul**: Ne pas mélanger avec d'autres libs d'animation
- **No breaking changes**: Tester compatibility avant déploiement
- **Lighthouse > 90**: Audit régulier obligatoire
