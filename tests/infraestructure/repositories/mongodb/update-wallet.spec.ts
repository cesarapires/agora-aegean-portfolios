import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'
import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/update-wallet'
import { makeFakeDb } from './mocks/connection'
import { type WalletData } from '@/domain/contracts/repositories/wallet'

describe('MongoWalletRepository', () => {
  let wallet: any
  let sut: MongoWalletRepository
  let mongodb: MongoMemoryServer
  let mongoWalletRepository: Model<MongoWallet>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoWalletRepository = mongoose.model('Wallet', walletSchema)
    wallet = {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId('663d25d1beb87c3032741c82'),
      name: 'John Doe Wallet',
      balance: 657.78,
      creationDate: new Date('2023-01-15')
    }
  })

  beforeEach(() => {
    sut = new MongoWalletRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('UpdateWallet', () => {
    it('should update wallet', async () => {
      const walletCreated = await mongoWalletRepository.create(wallet)

      delete wallet._id
      wallet.id = walletCreated._id.toHexString()
      wallet.userId = walletCreated.userId.toHexString()
      wallet.name = 'New Name Teste'
      wallet.balance = 0.0

      await sut.update(wallet as WalletData)

      const walletSaved = await mongoWalletRepository.findById(walletCreated._id.toHexString())

      const sanitizedWallet = {
        id: walletSaved?._id.toHexString(),
        userId: walletSaved?.userId.toHexString(),
        name: walletSaved?.name,
        balance: walletSaved?.balance,
        creationDate: walletSaved?.creationDate
      }

      expect(wallet).toEqual(sanitizedWallet)
    })
  })
})
