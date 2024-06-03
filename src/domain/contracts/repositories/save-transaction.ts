export interface SaveTransaction {
  save: (params: SaveTransaction.Params) => Promise<SaveTransaction.Result>
}

export namespace SaveTransaction {
  export type Params = {
    walletId: string
    stockId: string
    userId: string
    type: string
    quantity: number
    unitaryValue: number
    totalValue: number
  }
  export type Result = {
    id: string
    walletId: string
    stockId: string
    userId: string
    type: string
    quantity: number
    unitaryValue: number
    totalValue: number
  }
}
