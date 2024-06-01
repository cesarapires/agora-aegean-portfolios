import { type Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters/express-router'
import { makeCreateNewStockController } from '@/main/factories/application/controllers/create-stock-controller'

export default (router: Router): void => {
  const controllerPost = makeCreateNewStockController()

  router.post('/stock', adaptExpressRoute(controllerPost))
}
