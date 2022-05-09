const User = require('../models/user');

module.exports = async (request, response, next) => {

    // Get the user ID and profile route ID
    const userId = request.userId;
    const routeCoachId = parseInt(request.params.coachId, 10);

    try {
        // Get user profile from database
        const user = await User.findOne(userId);

        // Test if profile is user or coach and if his ID match the route ID. If so, allow access to his profile
        if ((user.role === 'coach') && (routeCoachId === user.coach_id) || (user.role === 'admin')) next();

        // if (user.role === 'admin') next();

        else {
            response.redirect('/v1/login');
        }

    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}