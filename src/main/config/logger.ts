import { env } from '@/main/config/env'

import * as log from 'loglevel'

export const setupLogger = (): void => {
  log.setLevel(env.logLevel)
}
