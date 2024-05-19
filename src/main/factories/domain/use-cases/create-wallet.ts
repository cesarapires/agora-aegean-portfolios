import { CreateWalletUseCase } from '@/domain/use-cases/create-wallet'
import { makeUUIDHandler } from '@/main/factories/infraestructure/gateways/crypto/uuid-handler'
import { makeMongoWalletRepository } from '@/main/factories/infraestructure/repositories/mongodb/mongodb-save-wallet'

export const makeCreateWalletUseCase = (): CreateWalletUseCase => {
  const uuidGenerator = makeUUIDHandler()

  const repository = makeMongoWalletRepository()

  return new CreateWalletUseCase(uuidGenerator, repository)
}
