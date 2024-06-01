import { MongoStockRepository } from '@/infraestructure/repositories/mongodb/save-stock'

export const makeMongoStockRepository = (): MongoStockRepository => {
  return new MongoStockRepository()
}
