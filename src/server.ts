import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async (): Promise<void> => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET ?? '',
    mongoURL: process.env.MONGODB_URI ?? '',
    mongoOptions: {
      dbName: 'payload'
    },
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    }
  })

  // Add your own express routes here

  app.listen(process.env.PORT ?? 3000)
}

start()
  .catch((err) => {
    throw err
  })
