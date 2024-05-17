import { type Controller } from '@/application/controllers/controller'

import { type RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (request, response) => {
  const { statusCode, data } = await controller.handle({ ...request.body, ...request.locals })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  response.status(statusCode).json(json)
}
