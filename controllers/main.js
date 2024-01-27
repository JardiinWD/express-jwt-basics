// Importing the Async Wrapper
const asyncWrapper = require('../middleware/asyncWrapper');
// Importing custom error handler
const { createCustomError, CustomAPIError } = require('../errors/custom-error');
// Importing the JWT Package
const JWToken = require('jsonwebtoken');
// Importing the dotenv package for environment variable configuration
const dotenv = require('dotenv');
// Configuring dotenv and specifying the path for the environment variables file
dotenv.config({ path: '../config.env' });

/** Controller function for user login
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = asyncWrapper(async (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;

  // Checking if username or password is missing
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  // Just for demonstration, normally provided by DB
  const dummyId = new Date().getDate();

  // Generating JWT token with user data
  const token = JWToken.sign(
    {
      dummyId, // User ID
      username // Username
    },
    process.env.JWT_SECRET, // JWT secret key
    {
      expiresIn: '30d' // Token expiration time
    }
  );

  // Sending success response with token
  res.status(200).json({
    message: 'user created',
    token
  });
});

/** Controller function for dashboard data
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const dashboard = asyncWrapper(async (req, res) => {
  // Generating a random lucky number
  const luckyNumber = Math.floor(Math.random() * 100);

  // Sending success response with user-specific data
  res.status(200).json({
    message: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
  });
});

module.exports = {
  login,
  dashboard
};
