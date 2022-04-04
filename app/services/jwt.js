const JWT = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    // Make token when login or register
    makeToken: userId => {
        try {
            return JWT.sign(
                {
                    data: userId
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '5d'
                }

            );

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // Validate token
    validateToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}