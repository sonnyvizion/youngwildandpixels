import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Brand identity', value: 'brand-identity'},
          {title: 'Web design', value: 'web-design'},
          {title: 'E-commerce', value: 'e-commerce'},
          {title: 'Portfolio', value: 'portfolio'},
          {title: 'Motion', value: 'motion'},
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Tag (sous le titre sur la home)',
      type: 'string',
      description: 'Ex: Brand identity · 2025 — affiché sous le nom du projet dans la grille',
    }),
    defineField({
      name: 'description',
      title: 'Description (FR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bodyFr',
      title: 'Texte page projet — colonne gauche (FR)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bodyFr2',
      title: 'Texte page projet — colonne droite (FR)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bodyEn',
      title: 'Texte page projet — colonne gauche (EN)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bodyEn2',
      title: 'Texte page projet — colonne droite (EN)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'marqueeWords',
      title: 'Mots du marquee (défilant)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: ["Brenda", "Company", "Brand", "Identity"] — ils défileront en boucle',
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL live du projet',
      type: 'url',
      description: 'Lien "Site en ligne" affiché sur la page projet',
    }),
    defineField({
      name: 'coverImage',
      title: 'Image principale',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'coverVideo',
      title: 'Vidéo de couverture (MP4)',
      type: 'file',
      description: 'Optionnel — remplace l\'image par une vidéo en autoplay (MP4 recommandé, max 20 Mo)',
      options: {accept: 'video/mp4,video/webm'},
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'caption', type: 'string', title: 'Légende'},
          ],
        },
      ],
    }),
    defineField({
      name: 'url',
      title: 'URL du projet (si live)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Mise en avant sur la home ?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeSection',
      title: 'Section home',
      type: 'string',
      description: 'Où afficher ce projet sur la home',
      options: {
        list: [
          {title: 'Grille principale (gallery)', value: 'gallery'},
          {title: 'Spotlight (grand format)', value: 'spotlight'},
          {title: 'Les deux', value: 'both'},
          {title: 'Masqué sur la home', value: 'hidden'},
        ],
        layout: 'radio',
      },
      initialValue: 'gallery',
    }),
    defineField({
      name: 'localImage',
      title: 'Image locale (fallback)',
      type: 'string',
      description: 'Chemin vers l\'image locale si pas d\'image Sanity (ex: /img/work/brenda-4.jpg)',
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
