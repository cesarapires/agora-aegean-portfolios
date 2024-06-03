import { type CreateStock } from '@/domain/feature/create-stock'
import { type SaveStock } from '@/domain/contracts/repositories/stock'

export class CreateStockUseCase implements CreateStock {
  constructor (
    private readonly saveStock: SaveStock
  ) {}

  async handle (params: CreateStock.Params): Promise<CreateStock.Result> {
    const stockSaved = await this.saveStock.save({ ...params })
    return stockSaved
  }
}
