import { type WalletData, type GetWallet } from '@/domain/contracts/repositories/wallet'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'

import mongoose, { type Model } from 'mongoose'

export class MongoGetWalletRepository implements GetWallet {
  private readonly wallet: Model<MongoWallet>

  constructor () {
    this.wallet = mongoose.model('Wallet', walletSchema)
  }

  async get (walletId: string): Promise<WalletData | undefined> {
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
}
