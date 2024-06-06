import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'
import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/get-wallet'
import { makeFakeDb } from './mocks/connection'

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

  describe('GetWallet', () => {
    it('should get wallet', async () => {
      const walletCreated = await mongoWalletRepository.create(wallet)

      delete wallet._id
      wallet.id = walletCreated._id.toHexString()
      wallet.userId = wallet.userId.toHexString()

      const walletObtained = await sut.get(walletCreated._id.toHexString())

      expect(walletObtained).toEqual(wallet)
    })
  })
})
