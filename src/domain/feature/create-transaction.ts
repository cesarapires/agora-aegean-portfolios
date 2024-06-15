import { type Transaction } from '../models/transaction'

export interface CreateTransaction {
  handle: (params: CreateTransaction.Params) => Promise<CreateTransaction.Result>
}

export namespace CreateTransaction {
  export type Params = Omit<Transaction, 'id' | 'unitaryValue' | 'totalValue'>

  export type Result = Transaction
}
