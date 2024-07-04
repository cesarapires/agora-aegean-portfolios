export interface SaveStock {
  save: (params: SaveStock.Params) => Promise<Stock>
}

export interface GetStock {
  get: (params: string) => Promise<Stock | undefined>
}

export namespace SaveStock {
  export type Params = Omit<Stock, 'id'>
}

export type Stock = {
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
