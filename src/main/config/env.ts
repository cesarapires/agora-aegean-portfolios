type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export const env = {
  port: process.env.PORT ?? '3000',
  logLevel: (process.env.LOG_LEVEL as LogLevel) ?? 'TRACE',
  dataBase: {
    url: process.env.DATA_BASE ?? 'mongodb://127.0.0.1:27017',
    name: process.env.DATA_BASE_NAME ?? 'test',
    user: process.env.DATA_BASE_USER_NAME ?? '',
    password: process.env.DATA_BASE_PASSWORD ?? ''
  }
}
