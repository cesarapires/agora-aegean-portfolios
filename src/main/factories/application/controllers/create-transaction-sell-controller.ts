import { CreateTransactionController } from '@/application/controllers/create-transaction-controller'
import { makeCreateTransactionUseCase } from '@/main/factories/domain/use-cases/create-transaction'

export const makeCreateSellTransactionController = (): CreateTransactionController => {
  const createTransactionUseCase = makeCreateTransactionUseCase()

  return new CreateTransactionController(createTransactionUseCase, 'SELL')
}
