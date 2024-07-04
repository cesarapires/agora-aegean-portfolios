import { type TransactionData } from '../models/transaction'

export interface CreateTransaction {
  handle: (params: CreateTransaction.Params) => Promise<CreateTransaction.Result>
}

export namespace CreateTransaction {
  export type Params = Omit<TransactionData, 'id' | 'unitaryValue' | 'totalValue'>

  export type Result = TransactionData
}
