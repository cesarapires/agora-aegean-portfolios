import { type WalletData, type UpdateWallet } from '@/domain/contracts/repositories/wallet'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'

import mongoose, { type Model } from 'mongoose'

export class MongoWalletRepository implements UpdateWallet {
  private readonly wallet: Model<MongoWallet>

  constructor () {
    this.wallet = mongoose.model('Wallet', walletSchema)
  }

  async update (wallet: WalletData): Promise<WalletData | undefined> {
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
