import { getBlogPosts, urlFor } from '../sanity.js'

// Format date → "Apr 2025" (EN) or "avr. 2025" (FR)
function formatDate(dateStr, lang) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function buildCard(post, lang) {
  const slug = post.slug?.current
  const href = slug ? `article.html?slug=${slug}` : '#'
  const title = post.title || (lang === 'fr' ? 'Sans titre' : 'Untitled')
  const category = post.category || ''
  const date = formatDate(post.publishedAt, lang)
  const readTime = post.readTime
    ? lang === 'fr'
      ? `${post.readTime} min`
      : `${post.readTime} min read`
    : ''

  let imgHtml = ''
  if (post.coverImage?.asset) {
    const src = urlFor(post.coverImage).width(800).auto('format').url()
    imgHtml = `<img src="${src}" alt="${title}" loading="lazy">`
  }

  const metaParts = [category, date, readTime].filter(Boolean)

  return `
    <a class="blog-gallery-card" href="${href}">
      <div class="blog-gallery-img${imgHtml ? '' : ' blog-gallery-img--placeholder'}">
        ${imgHtml}
        <div class="blog-gallery-curtain">
          <span class="blog-gallery-curtain-title">${title}</span>
        </div>
      </div>
      <div class="blog-gallery-meta">
        ${category ? `<span class="blog-gallery-category">${category}</span>` : ''}
        <span class="blog-gallery-title">${title}</span>
        ${metaParts.length > 1 ? `<span class="blog-gallery-read">${metaParts.slice(1).join(' · ')}</span>` : ''}
      </div>
    </a>
  `
}

function buildPlaceholderCard(lang) {
  const label = lang === 'fr' ? 'Bientôt' : 'Coming soon'
  const text = lang === 'fr' ? 'Article à venir' : 'Upcoming article'
  return `
    <div class="blog-gallery-card blog-gallery-card--placeholder">
      <div class="blog-gallery-img blog-gallery-img--placeholder">
        <span class="blog-gallery-badge">${label}</span>
        <div class="blog-gallery-curtain">
          <span class="blog-gallery-curtain-title">${text}</span>
        </div>
      </div>
      <div class="blog-gallery-meta">
        <span class="blog-gallery-category">—</span>
        <span class="blog-gallery-title">${text}</span>
      </div>
    </div>
  `
}

export async function initBlog() {
  const gallery = document.getElementById('blog-gallery')
  if (!gallery) return

  const lang = gallery.dataset.lang || 'fr'

  try {
    const posts = await getBlogPosts(lang)

    if (posts && posts.length > 0) {
      gallery.innerHTML = posts.map((p) => buildCard(p, lang)).join('')
    } else {
      // No articles yet — show 3 placeholder cards
      gallery.innerHTML = Array(3).fill(buildPlaceholderCard(lang)).join('')
    }
    // Notify main.js to wire up page transitions on new links
    document.dispatchEvent(new CustomEvent('blog:rendered'))
  } catch (err) {
    console.error('[Blog] Failed to load posts:', err)
    // Fallback: show placeholders so page doesn't look broken
    gallery.innerHTML = Array(3).fill(buildPlaceholderCard(lang)).join('')
  }
}
