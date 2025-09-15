const Joi = require('joi');

const createAppointment = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().required(),
  address: Joi.object({
    cep: Joi.string().allow('', null),
    street: Joi.string().allow('', null),
    neighborhood: Joi.string().allow('', null),
    city: Joi.string().allow('', null),
    state: Joi.string().allow('', null),
    number: Joi.string().allow('', null),
    complement: Joi.string().allow('', null),
    lat: Joi.number().optional(),
    lon: Joi.number().optional()
  }).optional()
});

const updateAppointment = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().allow('', null).optional(),
  date: Joi.date().iso().optional(),
  address: Joi.object().optional()
});

const registerSchema = Joi.object({ name: Joi.string().min(2).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required() });
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

module.exports = { createAppointment, updateAppointment, registerSchema, loginSchema };
