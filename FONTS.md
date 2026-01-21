# FONTS Configuration

## 📁 Polices disponibles

Toutes les polices sont hébergées localement dans `/fonts/` en format **WOFF2** (optimisé pour le web).

### 1. **PPMori** (Mori)
- **PPMori-Regular.woff2** - Poids régulier (400)
- **PPMori-Semibold.woff2** - Poids semi-gras (600)
- **PPMori-Black.woff2** - Poids gras (900)
- **Catégorie**: Sans-serif moderne
- **Utilisation**: Body text, paragraphes, contenu principal
- **Weight range**: 400, 600, 900

### 2. **DKS Grooveziilla** (Personal Use)
- **DKS GroovezillaPersonalUse-Reg.woff2** - Poids régulier
- **Catégorie**: Display / Headline
- **Utilisation**: Titres, headlines, sections importantes
- **Weight**: 400
- **Note**: License "Personal Use" - À vérifier pour usage commercial

### 3. **Pix32**
- **Pix32.woff2** - Font pixelisée / bitmap (format optimisé)
- **Catégorie**: Display / Accent (utilisée avec parcimonie)
- **Utilisation**: Accents visuels, logos, éléments spéciaux
- **Note**: À utiliser modérément pour meilleur effet visuel

---

## 🎨 Utilisation recommandée

### Hiérarchie typographique

```css
/* Headlines / Display */
h1, h2, .headline {
  font-family: 'DKS Grooveziilla', serif;
  font-weight: 400;
}

/* Body text principal */
body, p, li {
  font-family: 'PPMori', sans-serif;
  font-weight: 400;
}

### Accents spéciaux / Logo
```css
.logo, .special-accent {
  font-family: 'Pix32', monospace;
  font-weight: 400;
  /* À utiliser avec parcimonie */
}

/* Titres secondaires */
h3, h4 {
  font-family: 'PPMori', sans-serif;
  font-weight: 900;
}
```

---

## 📝 @font-face Declarations

À ajouter dans `style.css` (ou fichier CSS séparé):

```css
/* PPMori Regular */
@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* PPMori Semibold */
@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori-Semibold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

/* PPMori Black */
@font-face {
  font-family: 'PPMori';
  src: url('/fonts/PPMori-Black.woff2') format('woff2');
  font-weight: 900;
  font-display: swap;
}

/* DKS Grooveziilla */
@font-face {
  font-family: 'DKS Grooveziilla';
  src: url('/fonts/DKS GroovezillaPersonalUse-Reg.woff2') format('woff2');
 

/* Pix32 - Display/Accent font */
@font-face {
  font-family: 'Pix32';
  src: url('/fonts/Pix32.woff2') format('woff2');
  font-display: swap;
} font-weight: 400;
  font-display: swap;
}
```

---

## ⚡ Performance

- **WOFF2**: Format le plus compressé pour le web (~70% réduction vs TTF)
- **font-display: swap**: Affiche le fallback immédiatement, puis échange une fois chargée
- **Preload critique** (optionnel dans `index.html`):
  ```html
  <link rel="preload" href="/fonts/PPMori-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/DKS GroovezillaPersonalUse-Reg.woff2" as="font" type="font/woff2" crossorigin>
  ```

---

## 📋 Checklist d'implémentation

- [ ] Ajouter `@font-face` dans `style.css`
- [ ] Vérifier les chemins `/fonts/` dans les déclarations
- [ ] Tester le chargement des fonts en local (`npm run dev`)
- [ ] Vérifier le Lighthouse (penalty font-related)
- [ ] Valider sur mobile (gestion du fallback)
- [ ] Vérifier licence commerciale pour "DKS Grooveziilla"

---

## 🔗 Chemins des fichiers

```
root/
├── fonts/
│   ├── PPMori-Regular.woff2
│   ├── PPMori-Semibold.woff2
│   ├── PPMori-Black.woff2
│   └── DKS GroovezillaPersonalUse-Reg.woff2
├── style.css (contient @font-face)
└── [autres fichiers]
```

Dans les fichiers CSS, utiliser: `url('/fonts/nom-police.woff2')`
