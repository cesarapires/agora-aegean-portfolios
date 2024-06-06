import { type SaveWallet } from '@/domain/contracts/repositories/wallet'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'

import mongoose, { type Model } from 'mongoose'

export class MongoSaveWalletRepository implements SaveWallet {
  private readonly wallet: Model<MongoWallet>

  constructor () {
    this.wallet = mongoose.model('Wallet', walletSchema)
  }

  async save (params: SaveWallet.Params): Promise<SaveWallet.Result> {
    const walletModel = {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(params.userId),
      name: params.name,
      balance: params.balance,
      creationDate: params.creationDate
    }
    const wallet = await this.wallet.create(walletModel)
    return {
      id: wallet._id.toHexString()
    }
  }
}
