import { CreateWalletUseCase } from '@/domain/use-cases/create-wallet'
import { type SaveWallet } from '@/domain/contracts/repositories/save-wallet'

import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateWalletUseCase', () => {
  let sut: CreateWalletUseCase
  let repository: MockProxy<SaveWallet>
  const wallet = {
    userId: faker.string.alphanumeric(),
    name: faker.lorem.sentence({ min: 3, max: 5 }),
    balance: Number(faker.finance.amount())
  }

  beforeAll(() => {
    repository = mock()
    repository.save.mockResolvedValue({ id: 'my_token_genereted' })
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2024, 0, 17, 3, 0, 0, 0))
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateWalletUseCase(repository)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should call SaveWallet to create wallet', async () => {
    await sut.handle(wallet)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      ...wallet,
      creationDate: new Date(new Date(2024, 0, 17, 3, 0, 0, 0))
    })
  })

  it('should throw Error when balance is negative', async () => {
    wallet.balance = -5

    const promise = sut.handle(wallet)

    await expect(promise).rejects.toThrow(new Error('Business Error: The initial balance cannot be negative'))
  })
})
