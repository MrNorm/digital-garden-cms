import { randomBytes } from 'crypto'
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

let sessionSecret = process.env.KS_SESSION_SECRET
if (sessionSecret === undefined) {
  sessionSecret = randomBytes(32).toString('hex')
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt',
  secretField: 'password',

  // remove after first deploy
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
})

const sessionMaxAge = 60 * 60 * 24 * 30
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret
})

export { withAuth, session }
