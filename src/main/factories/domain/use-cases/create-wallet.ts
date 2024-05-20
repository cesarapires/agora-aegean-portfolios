import { CreateWalletUseCase } from '@/domain/use-cases/create-wallet'
import { makeMongoWalletRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-save-wallet'

export const makeCreateWalletUseCase = (): CreateWalletUseCase => {
  const repository = makeMongoWalletRepository()

  return new CreateWalletUseCase(repository)
}
