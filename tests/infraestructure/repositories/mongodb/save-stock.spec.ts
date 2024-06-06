import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { MongoSaveStockRepository } from '@/infraestructure/repositories/mongodb/save-stock'
import { makeFakeDb } from './mocks/connection'
import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'
import { stockShema } from '@/infraestructure/repositories/mongodb/schema/stock'

describe('MongoSaveStockRepository', () => {
  let sut: MongoSaveStockRepository
  let mongodb: MongoMemoryServer
  let mongoStockRepository: Model<MongoStock>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoStockRepository = mongoose.model('stock', stockShema)
  })

  beforeEach(() => {
    sut = new MongoSaveStockRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('SaveStock', () => {
    it('should save stock', async () => {
      const { id } = await sut.save({
        stock: 'PETR4',
        name: 'Petrobras PN',
        close: 28.35,
        change: -0.45283019,
        volume: 45783000,
        marketCap: 383600000000,
        logo: 'https://example.com/petrobras_logo.svg',
        sector: 'Energy',
        type: 'stock'
      })

      const stockSaved = await mongoStockRepository.findById(id)

      expect(id).toEqual(stockSaved?._id.toHexString())
    })
  })
})
