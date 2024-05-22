import type mongoose from 'mongoose'

export interface MongoStock {
  _id: mongoose.Types.ObjectId
  stock: string
  name: string
  close: number
  change: number
  volume: number
  marketCap: number
  logo: string
  sector: string
  type: string
}
