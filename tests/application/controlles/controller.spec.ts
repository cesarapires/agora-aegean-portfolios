import { Controller } from '@/application/controllers/controller'
import { ServerError } from '@/application/errors/http'

import { type HttpResponse } from '@/application/helpers/http'
import Joi from 'joi'

const genericJoi = Joi.object({
  teste: Joi.string().required()
})

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub(genericJoi)
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('"teste" is required')

    const httpResponse = await sut.handle({ teste1: 'any_value' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ teste: 'any_value' })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle({ teste: 'any_value' })

    expect(httpResponse).toEqual(sut.result)
  })
})
