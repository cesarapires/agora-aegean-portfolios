import Joi from 'joi'

export const createTransactionSchemaValidation = Joi.object({
  stockId: Joi.string().required(),
  walletId: Joi.string().required(),
  userId: Joi.string().required(),
  quantity: Joi.number().required()
})

export const updateTransactionSchemaValidation = Joi.object({
  id: Joi.string().uuid().required(),
  stockId: Joi.string().required(),
  walletId: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  unitaryValue: Joi.number().required(),
  totalValue: Joi.number().required()
})
