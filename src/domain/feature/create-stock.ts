import { type Stock } from '@/domain/models/stock-model'

export interface CreateStock {
  handle: (params: CreateStock.Params) => Promise<CreateStock.Result>
}

export namespace CreateStock {
  export type Params = Stock

  export type Result = Stock
}
