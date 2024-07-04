export interface SaveTransaction {
  save: (params: SaveTransaction.Params) => Promise<Transaction>
}

export namespace SaveTransaction {
  export type Params = Omit<Transaction, 'id'>
}

export type Transaction = {
  id: string
  walletId: string
  stockId: string
  userId: string
  type: string
  quantity: number
  unitaryValue: number
  totalValue: number
}
