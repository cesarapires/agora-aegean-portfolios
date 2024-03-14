type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export const env = {
  port: process.env.PORT ?? '3000',
  logLevel: (process.env.LOG_LEVEL as LogLevel) ?? 'TRACE'
}
