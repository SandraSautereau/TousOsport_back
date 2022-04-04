const joiValidator = {
    validateBody: (schema) => (request, response, next) => {
        const {error} = schema.validate(request.body);
        if (error) {
            response.status(400).json(error.message);
        } else {
            next();
        }
    },

    validateQuery: (schema) => (request, response, next) => {
        const {error} = schema.validate(request.query);
        if (error) {
            response.status(400).json(error.message);
        } else {
            next();
        }
    },

    validateParams: (schema) => (request, response, next) => {
        const {error} = schema.validate(request.params);
        if (error) {
            response.status(400).json(error.message);
        } else {
            next();
        }
    }
}

module.exports = joiValidator;