import { type Transaction } from '@/domain/models/transaction'

export interface CreateTransaction {
  handle: (params: CreateTransaction.Params) => Promise<CreateTransaction.Result>
}

export namespace CreateTransaction {
  export type Params = Transaction

  export type Result = Error | {
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
