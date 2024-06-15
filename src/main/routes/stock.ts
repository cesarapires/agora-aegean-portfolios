import { type Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters/express-router'
import { makeCreateNewStockController } from '@/main/factories/application/controllers/create-stock-controller'
import { makeCreateBuyTransactionController } from '@/main/factories/application/controllers/create-transaction-buy-controller'
import { makeCreateSellTransactionController } from '@/main/factories/application/controllers/create-transaction-sell-controller'

export default (router: Router): void => {
  const controllerPost = makeCreateNewStockController()
  const controllerTransactionBuy = makeCreateBuyTransactionController()
  const controllerTransactionSell = makeCreateSellTransactionController()

  router.post('/stock', adaptExpressRoute(controllerPost))
  router.post('/stock/buy', adaptExpressRoute(controllerTransactionBuy))
  router.post('/stock/sell', adaptExpressRoute(controllerTransactionSell))
}
