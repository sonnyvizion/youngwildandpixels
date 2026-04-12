import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'ai', title: 'Section IA'},
    {name: 'services', title: 'Services'},
  ],
  fields: [
    // ─── HERO ────────────────────────────────────────────────
    defineField({
      name: 'heroTaglineFr',
      title: 'Tagline (FR)',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Ex: Young, Wild & Pixels Agency is a creative web agency...',
    }),
    defineField({
      name: 'heroTaglineEn',
      title: 'Tagline (EN)',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroFootNoteFr',
      title: 'Note bas de galerie (FR)',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Ex: On écrit sur ce qu\'on fait vraiment — pas sur ce qu\'on pense que vous voulez lire.',
    }),
    defineField({
      name: 'heroFootNoteEn',
      title: 'Note bas de galerie (EN)',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),

    // ─── AI INTRO ────────────────────────────────────────────
    defineField({
      name: 'aiIntroTitleFr',
      title: 'IA — Titre principal (FR)',
      type: 'string',
      group: 'ai',
      description: 'Ex: L\'IA avec du goût et du sens',
    }),
    defineField({
      name: 'aiIntroTitleEn',
      title: 'IA — Titre principal (EN)',
      type: 'string',
      group: 'ai',
    }),
    defineField({
      name: 'aiIntroDescFr',
      title: 'IA — Description (FR)',
      type: 'text',
      rows: 4,
      group: 'ai',
    }),
    defineField({
      name: 'aiIntroDescEn',
      title: 'IA — Description (EN)',
      type: 'text',
      rows: 4,
      group: 'ai',
    }),
    defineField({
      name: 'aiServicesTitleFr',
      title: 'IA Services — Titre (FR)',
      type: 'string',
      group: 'ai',
      description: 'Ex: Fait pour le monde réel',
    }),
    defineField({
      name: 'aiServicesTitleEn',
      title: 'IA Services — Titre (EN)',
      type: 'string',
      group: 'ai',
    }),
    defineField({
      name: 'aiServicesDescFr',
      title: 'IA Services — Description (FR)',
      type: 'text',
      rows: 4,
      group: 'ai',
    }),
    defineField({
      name: 'aiServicesDescEn',
      title: 'IA Services — Description (EN)',
      type: 'text',
      rows: 4,
      group: 'ai',
    }),

    // ─── SERVICES ────────────────────────────────────────────
    defineField({
      name: 'servicesTitleFr',
      title: 'Services — Titre (FR)',
      type: 'string',
      group: 'services',
      description: 'Ex: Moins de promesses. Plus de résultats',
    }),
    defineField({
      name: 'servicesTitleEn',
      title: 'Services — Titre (EN)',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'servicesNoteFr',
      title: 'Services — Note bas de section (FR)',
      type: 'text',
      rows: 2,
      group: 'services',
    }),
    defineField({
      name: 'servicesNoteEn',
      title: 'Services — Note bas de section (EN)',
      type: 'text',
      rows: 2,
      group: 'services',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
