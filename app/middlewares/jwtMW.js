const jwt = require('../services/jwt');

module.exports = (request, response, next) => {
    try {

        let token = request.headers.authorization && request.headers.authorization.split(" ")[0];

        // there is no token in header
        if (!token) {
            return response.status(401).json('Invalid token, no token');
        }
        const payload = jwt.validateToken(token);
        console.log("payload:", payload);
        // if token is not valid 
        if (!payload.data) {
            return response.status(401).json('Invalid token, no payload.data');
        }
        request.userId = payload.data;
        next();

    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}