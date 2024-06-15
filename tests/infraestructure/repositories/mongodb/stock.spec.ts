import mongoose, { type Model } from 'mongoose'
import { type MongoMemoryServer } from 'mongodb-memory-server'
import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'
import { stockShema } from '@/infraestructure/repositories/mongodb/schema/stock'
import { MongoStockRepository } from '@/infraestructure/repositories/mongodb/stock'
import { makeFakeDb } from './mocks/connection'

describe('MongoStockRepository', () => {
  let stock: any
  let sut: MongoStockRepository
  let mongodb: MongoMemoryServer
  let mongoStockRepository: Model<MongoStock>

  beforeAll(async () => {
    mongodb = await makeFakeDb()
    mongoStockRepository = mongoose.model('Stock', stockShema)
    stock = {
      _id: new mongoose.Types.ObjectId(),
      stock: 'PETR4',
      name: 'Petrobras PN',
      close: 28.35,
      change: -0.45283019,
      volume: 45783000,
      marketCap: 383600000000,
      logo: 'https://example.com/petrobras_logo.svg',
      sector: 'Energy',
      type: 'stock'
    }
  })

  beforeEach(() => {
    sut = new MongoStockRepository()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  describe('GetStock', () => {
    it('should get stock', async () => {
      const stockCreated = await mongoStockRepository.create(stock)

      delete stock._id
      stock.id = stockCreated._id.toHexString()

      const stockObtained = await sut.get(stockCreated._id.toHexString())

      expect(stockObtained).toEqual(stock)
    })
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
