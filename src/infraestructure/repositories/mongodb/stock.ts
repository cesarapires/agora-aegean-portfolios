import { type StockData, type GetStock, type SaveStock } from '@/domain/contracts/repositories/stock'
import { stockShema } from '@/infraestructure/repositories/mongodb/schema/stock'
import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'

import mongoose, { type Model } from 'mongoose'

export class MongoStockRepository implements GetStock, SaveStock {
  private readonly stock: Model<MongoStock>

  constructor () {
    this.stock = mongoose.model('Stock', stockShema)
  }

  async get (stockId: string): Promise<StockData | undefined> {
    const stock = await this.stock.findById(stockId)
    if (stock != null) {
      return {
        id: stock._id.toHexString(),
        stock: stock.stock,
        name: stock.name,
        close: stock.close,
        change: stock.change,
        volume: stock.volume,
        marketCap: stock.marketCap,
        logo: stock.logo,
        sector: stock.sector,
        type: stock.type
      }
    }
  }

  async save (params: SaveStock.Params): Promise<StockData> {
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
