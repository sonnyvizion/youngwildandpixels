import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  // Singleton — one document only
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'taglineFr',
      title: 'Tagline (FR)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'taglineEn',
      title: 'Tagline (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabelFr',
      title: 'CTA Label (FR)',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabelEn',
      title: 'CTA Label (EN)',
      type: 'string',
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'socialX',
      title: 'X (Twitter) URL',
      type: 'url',
    }),
    defineField({
      name: 'socialBehance',
      title: 'Behance URL',
      type: 'url',
    }),
    defineField({
      name: 'socialWhatsapp',
      title: 'WhatsApp URL',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'taglineFr'},
    prepare() {
      return {title: 'Paramètres du site'}
    },
  },
})
