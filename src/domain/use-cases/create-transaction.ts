import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'

export class CreateTransactionUseCase implements CreateTransaction {
  constructor (
    private readonly saveTransaction: SaveTransaction
  ) {}

  async handle (params: CreateTransaction.Params): Promise<CreateTransaction.Result> {
    const transactionSaved = await this.saveTransaction.save({ ...params })
    return transactionSaved
  }
}
