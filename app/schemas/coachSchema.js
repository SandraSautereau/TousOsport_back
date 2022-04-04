const Joi = require('joi');

const schema = Joi.object({

    id: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birth_date: Joi.date().required(),
    gender: Joi.string().required(),
    role: "coach",
    coach_id: Joi.number().required(),
    photo: Joi.string(),
    description: Joi.string().required(),
    city: Joi.string().required()
});


module.exports = schema;