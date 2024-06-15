import { MongoTransactionRepository } from '@/infraestructure/repositories/mongodb/transaction'

export const makeMongoTransactionRepository = (): MongoTransactionRepository => {
  return new MongoTransactionRepository()
}
