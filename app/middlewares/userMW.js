const User = require('../models/user');

module.exports = async (request, response, next) => {

    // Get the user ID and profile route ID
    const userId = request.userId;

    try {
        // Get user profile from database
        const user = await User.findOne(userId);
        // Test if profile is user 
        // If so, allow access to the requested route
        if ((user.role === 'coach' || user.role === 'user' || user.role === 'admin')) next();

        else response.redirect('/v1/login');

    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}