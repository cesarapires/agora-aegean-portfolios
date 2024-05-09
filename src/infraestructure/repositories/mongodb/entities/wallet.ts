import type mongoose from 'mongoose'

export interface MongoWallet {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  name: string
  balance: number
  creationDate: Date
}
