import { MongoSaveStockRepository } from '@/infraestructure/repositories/mongodb/save-stock'

export const makeMongoSaveStockRepository = (): MongoSaveStockRepository => {
  return new MongoSaveStockRepository()
}
