const Joi = require('joi');

const schema = 
Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birth_date: Joi.date().required(),
    gender: Joi.string().required(),
    role: Joi.boolean().required(),
    photo: Joi.string().when(
        'role', { 
            is: 'true', 
            then: Joi.string().required() 
        }),
    description: Joi.string().when(
        'role', { 
            is: 'true', then: Joi.string().required() 
        }),
    city: Joi.string().when(
        'role', { 
            is: 'true', then: Joi.string().required() 
        })
});



module.exports = schema;