import { type CreateStock } from '@/domain/feature/create-stock'
import { CreateStockUseCase } from '@/domain/use-cases/create-stock'
import { makeMongoSaveStockRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-save-stock'

export const makeCreateStockUseCase = (): CreateStock => {
  const repository = makeMongoSaveStockRepository()

  return new CreateStockUseCase(repository)
}
