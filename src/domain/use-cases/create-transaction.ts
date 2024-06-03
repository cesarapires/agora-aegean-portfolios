import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'
import { type GetStock } from '@/domain/contracts/repositories/stock'
import { type GetWallet, type UpdateWallet } from '@/domain/contracts/repositories/save-wallet'
import { type Transaction } from '@/domain/models/transaction'
import { type Stock } from '@/domain/models/stock'
import { type Wallet } from '@/domain/models/wallet'

export class CreateTransactionUseCase implements CreateTransaction {
  private transaction: Omit<Transaction, 'id'> | undefined

  constructor (
    private readonly transactionRepository: SaveTransaction,
    private readonly stockRepository: GetStock,
    private readonly walletRepository: GetWallet & UpdateWallet
  ) {}

  async handle (params: CreateTransaction.Params): Promise<CreateTransaction.Result> {
    const stock = await this.getStock(params.stockId)

    const wallet = await this.getWallet(params.walletId)

    this.calculateTotalValue(wallet, stock, params)

    await this.updateWalletBalance(wallet)

    return await this.transactionRepository.save(this.transaction!)
  }

  async getWallet (walletId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.get(walletId)
    if (wallet === undefined) {
      throw new Error('Wallet not found')
    }
    return wallet
  }

  async getStock (stockId: string): Promise<Stock> {
    const stock = await this.stockRepository.get(stockId)
    if (stock === undefined) {
      throw new Error('Stock not found')
    }
    return stock
  }

  calculateTotalValue (
    wallet: Wallet,
    stock: Stock,
    transaction: CreateTransaction.Params
  ): void {
    const totalValue = stock.close * transaction.quantity
    if (totalValue > wallet.balance) {
      throw new Error('Business Error: Insufficient funds')
    }
    this.transaction = {
      ...transaction,
      unitaryValue: stock.close,
      totalValue
    }
  }

  async updateWalletBalance (wallet: Wallet): Promise<void> {
    if (this.transaction!.type === 'BUY') {
      wallet.balance -= this.transaction!.totalValue
    } else if (this.transaction!.type === 'SELL') {
      wallet.balance += this.transaction!.totalValue
    }
    await this.walletRepository.update(wallet)
  }
}
