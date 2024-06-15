export interface SaveTransaction {
  save: (params: SaveTransaction.Params) => Promise<TransactionData>
}

export namespace SaveTransaction {
  export type Params = Omit<TransactionData, 'id'>
}

export type TransactionData = {
  id: string
  walletId: string
  stockId: string
  userId: string
  type: string
  quantity: number
  unitaryValue: number
  totalValue: number
}
