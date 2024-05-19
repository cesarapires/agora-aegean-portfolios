import './config/module-alias'

import 'reflect-metadata'
import mongoose from 'mongoose'
import * as log from 'loglevel'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen(env.port, () => {
  void mongoose.connect(`${env.dataBase.url}/${env.dataBase.name}`)
  log.info(`Server running at http://localhost:${env.port}`)
})
