export interface SaveStock {
  save: (params: SaveStock.Params) => Promise<SaveStock.Result>
}

export namespace SaveStock {
  export type Params = {
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
  export type Result = {
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
}
