import { list } from '@keystone-6/core'

import {
  text,
  relationship,
  password,
  timestamp,
  image
} from '@keystone-6/core/fields'

import { document } from '@keystone-6/fields-document'
import type { Lists } from '.keystone/types'

interface Session {
  itemId: string
  query: any
  data: {
    name: string
  }
}

export function isUser ({ session }: { session?: Session }): boolean {
  return (session?.data?.name !== undefined)
}

export const lists: Lists = {
  User: list({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session, context, listKey, operation }) => true
      }
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' }
      })
    }
  }),
  Project: list({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session, context, listKey, operation }) => true
      }
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      tags: relationship({
        ref: 'Tag.projects',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] }
        }
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' }
      })
    }
  }),
  Cutting: list({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session, context, listKey, operation }) => true
      }
    },
    fields: {
      content: document({
        layouts: [
          [1]
        ]
      }),
      images: relationship({
        ref: 'Image.cuttings',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['description', 'image'],
          inlineEdit: { fields: ['description', 'image'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['description', 'image'] }
        }
      }),
      tags: relationship({
        ref: 'Tag.cuttings',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] }
        }
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' }
      })
    }
  }),
  Image: list({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session, context, listKey, operation }) => true
      }
    },
    fields: {
      description: text(),
      image: image({ storage: 'default' }),
      cuttings: relationship({ ref: 'Cutting.images', many: true }),
      tags: relationship({ ref: 'Tag.images', many: true })
    }
  }),
  Tag: list({
    access: {
      operation: {
        create: isUser,
        delete: isUser,
        update: isUser,
        query: ({ session, context, listKey, operation }) => true
      }
    },
    ui: {
      isHidden: true
    },
    fields: {
      name: text(),
      projects: relationship({ ref: 'Project.tags', many: true }),
      cuttings: relationship({ ref: 'Cutting.tags', many: true }),
      images: relationship({ ref: 'Image.tags', many: true })
    }
  })
}
