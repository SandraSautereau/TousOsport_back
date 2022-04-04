const Joi = require('joi');

const schema = Joi.object({

    date: Joi.date().required(),
    duration: Joi.string().regex(/^([01]?\d|2[0-3]|24(?=:00?:00?$)):([0-5]\d):([0-5]\d)$/).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    max_adherent: Joi.number().required(),
    sport_id: Joi.number().required()
});


module.exports = schema;