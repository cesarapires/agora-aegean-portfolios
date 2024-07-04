import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/transaction'
import { type GetStock } from '@/domain/contracts/repositories/stock'
import { type GetWallet, type UpdateWallet } from '@/domain/contracts/repositories/wallet'
import { type TransactionData } from '@/domain/models/transaction'
import { type StockData } from '@/domain/models/stock'
import { type WalletData } from '@/domain/models/wallet'
import { BusinessError, NotFoundError } from '@/domain/errors/domain-error'

export class CreateTransactionUseCase implements CreateTransaction {
  private transaction: Omit<TransactionData, 'id'> | undefined

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

  async getWallet (walletId: string): Promise<WalletData> {
    const wallet = await this.walletRepository.get(walletId)
    if (wallet === undefined) {
      throw new NotFoundError('Wallet')
    }
    return wallet
  }

  async getStock (stockId: string): Promise<StockData> {
    const stock = await this.stockRepository.get(stockId)
    if (stock === undefined) {
      throw new NotFoundError('Stock')
    }
    return stock
  }

  calculateTotalValue (
    wallet: WalletData,
    stock: StockData,
    transaction: CreateTransaction.Params
  ): void {
    const totalValue = stock.close * transaction.quantity
    switch (transaction.type) {
      case 'BUY':
        if (totalValue > wallet.balance) {
          throw new BusinessError('Insufficient funds')
        }
        wallet.balance -= totalValue
        break
      case 'SELL':
        wallet.balance += totalValue
        break
      default:
        throw new BusinessError('Invalid transaction type')
    }

    this.transaction = {
      ...transaction,
      unitaryValue: stock.close,
      totalValue
    }
  }

  async updateWalletBalance (wallet: WalletData): Promise<void> {
    await this.walletRepository.update(wallet)
  }
}
