import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { makeMongoStockRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-stock'
import { makeMongoWalletRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-wallet'
import { makeMongoTransactionRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-transaction'

export const makeCreateTransactionUseCase = (): CreateTransactionUseCase => {
  const transactionRepository = makeMongoTransactionRepository()
  const stockRepository = makeMongoStockRepository()
  const walletRepository = makeMongoWalletRepository()
  return new CreateTransactionUseCase(
    transactionRepository,
    stockRepository,
    walletRepository
  )
}
