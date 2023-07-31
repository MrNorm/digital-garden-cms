import { buildConfig } from 'payload/config'
import path from 'path'
import Categories from './collections/Categories'
import Cuttings from './collections/Cuttings'
import Tags from './collections/Tags'
import Projects from './collections/Projects'
import Users from './collections/Users'
import Media from './collections/Media'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug
  },
  collections: [Categories, Cuttings, Tags, Users, Media, Projects],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  }
})
