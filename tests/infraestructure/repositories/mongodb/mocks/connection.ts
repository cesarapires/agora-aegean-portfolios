import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

export const makeFakeDb = async (): Promise<MongoMemoryServer> => {
  const mongodb = await MongoMemoryServer.create()
  await mongoose.connect(mongodb.getUri(), { dbName: 'verifyMASTER' })

  return mongodb
}
