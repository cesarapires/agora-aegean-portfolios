import { UUIDHandler } from '@/infraestructure/gateways/crypto/uuid-handler'

import { v4 as uuidv4 } from 'uuid'

jest.mock('uuid')

describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeAll(() => {
    jest.mocked(uuidv4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', async () => {
    await sut.generate()

    expect(uuidv4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', async () => {
    const uuid = await sut.generate()

    expect(uuid).toEqual({
      uniqueId: 'any_uuid'
    })
  })
})
