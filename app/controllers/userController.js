const User = require('../models/user');
const jwt = require('../services/jwt');

module.exports = {

    //TODO comment     
    showRegisterPage: (_, response) => {
        response.status(200).json('Register page')
    },

    //TODO comment     
    showLoginPage: (_, response) => {
        response.status(200).json('Login page')
    },

    //TODO comment      
    addUser: async (request, response) => {
        // Checking if email exists in DB

        const user = new User(request.body);

        // if email exists in DB
        const { email } = user;
        const userEmailChecked = await user.findByEmail(email);
        if (userEmailChecked) {
            return response.status(403).json({ error: 'This email has already been used' });
        }

        // TODO Checking if passwords match
        // TODO password lenght - tolowercase
        // if (request.body.password !== request.body.password2) {
        //     return response.status(204).json({ error: 'passwords do not match' });
        // }

        // make JWToken
        try {
            await user.save();
            const token = jwt.makeToken(user.id);
            response.setHeader("Access-Control-Expose-Headers", [
                "Authorization"
            ]);
            response.setHeader('Authorization', token);
            response.status(201).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

        // admin will not be saved
        if (request.body.role === 'user' || request.body.role === 'coach') {
            try {
                await user.save();
                response.status(201).json(user);
            }
            catch (error) {
                response.status(500).json(error.message);
            }
        }
    },


    /**
    * Express middleware to connect the user
    * @route GET /v1/login
    * @param {Request} request
    * @param {Response} response 
    * @returns a path
    */
    login: async (request, response) => {
        try {
            const user = await new User(request.body).doLogin();

            const token = jwt.makeToken(user.id);
            response.setHeader("Access-Control-Expose-Headers", [
                "Authorization"
            ]);
            response.setHeader('Authorization', token);

            response.status(200).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

        verifyToken: async (request, response) => {
            try {
                const idTokenaccess = parseInt(request.userId);

                const user = await User.findOne(idTokenaccess);
                response.status(200).json(user);
            } catch (error) {
                console.log(error);
                response.status(500).json(error.message);
            }
        },

            /**
            * Express middleware sending the users from database to the navigator
            * @route GET /v1/profile/{id}
            * @param {Request} request
            * @param {Response} response 
            * @returns one user in json format 
            */
            findOne: async (request, response) => {

                if (request.userId) {
                    console.log('request.userId:', request.userId)
                    const id = parseInt(request.userId);
                    const user = await User.findOne(id);

                    response.json(user);


                } else {
                    const id = parseInt(request.params.userId, 10);
                    const user = await User.findOne(id);
                    response.json(user);
                }

            },

                /**
                * Express middleware sending the modified user to database
                * @route PATCH /v1/profile/{id}
                * @param {Request} request
                * @param {Response} response 
                * @returns one user in json format 
                */
                update: async (request, response) => {
                    try {
                        await new User(request.body).update();
                        response.status(200).json("Profile updated");

                    } catch (error) {
                        console.log(error);
                        response.status(500).json(error.message);
                    }
                },

                    /**
                    * Express middleware deleting the user from database
                    * @route DELETE /v1/profile/user/{userId}
                    * @param {Request} request
                    * @param {Response} response 
                    * @returns return a message
                    */
                    deleteUser: async (request, response) => {
                        try {

                            const id = parseInt(request.params.userId, 10);
                            await new User({ id }).deleteUser();

                            response.status(200).json("User deleted");

                        } catch (error) {
                            console.log(error);
                            response.status(500).json(error.message);
                        }
                    },


                        /**
                    * Express middleware deleting the coach from database
                    * @route DELETE /v1/profile/coach/{coachId}
                    * @param {Request} request
                    * @param {Response} response 
                    * @returns return a message
                    */
                        deleteCoach: async (request, response) => {
                            try {

                                const coachId = parseInt(request.params.coachId, 10);
                                await new User({ coachId }).deleteCoach();

                                response.status(200).json("Coach deleted");

                            } catch (error) {
                                console.log(error);
                                response.status(500).json(error.message);
                            }
                        },
}
