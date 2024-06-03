import { CreateStockUseCase } from '@/domain/use-cases/create-stock'
import { type SaveStock } from '@/domain/contracts/repositories/stock'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateWalletUseCase', () => {
  let sut: CreateStockUseCase
  let repository: MockProxy<SaveStock>
  const stock = {
    stock: 'PETR4',
    name: 'Petrobras PN',
    close: 28.35,
    change: -0.45283019,
    volume: 45783000,
    marketCap: 383600000000,
    logo: 'https://example.com/petrobras_logo.svg',
    sector: 'Energy',
    type: 'stock'
  }

  beforeAll(() => {
    repository = mock()
    repository.save.mockResolvedValue({ ...stock, id: 'any_id' })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateStockUseCase(repository)
  })

  it('should call SaveWallet to create wallet', async () => {
    await sut.handle(stock)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({ ...stock })
  })
})
