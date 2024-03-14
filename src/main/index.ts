import './config/module-alias'

import 'reflect-metadata'
import * as log from 'loglevel'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen(env.port, () => { log.info(`Server running at http://localhost:${env.port}`) })
