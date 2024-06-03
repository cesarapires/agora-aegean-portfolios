import { type GetStock } from '@/domain/contracts/repositories/stock'
import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateTransactionUseCase', () => {
  let sut: CreateTransactionUseCase
  let transactionRepository: MockProxy<SaveTransaction>
  let stockRepository: MockProxy<GetStock>
  const transaction = {
    walletId: '5f8f8c44b54764421b7156c3',
    stockId: '6f8f8c44b54764421b7156c4',
    userId: '7f8f8c44b54764421b7156c5',
    type: 'BUY',
    quantity: 100
  }

  beforeAll(() => {
    transactionRepository = mock()
    stockRepository = mock()
    transactionRepository.save.mockResolvedValue({
      ...transaction,
      id: 'any_id',
      unitaryValue: 10.5,
      totalValue: 1050
    })
    stockRepository.get.mockResolvedValue({
      id: '6f8f8c44b54764421b7156c4',
      stock: 'PETR4',
      name: 'Petrobras PN',
      close: 10.5,
      change: -0.45283019,
      volume: 45783000,
      marketCap: 383600000000,
      logo: 'https://example.com/petrobras_logo.svg',
      sector: 'Energy',
      type: 'stock'
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateTransactionUseCase(
      transactionRepository,
      stockRepository
    )
  })

  it('should call GetStock to get stockPrice', async () => {
    await sut.handle(transaction)

    expect(stockRepository.get).toHaveBeenCalledTimes(1)
    expect(stockRepository.get).toHaveBeenCalledWith('6f8f8c44b54764421b7156c4')
  })

  it('should throw Error when GetStock is undefined', async () => {
    stockRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.handle(transaction)

    await expect(promise).rejects.toThrow(new Error('Business Error: Stock not found'))
  })

  it('should call SaveTransaction to create transaction', async () => {
    await sut.handle(transaction)

    expect(transactionRepository.save).toHaveBeenCalledTimes(1)
    expect(transactionRepository.save).toHaveBeenCalledWith({
      ...transaction,
      unitaryValue: 10.5,
      totalValue: 1050
    })
  })
})
