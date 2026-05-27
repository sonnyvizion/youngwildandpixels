import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
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
      name: 'number',
      title: 'Numéro (01, 02...)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
    defineField({
      name: 'items',
      title: 'Liste des prestations (FR)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'itemsEn',
      title: 'Liste des prestations (EN)',
      type: 'array',
      of: [{type: 'string'}],
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
      subtitle: 'number',
    },
  },
})
