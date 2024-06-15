import type mongoose from 'mongoose'

export interface MongoTransaction {
  _id: mongoose.Types.ObjectId
  walletId: mongoose.Types.ObjectId
  stockId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  type: string
  quantity: number
  unitaryValue: number
  totalValue: number
}
