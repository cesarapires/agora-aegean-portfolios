import mongoose, { type Model } from 'mongoose'
import { type MongoTransaction } from './entities/transaction'
import { transactionShema } from './schema/transaction'
import { type TransactionData, type SaveTransaction } from '@/domain/contracts/repositories/transaction'

export class MongoTransactionRepository {
  private readonly transaction: Model<MongoTransaction>

  constructor () {
    this.transaction = mongoose.model('Transaction', transactionShema)
  }

  async save (params: SaveTransaction.Params): Promise<TransactionData> {
    const transactionModel = {
      ...params,
      _id: new mongoose.Types.ObjectId(),
      walletId: new mongoose.Types.ObjectId(params.walletId),
      stockId: new mongoose.Types.ObjectId(params.stockId),
      userId: new mongoose.Types.ObjectId(params.userId)
    }
    const transaction = await this.transaction.create(transactionModel)
    return {
      id: transaction._id.toHexString(),
      walletId: transaction.walletId.toHexString(),
      stockId: transaction.stockId.toHexString(),
      userId: transaction.userId.toHexString(),
      type: transaction.type,
      quantity: transaction.quantity,
      unitaryValue: transaction.unitaryValue,
      totalValue: transaction.totalValue
    }
  }
}
