import { type StockData } from '@/domain/models/stock'

export interface CreateStock {
  handle: (params: CreateStock.Params) => Promise<CreateStock.Result>
}

export namespace CreateStock {
  export type Params = Omit<StockData, 'id'>

  export type Result = StockData
}
