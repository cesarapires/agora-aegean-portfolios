import mongoose, { Schema } from 'mongoose'

import { type MongoTransaction } from '@/infraestructure/repositories/mongodb/entities/transaction'

export const transactionShema = new Schema<MongoTransaction>({
  _id: mongoose.Types.ObjectId,
  walletId: mongoose.Types.ObjectId,
  stockId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  type: String,
  quantity: Number,
  unitaryValue: Number,
  totalValue: Number
})
