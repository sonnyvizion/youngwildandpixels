import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '8avbbmqf',
  dataset: 'production',
  apiVersion: '2025-04-10',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// ——— Blog ———

export async function getBlogPosts(lang = 'fr') {
  const titleField = lang === 'fr' ? 'title' : 'titleEn'
  const excerptField = lang === 'fr' ? 'excerpt' : 'excerptEn'

  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      slug,
      category,
      readTime,
      publishedAt,
      coverImage,
    }
  `)
}

export async function getBlogPost(slug, lang = 'fr') {
  const titleField = lang === 'fr' ? 'title' : 'titleEn'
  const excerptField = lang === 'fr' ? 'excerpt' : 'excerptEn'
  const bodyField = lang === 'fr' ? 'body' : 'bodyEn'
  const seoTitleField = 'seoTitle'
  const seoDescField = 'seoDescription'

  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      "title": ${titleField},
      "excerpt": ${excerptField},
      "body": ${bodyField},
      slug,
      category,
      readTime,
      publishedAt,
      coverImage,
      ${seoTitleField},
      ${seoDescField},
    }
  `, {slug})
}

export async function getProject(slug, lang = 'fr') {
  const bodyField = lang === 'fr' ? 'bodyFr' : 'bodyEn'
  const bodyField2 = lang === 'fr' ? 'bodyFr2' : 'bodyEn2'
  const descField = lang === 'fr' ? 'description' : 'descriptionEn'

  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      year,
      "description": ${descField},
      "body": ${bodyField},
      "body2": ${bodyField2},
      marqueeWords,
      liveUrl,
      coverImage,
      "coverVideoUrl": coverVideo.asset->url,
      gallery[]{
        asset,
        caption,
        "url": asset->url,
      },
      localImage,
    }
  `, {slug})
}

// ——— Projects ———

export async function getProjects(lang = 'fr') {
  const descField = lang === 'fr' ? 'description' : 'descriptionEn'

  return client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      tag,
      slug,
      category,
      year,
      "description": ${descField},
      coverImage,
      "coverVideoUrl": coverVideo.asset->url,
      featured,
      url,
    }
  `)
}

export async function getFeaturedProjects(lang = 'fr') {
  const descField = lang === 'fr' ? 'description' : 'descriptionEn'

  return client.fetch(`
    *[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      tag,
      slug,
      category,
      year,
      "description": ${descField},
      coverImage,
      "coverVideoUrl": coverVideo.asset->url,
      url,
    }
  `)
}

export async function getHomeProjects(lang = 'fr') {
  const descField = lang === 'fr' ? 'description' : 'descriptionEn'
  return client.fetch(`
    *[_type == "project"] | order(order asc) [0...6] {
      "slug": slug.current,
      title,
      tag,
      category,
      year,
      "description": ${descField},
      coverImage,
      "coverVideoUrl": coverVideo.asset->url,
      homeSection,
      localImage,
      url,
    }
  `)
}

// ——— Services ———

export async function getServices(lang = 'fr') {
  const titleField = lang === 'fr' ? 'title' : 'titleEn'
  const itemsField = lang === 'fr' ? 'items' : 'itemsEn'

  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      "title": ${titleField},
      number,
      "items": ${itemsField},
    }
  `)
}

// ——— Site Settings ———

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}
