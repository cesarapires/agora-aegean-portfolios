import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { MongoTransactionRepository } from '@/infraestructure/repositories/mongodb/transaction'
import { makeFakeDb } from './mocks/connection'
import { transactionShema } from '@/infraestructure/repositories/mongodb/schema/transaction'
import { type MongoTransaction } from '@/infraestructure/repositories/mongodb/entities/transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/transaction'

describe('MongoTransactionRepository', () => {
  let transaction: any
  let sut: MongoTransactionRepository
  let mongodb: MongoMemoryServer
  let mongoTransactionRepository: Model<MongoTransaction>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoTransactionRepository = mongoose.model('Transaction', transactionShema)
    transaction = {
      walletId: '5f8f8c44b54764421b7156c3',
      stockId: '6f8f8c44b54764421b7156c4',
      userId: '7f8f8c44b54764421b7156c5',
      type: 'BUY',
      quantity: 100,
      unitaryValue: 10,
      totalValue: 1000
    }
  })

  beforeEach(() => {
    sut = new MongoTransactionRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('SaveTransaction', () => {
    it('should save transaction', async () => {
      const { id } = await sut.save(transaction as SaveTransaction.Params)

      const transactionSaved = await mongoTransactionRepository.findById(id)

      const sanitizedTransaction = {
        walletId: transactionSaved?.walletId.toHexString(),
        stockId: transactionSaved?.stockId.toHexString(),
        userId: transactionSaved?.userId.toHexString(),
        type: transactionSaved?.type,
        quantity: transactionSaved?.quantity,
        unitaryValue: transactionSaved?.unitaryValue,
        totalValue: transactionSaved?.totalValue
      }

      expect(transaction).toEqual(sanitizedTransaction)
    })
  })
})
