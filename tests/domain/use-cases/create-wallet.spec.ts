import { CreateWalletUseCase } from '@/domain/use-cases/create-wallet'
import { type SaveWallet } from '@/domain/contracts/repositories/save-wallet'
import { type UniqueIdGenerator } from '@/domain/contracts/gateways/crypto/unique-id-generator'

import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateWalletUseCase', () => {
  let sut: CreateWalletUseCase
  let crypto: MockProxy<UniqueIdGenerator>
  let repository: MockProxy<SaveWallet>
  const wallet = {
    userId: faker.string.uuid(),
    name: faker.lorem.sentence({ min: 3, max: 5 }),
    balance: Number(faker.finance.amount()),
    creationDate: faker.date.anytime()
  }

  beforeAll(() => {
    crypto = mock()
    crypto.generate.mockResolvedValue({ uniqueId: 'my_token_genereted' })
    repository = mock()
    repository.save.mockResolvedValue({ id: 'my_token_genereted' })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateWalletUseCase(crypto, repository)
  })

  it('should call UniqueIdGenerator the wallet is without uuid', async () => {
    await sut.handle(wallet)

    expect(crypto.generate).toHaveBeenCalledTimes(1)
  })

  it('should dont call UniqueIdGenerator the wallet is without uuid', async () => {
    const id = 'my_token_received'

    await sut.handle({ id, ...wallet })

    expect(crypto.generate).toHaveBeenCalledTimes(0)
  })

  it('should call SaveWallet to create or update wallet', async () => {
    const id = 'my_token_genereted'

    await sut.handle(wallet)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({ id, ...wallet })
  })

  it('should call SaveWallet to create or update wallet when wallet is without uuid', async () => {
    const id = 'my_token_received'

    await sut.handle({ id, ...wallet })

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({ id, ...wallet })
  })
})
