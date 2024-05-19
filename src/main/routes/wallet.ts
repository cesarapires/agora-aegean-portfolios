import { type Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters/express-router'
import { makeCreateNewWalletController } from '@/main/factories/application/controllers/create-wallet-controller'

export default (router: Router): void => {
  const controllerPost = makeCreateNewWalletController()

  router.post('/wallet', adaptExpressRoute(controllerPost))
}
