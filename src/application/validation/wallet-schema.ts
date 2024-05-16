import Joi from 'joi'

export const createWalletSchemaValidation = Joi.object({
  id: Joi.string().uuid(),
  userId: Joi.string().uuid().required(),
  name: Joi.string().required(),
  balance: Joi.number().required()
})

export const updateWalletSchemaValidation = Joi.object({
  id: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  name: Joi.string().required(),
  balance: Joi.number().required()
})
