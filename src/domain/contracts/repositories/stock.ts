export interface SaveStock {
  save: (params: SaveStock.Params) => Promise<StockData>
}

export interface GetStock {
  get: (params: string) => Promise<StockData | undefined>
}

export namespace SaveStock {
  export type Params = Omit<StockData, 'id'>
}

export type StockData = {
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
