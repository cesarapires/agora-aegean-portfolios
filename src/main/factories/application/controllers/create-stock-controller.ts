import { CreateNewStockController } from '@/application/controllers/create-stock-controller'
import { makeCreateStockUseCase } from '@/main/factories/domain/use-cases/create-stock'

export const makeCreateNewStockController = (): CreateNewStockController => {
  const createStockUseCase = makeCreateStockUseCase()

  return new CreateNewStockController(createStockUseCase)
}
