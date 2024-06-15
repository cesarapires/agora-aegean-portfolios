import { MongoWalletRepository } from '@/infraestructure/repositories/mongodb/wallet'

export const makeMongoWalletRepository = (): MongoWalletRepository => {
  return new MongoWalletRepository()
}
