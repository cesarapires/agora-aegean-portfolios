import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'
import { type GetStock } from '@/domain/contracts/repositories/stock'

export class CreateTransactionUseCase implements CreateTransaction {
  constructor (
    private readonly saveTransaction: SaveTransaction,
    private readonly getStock: GetStock
  ) {}

  async handle (params: CreateTransaction.Params): Promise<CreateTransaction.Result> {
    const stock = await this.getStock.get(params.stockId)
    if (stock?.close === undefined) {
      throw new Error('Business Error: Stock not found')
    }
    const transactionSaved = await this.saveTransaction.save({
      ...params,
      unitaryValue: stock.close,
      totalValue: stock.close * params.quantity
    })
    return transactionSaved
  }
}
