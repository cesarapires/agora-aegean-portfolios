import { type CreateWallet } from '@/domain/feature/create-wallet'
import { ok, type HttpResponse } from '../helpers/http'
import { createWalletSchemaValidation } from '../validation/wallet-schema'
import { Controller } from './controller'
import * as log from 'loglevel'

type HttpRequest = { name: string, userId: string, balance: number }
type Model = Error | {
  id: string
}

export class CreateNewWalletController extends Controller {
  constructor (private readonly createNewWallet: CreateWallet) {
    super(createWalletSchemaValidation)
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const id = await this.createNewWallet.handle({ ...httpRequest, creationDate: new Date() })
    log.info(`New wallet created with ID: ${id}`)
    return ok({ id })
  }
}
