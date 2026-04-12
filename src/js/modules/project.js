import { getProject, getHomeProjects, urlFor } from '../sanity.js'

function buildMediaHtml(project) {
  if (project.coverVideoUrl) {
    return `<video autoplay muted loop playsinline aria-hidden="true">
      <source src="${project.coverVideoUrl}" type="video/mp4">
    </video>`
  }
  if (project.coverImage?.asset) {
    const src = urlFor(project.coverImage).width(1600).auto('format').url()
    return `<img src="${src}" alt="${project.title}" loading="eager">`
  }
  if (project.localImage) {
    return `<img src="${project.localImage}" alt="${project.title}" loading="eager">`
  }
  return ''
}

function buildGalleryBlocks(gallery) {
  if (!gallery?.length) return ''

  const blocks = []
  let i = 0

  while (i < gallery.length) {
    const item = gallery[i]
    const next = gallery[i + 1]
    const src = item.url || (item.asset ? urlFor(item).width(1400).auto('format').url() : '')
    if (!src) { i++; continue }

    // Alternate between full-width and duo
    if (!next || i % 3 === 0) {
      blocks.push(`<div class="proj-block proj-block--full">
        <div class="proj-media-wrap">
          <img src="${src}" alt="${item.caption || ''}" loading="lazy">
        </div>
      </div>`)
      i++
    } else {
      const src2 = next.url || (next.asset ? urlFor(next).width(1200).auto('format').url() : '')
      if (src2) {
        blocks.push(`<div class="proj-block proj-block--duo">
          <div class="proj-media-wrap">
            <img src="${src}" alt="${item.caption || ''}" loading="lazy">
          </div>
          <div class="proj-media-wrap">
            <img src="${src2}" alt="${next.caption || ''}" loading="lazy">
          </div>
        </div>`)
        i += 2
      } else {
        blocks.push(`<div class="proj-block proj-block--full">
          <div class="proj-media-wrap">
            <img src="${src}" alt="${item.caption || ''}" loading="lazy">
          </div>
        </div>`)
        i++
      }
    }
  }

  return blocks.join('')
}

export async function initProject() {
  const main = document.getElementById('project-main')
  if (!main) return

  const lang = main.dataset.lang || 'fr'
  const isFr = lang === 'fr'
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('slug')

  if (!slug) {
    window.location.href = 'work.html'
    return
  }

  // Update lang switch links
  document.querySelectorAll('#lang-fr, #lang-en').forEach((el) => {
    const href = el.getAttribute('href')
    if (href) el.setAttribute('href', `${href}?slug=${slug}`)
  })

  try {
    const [project, allProjects] = await Promise.all([
      getProject(slug, lang),
      getHomeProjects(lang).catch(() => [])
    ])

    if (!project) {
      main.innerHTML = `<div class="project-not-found">
        <p>${isFr ? 'Projet introuvable.' : 'Project not found.'}</p>
        <a href="work.html">${isFr ? '← Retour aux projets' : '← Back to work'}</a>
      </div>`
      return
    }

    // Update page meta
    document.title = `${project.title} — Young, Wild & Pixels`
    const metaDesc = document.getElementById('meta-desc')
    if (metaDesc && project.description) metaDesc.setAttribute('content', project.description)

    const backLabel = isFr ? 'Retour aux projets' : 'Back to work'
    const liveLabel = isFr ? 'Site en ligne' : 'View live'
    const nextLabel = isFr ? 'Projet suivant' : 'Next project'

    const liveBtn = project.liveUrl
      ? `<a class="proj-cta-pill" href="${project.liveUrl}" target="_blank" rel="noopener">${liveLabel}</a>`
      : ''

    const col1 = project.body ? `<p>${project.body.replace(/\n/g, '</p><p>')}</p>` : ''
    const col2 = project.body2 ? `<p>${project.body2.replace(/\n/g, '</p><p>')}</p>` : ''
    const descHtml = (col1 || col2) ? `
      <div class="proj-hero-desc">
        <div>${col1}</div>
        ${col2 ? `<div>${col2}</div>` : ''}
      </div>` : `<div class="proj-hero-desc"></div>`

    const coverHtml = buildMediaHtml(project)
    const galleryHtml = buildGalleryBlocks(project.gallery)

    // Next project
    let nextHtml = ''
    if (allProjects?.length > 1) {
      const idx = allProjects.findIndex(p => p.slug === slug)
      const nextProject = allProjects[(idx + 1) % allProjects.length]
      if (nextProject && nextProject.slug !== slug) {
        const nextPage = isFr ? `projet.html?slug=${nextProject.slug}` : `project.html?slug=${nextProject.slug}`
        let nextMediaHtml = ''
        if (nextProject.coverVideoUrl) {
          nextMediaHtml = `<video autoplay muted loop playsinline><source src="${nextProject.coverVideoUrl}" type="video/mp4"></video>`
        } else if (nextProject.coverImage?.asset) {
          const src = urlFor(nextProject.coverImage).width(1400).auto('format').url()
          nextMediaHtml = `<img src="${src}" alt="${nextProject.title}" loading="lazy">`
        } else if (nextProject.localImage) {
          nextMediaHtml = `<img src="${nextProject.localImage}" alt="${nextProject.title}" loading="lazy">`
        }
        nextHtml = `
          <a class="proj-next" href="${nextPage}">
            <div class="proj-next-media">${nextMediaHtml}</div>
            <div class="proj-next-overlay">
              <span class="proj-next-label">${nextLabel}</span>
              <h2 class="proj-next-title">${nextProject.title}</h2>
              <span class="proj-next-arrow">↗</span>
            </div>
          </a>`
      }
    }

    // Category / meta row
    const categoryLabels = {
      'brand-identity': 'Brand Identity',
      'web-design': 'Web Design',
      'e-commerce': 'E-commerce',
      'portfolio': 'Portfolio',
      'motion': 'Motion',
    }
    const cat = categoryLabels[project.category] || project.category || ''
    const year = project.year || ''
    const metaParts = [cat, year].filter(Boolean)
    const metaHtml = metaParts.length
      ? metaParts.map(p => `<span>${p}</span>`).join('<span class="proj-hero-meta-sep">/</span>')
      : ''

    main.innerHTML = `
      ${coverHtml ? `<div class="proj-cover proj-cover--hero"><div class="proj-cover-media">${coverHtml}</div></div>` : ''}

      <section class="proj-hero">
        ${metaHtml ? `<div class="proj-hero-meta">${metaHtml}</div>` : ''}
        <h1 class="proj-hero-title" data-animated-text>${project.title}</h1>
        <div class="proj-hero-body">
          ${descHtml}
        </div>
      </section>

      ${galleryHtml ? `<div class="proj-content">${galleryHtml}</div>` : ''}

      ${nextHtml}
    `

    document.dispatchEvent(new CustomEvent('project:rendered'))

  } catch (err) {
    console.error('[Project] Failed to load:', err)
    main.innerHTML = `<div class="project-not-found">
      <p>${isFr ? 'Une erreur est survenue.' : 'Something went wrong.'}</p>
      <a href="work.html">${isFr ? '← Retour aux projets' : '← Back to work'}</a>
    </div>`
  }
}
