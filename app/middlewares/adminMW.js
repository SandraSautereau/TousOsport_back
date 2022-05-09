const User = require('../models/user');

module.exports = async (request, response, next) => {

    // Get the user ID and profile route ID
    const userId = parseInt(request.userId);

    try {
        // Get user profile from database
        const user = await User.findOne(userId);

        // Test if profile is admin 
        // If so, allow access to the requested route
        if (user.role === 'admin') next();

        else response.redirect('/v1/login');
        console.log("else");

    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}