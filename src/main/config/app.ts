import express from 'express'
import { setupLogger } from '@/main/config/logger'
import { setupRoutes } from '@/main/config/routes'
import { setupMiddlewares } from '@/main/config/middlewares'

const app = express()

setupMiddlewares(app)

setupRoutes(app)

setupLogger()

export { app }
