// Importing the Async Wrapper
const asyncWrapper = require('./asyncWrapper');
// Importing custom error handler
const { createCustomError, CustomAPIError } = require('../errors/custom-error');
// Importing the JWT Package
const JWToken = require('jsonwebtoken');
// Importing the dotenv package for environment variable configuration
const dotenv = require('dotenv');
// Configuring dotenv and specifying the path for the environment variables file
dotenv.config({ path: '../config.env' });

/** Middleware for user authentication
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
    // Extracting authorization header from the request
    const authHeader = req.headers.authorization;

    // Checking if authorization header is missing or not in the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }

    // Extracting the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verifying and decoding the JWT token
        const decoded = JWToken.verify(token, process.env.JWT_SECRET);

        // Extracting user information from the decoded token
        const { id, username } = decoded;

        // Setting user information in the request object
        req.user = {
            id, username
        };

        // Passing control to the next middleware in the stack
        next();
    } catch (error) {
        // Handling unauthorized access error
        throw new CustomAPIError('Not authorized to access this route', 401);
    }
});

module.exports = {
    authenticationMiddleware
};
