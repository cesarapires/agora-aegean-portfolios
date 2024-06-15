import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { ok, type HttpResponse } from '../helpers/http'
import { Controller } from './controller'
import * as log from 'loglevel'
import { createStockSchemaValidation } from '../validation/stock-schema'

type HttpRequest = {
  walletId: string
  stockId: string
  userId: string
  quantity: number
}
type Model = Error | {
  id: string
  walletId: string
  stockId: string
  userId: string
  type: string
  quantity: number
  unitaryValue: number
  totalValue: number
}

export class CreateTransactionController extends Controller {
  constructor (
    private readonly createTransaction: CreateTransaction,
    private readonly typeOfTransaction: 'BUY' | 'SELL'
  ) {
    super(createStockSchemaValidation)
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const transaction = await this.createTransaction.handle(
      { ...httpRequest, type: this.typeOfTransaction }
    )
    log.info(`New transaction created with ID: ${transaction.id}`)
    return ok({
      ...transaction
    })
  }
}
