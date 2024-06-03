export interface Transaction {
  id?: string
  walletId: string
  stockId: string
  userId: string
  type: string
  quantity: number
  unitaryValue: number
  totalValue: number
}
