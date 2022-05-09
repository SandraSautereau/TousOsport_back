const Session = require('../models/session');
const jwt = require('../services/jwt');

module.exports = {

    /**
    * Express middleware sending the sessions from database to the navigator
    * @route GET /v1/profile/coach/{id}/session/{id}
    * @param {Request} request
    * @param {Response} response 
    * @returns one session in json format 
    */
    findOne: async (request, response) => {

        const coachId = parseInt(request.params.coachId);

        const sessId = parseInt(request.params.sessId);

        const session = await Session.findOne(sessId, coachId);
        response.json(session);

    },

    /**
    * Express middleware sending the sessions from database to the navigator
    * @route /v1/categories/:id/sessions
    * @param {Request} request 
    * @param {Response} response 
    * @returns all sessions in json format 
    */
    findByCategory: async (request, response) => {
        const categoryId = parseInt(request.params.catId, 10);
        const sessions = await Session.findByCategory(categoryId);
        response.json(sessions);
    },


    /**
    * Express middleware sending the session from database to the navigator
    * @route /v1/categories/:id/sessions/:id
    * @param {Request} request 
    * @param {Response} response 
    * @returns the session with id = sessionId in json format 
    */
    findBySession: async (request, response) => {
        const categoryId = parseInt(request.params.catId, 10);
        const sessionId = parseInt(request.params.sessId, 10);
        const session = await Session.findBySession(categoryId, sessionId);
        response.json(session);
    },

    /**
    * Express middleware sending the sessions of a specified coach from database to the navigator
    * @route /v1/profile/coach/:id/session
    * @param {Request} request 
    * @param {Response} response 
    * @returns all the sessions from a coach in json format 
    */
    findByCoach: async (request, response) => {
        const coachId = parseInt(request.params.coachId, 10);
        const sessions = await Session.findByCoach(coachId);
        response.json(sessions);
    },

    //TODO comment      
    addSession: async (request, response) => {
        const session = new Session(request.body);
        const userId = +request.userId;

        try {
            await session.save(userId);
            response.status(201).json(session);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    /**
    * Express middleware sending the modified session to database
    * @route PATCH /v1/profile/coach/{coachId}/session/{sessId}
    * @param {Request} request
    * @param {Response} response 
    * @returns one session in json format 
    */
    update: async (request, response) => {
        try {
            const sessId = parseInt(request.params.sessId);
            const session = await new Session(request.body).update(sessId);
            console.log('session:', session)
            response.status(200).json(session);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },


    /**
    * Express middleware deleting a session from database
    * @route DELETE /v1/profile/coach/{coachId}/session/{sessId}
    * @param {Request} request
    * @param {Response} response 
    * @returns return a message
    */
     delete: async (request, response) => {
        try {
            const sessId = parseInt(request.params.sessId, 10);

            await new Session({ sessId }).delete();
            response.status(200).json('Session deleted');

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
}