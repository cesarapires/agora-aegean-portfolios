import { type HttpResponse, serverError, badRequest } from '@/application/helpers/http'
import * as log from 'loglevel'
import type Joi from 'joi'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  constructor (private readonly schemaValidation: Joi.ObjectSchema) {

  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)

    if (error !== undefined) {
      return badRequest(error)
    }

    try {
      return await this.perform(httpRequest)
    } catch (error: any) {
      log.error(error.message)
      return serverError(error as Error)
    }
  }

  private validate (httpRequest: any): Error | undefined {
    const validadors = this.schemaValidation.validate(httpRequest)

    if (validadors.error !== undefined) {
      return new Error(validadors.error.message)
    }
  }
}
