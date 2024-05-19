import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/save-wallet'

export const makeMongoWalletRepository = (): MongoWalletRepository => {
  return new MongoWalletRepository()
}
