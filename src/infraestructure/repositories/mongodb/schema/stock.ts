import mongoose, { Schema } from 'mongoose'

import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'

export const stockShema = new Schema<MongoStock>({
  _id: mongoose.Types.ObjectId,
  stock: String,
  name: String,
  close: Number,
  change: Number,
  volume: Number,
  marketCap: Number,
  logo: String,
  sector: String,
  type: String
})
