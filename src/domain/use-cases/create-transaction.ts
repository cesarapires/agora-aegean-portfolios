import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'
import { type GetStock } from '@/domain/contracts/repositories/stock'
import { type GetWallet, type UpdateWallet } from '../contracts/repositories/save-wallet'

export class CreateTransactionUseCase implements CreateTransaction {
  constructor (
    private readonly saveTransaction: SaveTransaction,
    private readonly getStock: GetStock,
    private readonly wallet: GetWallet & UpdateWallet
  ) {}

  async handle (params: CreateTransaction.Params): Promise<CreateTransaction.Result> {
    const wallet = await this.wallet.get(params.walletId)
    if (wallet === undefined) {
      throw new Error('Wallet not found')
    }
    const stock = await this.getStock.get(params.stockId)
    if (stock?.close === undefined) {
      throw new Error('Stock not found')
    }
    const totalValue = stock.close * params.quantity
    if (totalValue > wallet.balance) {
      throw new Error('Business Error: Insufficient funds')
    }
    let balance = wallet.balance
    if (params.type === 'BUY') {
      balance -= totalValue
    } else if (params.type === 'SELL') {
      balance += totalValue
    }
    await this.wallet.update({ ...wallet, balance })
    const transactionSaved = await this.saveTransaction.save({
      ...params,
      unitaryValue: stock.close,
      totalValue: stock.close * params.quantity
    })
    return transactionSaved
  }
}
