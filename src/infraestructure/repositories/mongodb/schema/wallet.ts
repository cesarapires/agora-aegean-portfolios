import mongoose, { Schema } from 'mongoose'

import { type MongoWallet } from '@/infraestructure/repositories/mongodb/entities/wallet'

export const walletSchema = new Schema<MongoWallet>({
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  name: String,
  balance: Number,
  creationDate: Date
})
