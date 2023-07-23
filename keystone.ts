import { config } from '@keystone-6/core'
import { lists } from './schema'
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
