// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema'

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth'
import type { DatabaseProvider } from '@keystone-6/core/types'

export default withAuth(
  config({
    db: {
      provider: process.env.KS_DB_PROVIDER as DatabaseProvider ?? 'sqlite',
      url: process.env.KS_DB_URL ?? 'file:./keystone.db',
      useMigrations: true
    },
    lists,
    session,
    storage: {
      default: (process.env.KS_S3_BUCKET_NAME !== undefined)
        ? {
            kind: 's3',
            type: 'image',
            bucketName: process.env.KS_S3_BUCKET_NAME ?? '',
            region: process.env.KS_S3_S3_REGION ?? '',
            accessKeyId: process.env.KS_S3_ACCESS_KEY_ID ?? '',
            secretAccessKey: process.env.KS_S3_SECRET_ACCESS_KEY ?? ''
          }
        : {
            kind: 'local',
            type: 'image',
            storagePath: 'public',
            generateUrl: path => `http://localhost:3000/public/${path}`,
            serverRoute: null
          }
    }
  })
)
