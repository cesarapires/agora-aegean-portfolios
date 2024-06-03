import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/save-transaction'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateTransactionUseCase', () => {
  let sut: CreateTransactionUseCase
  let repository: MockProxy<SaveTransaction>
  const transaction = {
    walletId: '5f8f8c44b54764421b7156c3',
    stockId: '6f8f8c44b54764421b7156c4',
    userId: '7f8f8c44b54764421b7156c5',
    type: 'BUY',
    quantity: 100,
    unitaryValue: 10.5,
    totalValue: 1050
  }

  beforeAll(() => {
    repository = mock()
    repository.save.mockResolvedValue({ ...transaction, id: 'any_id' })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateTransactionUseCase(repository)
  })

  it('should call SaveTransaction to create transaction', async () => {
    await sut.handle(transaction)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      ...transaction
    })
  })
})
