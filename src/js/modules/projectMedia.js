import { getHomeProjects, urlFor } from '../sanity.js'

const CATEGORY_LABELS = {
  'brand-identity': 'Brand identity',
  'web-design': 'Web design',
  'e-commerce': 'E-commerce',
  'portfolio': 'Portfolio',
  'motion': 'Motion',
}

function buildMedia(project) {
  if (project.coverVideoUrl) {
    return `<video autoplay muted loop playsinline aria-hidden="true">
      <source src="${project.coverVideoUrl}" type="video/mp4">
    </video>`
  }
  if (project.coverImage?.asset) {
    const src = urlFor(project.coverImage).width(900).auto('format').url()
    return `<img src="${src}" alt="${project.title}" loading="lazy">`
  }
  if (project.localImage) {
    return `<img src="${project.localImage}" alt="${project.title}" loading="lazy">`
  }
  return ''
}

function projectHref(project, lang) {
  const page = lang === 'fr' ? 'projet.html' : 'project.html'
  return `${page}?slug=${project.slug}`
}

function buildGalleryCard(project, lang) {
  const href = projectHref(project, lang)
  const cat = CATEGORY_LABELS[project.category] || project.category || ''
  const tag = project.tag || [cat, project.year].filter(Boolean).join(' · ')
  const media = buildMedia(project)

  return `<a class="hero-gallery-card" href="${href}" data-project-slug="${project.slug}" data-transition-init="1">
    <div class="hero-gallery-img">${media}</div>
    <div class="hero-gallery-meta">
      <span class="hero-gallery-name">${project.title}</span>
      <span class="hero-gallery-tag">${tag}</span>
    </div>
  </a>`
}

function buildSpotlightCard(project, lang) {
  const href = projectHref(project, lang)
  const media = buildMedia(project)
  const desc = project.description || ''

  return `<a class="hero-spotlight-card" href="${href}" data-project-slug="${project.slug}" data-transition-init="1">
    <div class="hero-spotlight-img-wrap">${media.replace('<img ', '<img class="hero-spotlight-img" ')}</div>
    <div class="hero-spotlight-meta">
      <p class="hero-spotlight-label">${project.title}</p>
      <p class="hero-spotlight-desc">${desc}</p>
    </div>
  </a>`
}

function buildWorkCard(project, index, lang) {
  const href = projectHref(project, lang)
  const media = buildMedia(project)
  const isWide = index === 0

  return `<a class="work-card${isWide ? ' work-card--wide' : ''}" href="${href}" data-project-slug="${project.slug}" data-transition-init="1">
    <div class="work-image">${media}</div>
    <div class="work-meta">
      <span class="work-name">${project.title.toUpperCase()}</span>
      <span class="work-year">${project.year || ''}</span>
    </div>
  </a>`
}

export async function initProjectMedia() {
  const galleryEl = document.getElementById('home-gallery')
  const spotlightEl = document.getElementById('home-spotlight')

  if (!galleryEl && !spotlightEl) return

  const lang = document.documentElement.lang?.startsWith('fr') ? 'fr' : 'en'
  const isFr = lang === 'fr'

  let projects
  try {
    projects = await getHomeProjects(lang)
  } catch (err) {
    console.warn('[ProjectMedia] Could not fetch from Sanity:', err)
    return
  }

  if (!projects?.length) return

  // FR home: hero-gallery + hero-spotlight
  // ordre 1-4 → gallery, ordre 5-6 → spotlight, max 6 au total
  const galleryProjects = projects.slice(0, 4)
  const spotlightProjects = projects.slice(4, 6)

  if (isFr && galleryEl) {
    galleryEl.innerHTML = galleryProjects.map(p => buildGalleryCard(p, lang)).join('')
  }

  if (isFr && spotlightEl) {
    spotlightEl.innerHTML = spotlightProjects.map(p => buildSpotlightCard(p, lang)).join('')
  }

  // EN home: work-track (4 premiers)
  if (!isFr && galleryEl) {
    galleryEl.innerHTML = galleryProjects.map((p, i) => buildWorkCard(p, i, lang)).join('')
  }

  // Wire up page transitions on new links
  document.dispatchEvent(new CustomEvent('projects:rendered'))
}
