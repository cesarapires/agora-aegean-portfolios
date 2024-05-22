import { type SaveStock } from '@/domain/contracts/repositories/save-stock'
import { stockShema } from '@/infraestructure/repositories/mongodb/schema/stock'
import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'

import mongoose, { type Model } from 'mongoose'

export class MongoStockRepository implements SaveStock {
  private readonly stock: Model<MongoStock>

  constructor () {
    this.stock = mongoose.model('stock', stockShema)
  }

  async save (params: SaveStock.Params): Promise<SaveStock.Result> {
    const stockModel = {
      _id: new mongoose.Types.ObjectId(),
      ...params
    }
    const stock = await this.stock.create(stockModel)
    return {
      id: stock._id.toHexString(),
      ...params
    }
  }
}
