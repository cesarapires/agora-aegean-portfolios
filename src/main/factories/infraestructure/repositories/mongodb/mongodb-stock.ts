import { MongoStockRepository } from '@/infraestructure/repositories/mongodb/stock'

export const makeMongoStockRepository = (): MongoStockRepository => {
  return new MongoStockRepository()
}
