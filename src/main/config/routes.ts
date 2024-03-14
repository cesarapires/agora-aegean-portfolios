import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = async (express: Express): Promise<void> => {
  const router = Router()
  const routeFiles = readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))

  const routePromises = routeFiles.map(async file => {
    const routeModule = await import(`../routes/${file}`)
    routeModule.default(router)
  })

  await Promise.all(routePromises)

  express.use('/api', router)
}
