import { MongoUpdateWalletRepository } from '@/infraestructure/repositories/mongodb/update-wallet'

export const makeMongoUpdateWalletRepository = (): MongoUpdateWalletRepository => {
  return new MongoUpdateWalletRepository()
}
