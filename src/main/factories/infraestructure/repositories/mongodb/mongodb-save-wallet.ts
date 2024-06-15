import { MongoSaveWalletRepository } from '@/infraestructure/repositories/mongodb/wallet'

export const makeMongoSaveWalletRepository = (): MongoSaveWalletRepository => {
  return new MongoSaveWalletRepository()
}
