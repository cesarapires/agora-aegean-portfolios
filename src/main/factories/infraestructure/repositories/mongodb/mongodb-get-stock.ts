import { MongoGetStockRepository } from '@/infraestructure/repositories/mongodb/get-stock'

export const makeMongoGetStockRepository = (): MongoGetStockRepository => {
  return new MongoGetStockRepository()
}
