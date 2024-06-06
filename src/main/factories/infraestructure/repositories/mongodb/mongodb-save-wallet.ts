import { MongoSaveWalletRepository } from '@/infraestructure/repositories/mongodb/save-wallet'

export const makeMongoSaveWalletRepository = (): MongoSaveWalletRepository => {
  return new MongoSaveWalletRepository()
}
