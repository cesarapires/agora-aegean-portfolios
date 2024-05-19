import { CreateNewWalletController } from '@/application/controllers/create-wallet-controller'
import { makeCreateWalletUseCase } from '@/main/factories/domain/use-cases/create-wallet'

export const makeCreateNewWalletController = (): CreateNewWalletController => {
  const createWalletUseCase = makeCreateWalletUseCase()

  return new CreateNewWalletController(createWalletUseCase)
}
