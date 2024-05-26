import Joi from 'joi'

export const createStockSchemaValidation = Joi.object({
  id: Joi.string().uuid(),
  stock: Joi.string().required(),
  name: Joi.string().required(),
  close: Joi.number().required(),
  change: Joi.number().required(),
  volume: Joi.number().required(),
  marketCap: Joi.number().required(),
  logo: Joi.string().required(),
  sector: Joi.string().required(),
  type: Joi.string().required()
})

export const updateStockSchemaValidation = Joi.object({
  id: Joi.string().uuid().required(),
  stock: Joi.string().required(),
  name: Joi.string().required(),
  close: Joi.number().required(),
  change: Joi.number().required(),
  volume: Joi.number().required(),
  marketCap: Joi.number().required(),
  logo: Joi.string().required(),
  sector: Joi.string().required(),
  type: Joi.string().required()
})
