import { type GetStock } from '@/domain/contracts/repositories/stock'
import { CreateTransactionUseCase } from '@/domain/use-cases/create-transaction'
import { type SaveTransaction } from '@/domain/contracts/repositories/transaction'
import { type GetWallet, type UpdateWallet } from '@/domain/contracts/repositories/wallet'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('CreateTransactionUseCase', () => {
  let sut: CreateTransactionUseCase
  let transactionRepository: MockProxy<SaveTransaction>
  let stockRepository: MockProxy<GetStock>
  let walletRepository: MockProxy<GetWallet & UpdateWallet>
  const transaction = {
    walletId: '5f8f8c44b54764421b7156c3',
    stockId: '6f8f8c44b54764421b7156c4',
    userId: '7f8f8c44b54764421b7156c5',
    type: 'BUY',
    quantity: 100
  }
  const dateGeneric = new Date()

  beforeAll(() => {
    transactionRepository = mock()
    stockRepository = mock()
    walletRepository = mock()
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
    walletRepository.get.mockResolvedValue({
      id: '5f8f8c44b54764421b7156c3',
      userId: '5e1a0651741b255ddda996c4',
      name: 'My firs wallet',
      balance: 1050,
      creationDate: dateGeneric
    })
    sut = new CreateTransactionUseCase(
      transactionRepository,
      stockRepository,
      walletRepository
    )
  })

  it('should call GetStock', async () => {
    await sut.handle(transaction)

    expect(stockRepository.get).toHaveBeenCalledTimes(1)
    expect(stockRepository.get).toHaveBeenCalledWith('6f8f8c44b54764421b7156c4')
  })

  it('should call GetWallett', async () => {
    await sut.handle(transaction)

    expect(walletRepository.get).toHaveBeenCalledTimes(1)
    expect(walletRepository.get).toHaveBeenCalledWith('5f8f8c44b54764421b7156c3')
  })

  it('should call UpdateWallet to update with new balance', async () => {
    await sut.handle(transaction)

    expect(walletRepository.update).toHaveBeenCalledTimes(1)
    expect(walletRepository.update).toHaveBeenCalledWith({
      id: '5f8f8c44b54764421b7156c3',
      userId: '5e1a0651741b255ddda996c4',
      name: 'My firs wallet',
      balance: 0.0,
      creationDate: dateGeneric
    })
  })

  it('should call UpdateWallet to update with new balance when transaction is sale', async () => {
    transaction.type = 'SELL'

    await sut.handle(transaction)

    expect(walletRepository.update).toHaveBeenCalledTimes(1)
    expect(walletRepository.update).toHaveBeenCalledWith({
      id: '5f8f8c44b54764421b7156c3',
      userId: '5e1a0651741b255ddda996c4',
      name: 'My firs wallet',
      balance: 2100,
      creationDate: dateGeneric
    })
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

  it('should throw Error when stock is undefined', async () => {
    stockRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.handle(transaction)

    await expect(promise).rejects.toThrow(new Error('Stock not found'))
  })

  it('should throw Error when wallet is undefined', async () => {
    walletRepository.get.mockResolvedValueOnce(undefined)

    const promise = sut.handle(transaction)

    await expect(promise).rejects.toThrow(new Error('Wallet not found'))
  })

  it('should throw Error when insufficient funds', async () => {
    transaction.quantity = 110
    transaction.type = 'BUY'

    const promise = sut.handle(transaction)

    await expect(promise).rejects.toThrow(new Error('Insufficient funds'))
  })

  it('should throw Error when type is invalid', async () => {
    transaction.type = 'ANY_TYPE'

    const promise = sut.handle(transaction)

    await expect(promise).rejects.toThrow(new Error('Invalid transaction type'))
  })
})
