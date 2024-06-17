export class BusinessError extends Error {
  constructor (error: string) {
    super(error)
    this.stack = 'BUSINESS_ERROR'
    this.name = 'Business Error'
  }
}
export class NotFoundError extends Error {
  constructor (component: string) {
    super(`${component} not found`)
    this.stack = 'NOT_FOUND_ERROR'
    this.name = 'Not Found Error'
  }
}
