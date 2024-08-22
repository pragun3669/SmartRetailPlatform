// middleware/auth.js
function auth(req, res, next) {
    // Check if user is authenticated using Passport.js
    if (req.auth()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    // User is not authenticated, redirect to login page or handle accordingly
    res.redirect('/login'); // Redirect to login page if not authenticated
}

module.exports = auth;
