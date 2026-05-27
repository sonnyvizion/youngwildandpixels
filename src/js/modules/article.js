import { getBlogPost, urlFor } from '../sanity.js'

function formatDate(dateStr, lang) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function renderBlock(block) {
  if (block._type === 'image') {
    const src = urlFor(block).width(1200).auto('format').url()
    const caption = block.caption ? `<figcaption class="article-img-caption">${block.caption}</figcaption>` : ''
    return `<figure class="article-img-figure"><img src="${src}" alt="${block.caption || ''}" loading="lazy">${caption}</figure>`
  }

  if (block._type !== 'block') return ''

  const text = (block.children || []).map((child) => {
    let t = child.text || ''
    // escape HTML
    t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (child.marks?.includes('strong')) t = `<strong>${t}</strong>`
    if (child.marks?.includes('em')) t = `<em>${t}</em>`
    if (child.marks?.includes('underline')) t = `<u>${t}</u>`
    if (child.marks?.includes('code')) t = `<code>${t}</code>`
    // links
    const linkMark = (block.markDefs || []).find(
      (m) => child.marks?.includes(m._key) && m._type === 'link'
    )
    if (linkMark) t = `<a href="${linkMark.href}" target="_blank" rel="noopener">${t}</a>`
    return t
  }).join('')

  const tag = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4',
    blockquote: 'blockquote',
    normal: 'p',
  }[block.style || 'normal'] || 'p'

  if (block.listItem === 'bullet') return `<li class="article-li">${text}</li>`
  if (block.listItem === 'number') return `<li class="article-li">${text}</li>`

  return `<${tag} class="article-${tag}">${text}</${tag}>`
}

function wrapLists(html) {
  // Wrap consecutive <li> with <ul>
  return html
    .replace(/(<li class="article-li">[\s\S]*?<\/li>)(\s*<li class="article-li">[\s\S]*?<\/li>)*/g, (match) => `<ul class="article-ul">${match}</ul>`)
}

function renderBody(blocks) {
  if (!blocks?.length) return ''
  const html = blocks.map(renderBlock).join('\n')
  return wrapLists(html)
}

function setCategoryLabel(category, lang) {
  const map = {
    'seo-geo': lang === 'fr' ? 'SEO / GEO' : 'SEO / GEO',
    'branding': 'Branding',
    'ia-automatisation': lang === 'fr' ? 'IA / Automatisation' : 'AI / Automation',
    'creation-site': lang === 'fr' ? 'Création de site' : 'Web Design',
    'marketing': 'Marketing',
  }
  return map[category] || category
}

export async function initArticle() {
  const main = document.getElementById('article-main')
  if (!main) return

  const lang = main.dataset.lang || 'fr'
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('slug')

  if (!slug) {
    window.location.href = 'blog.html'
    return
  }

  // Update lang switch links to carry the slug
  document.querySelectorAll('#lang-fr, #lang-en').forEach((el) => {
    const href = el.getAttribute('href')
    if (href) el.setAttribute('href', `${href}?slug=${slug}`)
  })

  try {
    const post = await getBlogPost(slug, lang)

    if (!post) {
      main.innerHTML = `<div class="article-not-found"><p>${lang === 'fr' ? 'Article introuvable.' : 'Article not found.'}</p><a href="blog.html">${lang === 'fr' ? '← Retour au blog' : '← Back to blog'}</a></div>`
      return
    }

    // Update page meta
    document.title = `${post.title} — Young, Wild & Pixels`
    const metaDesc = document.getElementById('meta-desc')
    if (metaDesc && post.excerpt) metaDesc.setAttribute('content', post.excerpt)
    const ogTitle = document.getElementById('og-title')
    if (ogTitle) ogTitle.setAttribute('content', post.title)
    const ogDesc = document.getElementById('og-desc')
    if (ogDesc && post.excerpt) ogDesc.setAttribute('content', post.excerpt)

    const category = setCategoryLabel(post.category, lang)
    const date = formatDate(post.publishedAt, lang)
    const readTime = post.readTime
      ? lang === 'fr' ? `${post.readTime} min de lecture` : `${post.readTime} min read`
      : ''

    const coverHtml = post.coverImage?.asset
      ? `<div class="article-cover"><img src="${urlFor(post.coverImage).width(1400).auto('format').url()}" alt="${post.title}" loading="eager"></div>`
      : ''

    const bodyHtml = renderBody(post.body)

    main.innerHTML = `
      <article class="article-container">
        <div class="article-header">
          <a class="article-back" href="blog.html">← Blog</a>
          <p class="section-adlib article-category-adlib">[ ${category} ]</p>
          <h1 class="article-title">${post.title}</h1>
          <div class="article-meta">
            ${date ? `<span class="article-date">${date}</span>` : ''}
            ${readTime ? `<span class="article-readtime">${readTime}</span>` : ''}
          </div>
        </div>
        ${coverHtml}
        <div class="article-body">
          ${bodyHtml}
        </div>
      </article>
    `
  } catch (err) {
    console.error('[Article] Failed to load:', err)
    main.innerHTML = `<div class="article-not-found"><p>${lang === 'fr' ? 'Une erreur est survenue.' : 'Something went wrong.'}</p><a href="blog.html">${lang === 'fr' ? '← Retour au blog' : '← Back to blog'}</a></div>`
  }
}
