import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { walletSchema } from '@/infraestructure/repositories/mongodb/schema/wallet'
import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'
import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/wallet'
import { makeFakeDb } from './mocks/connection'
import { type Wallet, type SaveWallet } from '@/domain/contracts/repositories/wallet'

describe('MongoWalletRepository', () => {
  let wallet: any
  let sut: MongoWalletRepository
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

  beforeEach(async () => {
    sut = new MongoWalletRepository()
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

  describe('GetWallet', () => {
    it('should get wallet', async () => {
      wallet._id = new mongoose.Types.ObjectId()
      wallet.userId = new mongoose.Types.ObjectId(wallet.userId as string)
      const walletCreated = await mongoWalletRepository.create(wallet)

      delete wallet._id
      wallet.id = walletCreated._id.toHexString()
      wallet.userId = wallet.userId.toHexString()

      const walletObtained = await sut.get(walletCreated._id.toHexString())

      expect(walletObtained).toEqual(wallet)
    })
  })

  describe('UpdateWallet', () => {
    it('should update wallet', async () => {
      wallet._id = new mongoose.Types.ObjectId()
      wallet.userId = new mongoose.Types.ObjectId(wallet.userId as string)
      const walletCreated = await mongoWalletRepository.create(wallet)

      delete wallet._id
      wallet.id = walletCreated._id.toHexString()
      wallet.userId = walletCreated.userId.toHexString()
      wallet.name = 'New Name Teste'
      wallet.balance = 0.0

      await sut.update(wallet as Wallet)

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
