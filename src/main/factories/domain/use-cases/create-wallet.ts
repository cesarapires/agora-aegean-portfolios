import { CreateWalletUseCase } from '@/domain/use-cases/create-wallet'
import { makeMongoSaveWalletRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-save-wallet'

export const makeCreateWalletUseCase = (): CreateWalletUseCase => {
  const repository = makeMongoSaveWalletRepository()

  return new CreateWalletUseCase(repository)
}
