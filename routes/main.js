// Requiring the 'express' module
const express = require('express');
// Creating an instance of an Express Router
const router = express.Router();
// Requiring the 'login and dashboard' controller functions
const {
    login,
    dashboard
} = require('../controllers/main');
// Requiring the 'authorization' middleware
const {
    authenticationMiddleware
} = require('../middleware/auth')

// Defining routes for login operations

/** Route for user login
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
router.route('/login').post(login);

/** Route for user dashboard
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
router.route('/dashboard').get(authenticationMiddleware, dashboard);


module.exports = router