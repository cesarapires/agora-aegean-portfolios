import { type MockProxy, mock } from 'jest-mock-extended'
import { Controller } from '@/application/controllers/controller'
import { type CreateTransaction } from '@/domain/feature/create-transaction'
import { CreateTransactionController } from '@/application/controllers/create-transaction-controller'

describe('CreateTransactionController', () => {
  let sut: CreateTransactionController
  let createTransaction: MockProxy<CreateTransaction>
  let request: any

  beforeAll(() => {
    createTransaction = mock()
    createTransaction.handle.mockResolvedValue({
      id: 'any_transaction_id',
      walletId: '5f8f8c44b54764421b7156c3',
      stockId: '6f8f8c44b54764421b7156c4',
      userId: '7f8f8c44b54764421b7156c5',
      type: 'BUY',
      quantity: 100,
      unitaryValue: 10,
      totalValue: 1000
    })
  })

  beforeEach(() => {
    sut = new CreateTransactionController(createTransaction, 'BUY')
    request = {
      walletId: '5f8f8c44b54764421b7156c3',
      stockId: '6f8f8c44b54764421b7156c4',
      userId: '7f8f8c44b54764421b7156c5',
      quantity: 100
    }
  })

  it('should extendes controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call CreateStock with correct params', async () => {
    await sut.handle(request)

    expect(createTransaction.handle).toHaveBeenCalledWith({ ...request, type: 'BUY' })
    expect(createTransaction.handle).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_transaction_id',
        walletId: '5f8f8c44b54764421b7156c3',
        stockId: '6f8f8c44b54764421b7156c4',
        userId: '7f8f8c44b54764421b7156c5',
        type: 'BUY',
        quantity: 100,
        unitaryValue: 10,
        totalValue: 1000
      }
    })
  })
})
