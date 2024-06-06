import { type CreateStock } from '@/domain/feature/create-stock'
import { ok, type HttpResponse } from '../helpers/http'
import { Controller } from './controller'
import * as log from 'loglevel'
import { createStockSchemaValidation } from '../validation/stock-schema'

type HttpRequest = {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  marketCap: number
  logo: string
  sector: string
  type: string
}
type Model = Error | {
  id: string
  stock: string
  name: string
  close: number
  change: number
  volume: number
  marketCap: number
  logo: string
  sector: string
  type: string
}

export class CreateNewStockController extends Controller {
  constructor (private readonly createNewStock: CreateStock) {
    super(createStockSchemaValidation)
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const stock = await this.createNewStock.handle(httpRequest)
    log.info(`New stock created with ID: ${stock.id}`)
    return ok({
      id: stock.id,
      stock: stock.stock,
      name: stock.name,
      close: stock.close,
      change: stock.change,
      volume: stock.volume,
      marketCap: stock.marketCap,
      logo: stock.logo,
      sector: stock.sector,
      type: stock.type
    })
  }
}
