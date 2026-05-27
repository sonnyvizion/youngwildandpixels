import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (FR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Titre (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'SEO / GEO', value: 'seo-geo'},
          {title: 'Branding', value: 'branding'},
          {title: 'IA / Automatisation', value: 'ia-automatisation'},
          {title: 'Création de site', value: 'creation-site'},
          {title: 'Marketing', value: 'marketing'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture (min)',
      type: 'number',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (FR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'excerptEn',
      title: 'Extrait (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Contenu (FR)',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Contenu (EN)',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (FR)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (FR)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
