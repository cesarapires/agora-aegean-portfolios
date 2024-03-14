import express from 'express'
import { setupLogger } from '@/main/config/logger'
import { setupMiddlewares } from '@/main/config/middlewares'

const app = express()

setupMiddlewares(app)

setupLogger()

export { app }
