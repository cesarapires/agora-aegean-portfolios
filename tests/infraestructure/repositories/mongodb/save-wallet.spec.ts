import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'
import { MongoSaveWalletRepository } from '@/infraestructure/repositories/mongodb/save-wallet'
import { makeFakeDb } from './mocks/connection'
import { type SaveWallet } from '@/domain/contracts/repositories/wallet'

describe('MongoSaveWalletRepository', () => {
  let wallet: any
  let sut: MongoSaveWalletRepository
  let mongodb: MongoMemoryServer
  let mongoWalletRepository: Model<MongoWallet>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoWalletRepository = mongoose.model('Wallet', walletSchema)
    wallet = {
      userId: '663d25d1beb87c3032741c82',
      name: 'John Doe Wallet',
      balance: 657.78,
      creationDate: new Date('2023-01-15')
    }
  })

  beforeEach(() => {
    sut = new MongoSaveWalletRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('SaveWallet', () => {
    it('should save wallet', async () => {
      const { id } = await sut.save(wallet as SaveWallet.Params)

      const walletSaved = await mongoWalletRepository.findById(id)

      const sanitizedWallet = {
        userId: walletSaved?.userId.toHexString(),
        name: walletSaved?.name,
        balance: walletSaved?.balance,
        creationDate: walletSaved?.creationDate
      }

      expect(wallet).toEqual(sanitizedWallet)
    })
  })
})
