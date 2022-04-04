const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
});


module.exports = schema;