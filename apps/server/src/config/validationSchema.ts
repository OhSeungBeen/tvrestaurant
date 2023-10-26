import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_HOST: Joi.string().required(),
  APP_PORT: Joi.number().required(),
});
