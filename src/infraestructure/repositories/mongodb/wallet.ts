import { type GetWallet, type UpdateWallet, type SaveWallet, type Wallet } from '@/domain/contracts/repositories/wallet'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'

import mongoose, { type Model } from 'mongoose'

export class MongoWalletRepository implements SaveWallet, GetWallet, UpdateWallet {
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

  async get (walletId: string): Promise<Wallet | undefined> {
    const wallet = await this.wallet.findById(walletId)
    if (wallet != null) {
      return {
        id: wallet._id.toHexString(),
        userId: wallet.userId.toHexString(),
        name: wallet.name,
        balance: wallet.balance,
        creationDate: wallet.creationDate
      }
    }
  }

  async update (wallet: Wallet): Promise<Wallet | undefined> {
    const walletUpdated = await this.wallet.findByIdAndUpdate(wallet.id, {
      name: wallet.name,
      balance: wallet.balance
    })
    if (walletUpdated != null) {
      return {
        id: walletUpdated._id.toHexString(),
        userId: walletUpdated.userId.toHexString(),
        name: walletUpdated.name,
        balance: walletUpdated.balance,
        creationDate: walletUpdated.creationDate
      }
    }
  }
}
