import { type MockProxy, mock } from 'jest-mock-extended'
import { Controller } from '@/application/controllers/controller'
import { type CreateWallet } from '@/domain/feature/create-wallet'
import { CreateNewWalletController } from '@/application/controllers/create-wallet-controller'
import { faker } from '@faker-js/faker'

describe('CreateNewWalletController', () => {
  let sut: CreateNewWalletController
  let createWallet: MockProxy<CreateWallet>
  let request: any

  beforeAll(() => {
    createWallet = mock()
    createWallet.handle.mockResolvedValue('any_wallet_id')
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2024, 0, 17, 3, 0, 0, 0))
  })

  beforeEach(() => {
    sut = new CreateNewWalletController(createWallet)
    request = {
      userId: faker.string.alphanumeric(),
      name: faker.finance.accountName(),
      balance: faker.finance.amount()
    }
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should extendes controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call CreateWallet with correct params', async () => {
    await sut.handle(request)

    expect(createWallet.handle).toHaveBeenCalledWith({
      ...request,
      creationDate: new Date(new Date(2024, 0, 17, 3, 0, 0, 0))
    })
    expect(createWallet.handle).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { id: 'any_wallet_id' }
    })
  })
})
