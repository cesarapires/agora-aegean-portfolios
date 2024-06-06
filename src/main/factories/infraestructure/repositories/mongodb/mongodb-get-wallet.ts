import { MongoGetWalletRepository } from '@/infraestructure/repositories/mongodb/get-wallet'

export const makeMongoGetWalletRepository = (): MongoGetWalletRepository => {
  return new MongoGetWalletRepository()
}
