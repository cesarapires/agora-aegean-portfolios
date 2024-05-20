import { type CreateWallet } from '@/domain/feature/create-wallet'
import { type SaveWallet } from '@/domain/contracts/repositories/save-wallet'

export class CreateWalletUseCase implements CreateWallet {
  constructor (
    private readonly saveWallet: SaveWallet
  ) {}

  async handle (params: CreateWallet.Params): Promise<string> {
    if (params.balance <= 0) {
      throw new Error('Business Error: The initial balance cannot be negative')
    }
    const { id } = await this.saveWallet.save({ ...params, creationDate: new Date() })
    return id
  }
}
