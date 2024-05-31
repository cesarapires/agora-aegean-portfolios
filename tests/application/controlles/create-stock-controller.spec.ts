import { type MockProxy, mock } from 'jest-mock-extended'
import { Controller } from '@/application/controllers/controller'
import { type CreateStock } from '@/domain/feature/create-stock'
import { CreateNewStockController } from '@/application/controllers/create-stock-controller'

describe('CreateNewStockController', () => {
  let sut: CreateNewStockController
  let createStock: MockProxy<CreateStock>
  let request: any

  beforeAll(() => {
    createStock = mock()
    createStock.handle.mockResolvedValue({
      id: 'any_wallet_id',
      stock: 'AAPL',
      name: 'Apple Inc.',
      close: 145.09,
      change: -0.53,
      volume: 12039430,
      marketCap: 2421000000000,
      logo: 'https://logo.clearbit.com/apple.com',
      sector: 'Technology',
      type: 'Equity'
    })
  })

  beforeEach(() => {
    sut = new CreateNewStockController(createStock)
    request = {
      stock: 'AAPL',
      name: 'Apple Inc.',
      close: 145.09,
      change: -0.53,
      volume: 12039430,
      marketCap: 2421000000000,
      logo: 'https://logo.clearbit.com/apple.com',
      sector: 'Technology',
      type: 'Equity'
    }
  })

  it('should extendes controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call CreateStock with correct params', async () => {
    await sut.handle(request)

    expect(createStock.handle).toHaveBeenCalledWith({ ...request })
    expect(createStock.handle).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_wallet_id',
        stock: 'AAPL',
        name: 'Apple Inc.',
        close: 145.09,
        change: -0.53,
        volume: 12039430,
        marketCap: 2421000000000,
        logo: 'https://logo.clearbit.com/apple.com',
        sector: 'Technology',
        type: 'Equity'
      }
    })
  })
})
