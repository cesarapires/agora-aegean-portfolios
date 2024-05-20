import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'
import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/save-wallet'
import { makeFakeDb } from './mocks/connection'

describe('MongoWalletRepository', () => {
  let sut: MongoWalletRepository
  let mongodb: MongoMemoryServer
  let mongoWalletRepository: Model<MongoWallet>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoWalletRepository = mongoose.model('Wallet', walletSchema)
  })

  beforeEach(() => {
    sut = new MongoWalletRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('SaveWallet', () => {
    it('should save wallet', async () => {
      const { id } = await sut.save({
        userId: '663d25d1beb87c3032741c82',
        name: 'John Doe Wallet',
        balance: 657.78,
        creationDate: new Date('2023-01-15')
      })

      const walletSaved = await mongoWalletRepository.findById(id)

      expect(id).toEqual(walletSaved?._id.toHexString())
    })
  })
})
