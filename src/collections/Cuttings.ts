import { type User } from 'payload/generated-types'
import { type CollectionConfig } from 'payload/types'

const Cuttings: CollectionConfig = {
  slug: 'cuttings',
  admin: {
    defaultColumns: ['title', 'author', 'category', 'tags', 'media', 'type', 'status'],
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      type: 'text'
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }: { user: User }) => user.id
    },
    {
      name: 'publishedDate',
      type: 'date',
      defaultValue: new Date().toString()
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories'
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        }

      ]
    },
    {
      name: 'content',
      type: 'richText'
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          value: 'photos',
          label: 'Photos'
        },
        {
          value: 'text',
          label: 'Text'
        }
      ],
      defaultValue: 'photos',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft'
        },
        {
          value: 'published',
          label: 'Published'
        }
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar'
      }
    }
  ]
}

export default Cuttings
