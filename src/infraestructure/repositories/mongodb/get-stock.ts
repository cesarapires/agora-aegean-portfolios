import { type StockData, type GetStock } from '@/domain/contracts/repositories/stock'
import { stockShema } from '@/infraestructure/repositories/mongodb/schema/stock'
import { type MongoStock } from '@/infraestructure/repositories/mongodb/entities/stock'

import mongoose, { type Model } from 'mongoose'

export class MongoGetStockRepository implements GetStock {
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
}
