import { type Stock } from '@/domain/models/stock'

export interface CreateStock {
  handle: (params: CreateStock.Params) => Promise<CreateStock.Result>
}

export namespace CreateStock {
  export type Params = Omit<Stock, 'id'>

  export type Result = Stock
}
