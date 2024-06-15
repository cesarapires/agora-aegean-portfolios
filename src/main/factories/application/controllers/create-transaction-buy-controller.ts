import { CreateTransactionController } from '@/application/controllers/create-transaction-controller'
import { makeCreateTransactionUseCase } from '../../domain/use-cases/create-transaction'

export const makeCreateBuyTransactionController = (): CreateTransactionController => {
  const createTransactionUseCase = makeCreateTransactionUseCase()

  return new CreateTransactionController(createTransactionUseCase, 'BUY')
}
