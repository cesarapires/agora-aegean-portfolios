import { type CreateWallet } from '@/domain/feature/create-wallet'
import { type SaveWallet } from '@/domain/contracts/repositories/save-wallet'
import { type UniqueIdGenerator } from '@/domain/contracts/gateways/crypto/unique-id-generator'

export class CreateWalletUseCase implements CreateWallet {
  constructor (
    private readonly crypto: UniqueIdGenerator,
    private readonly saveWallet: SaveWallet
  ) {}

  async handle (params: CreateWallet.Params): Promise<string> {
    const uniqueId = params.id ?? (await this.crypto.generate()).uniqueId
    const { id } = await this.saveWallet.save({ ...params, id: uniqueId })
    return id
  }
}
