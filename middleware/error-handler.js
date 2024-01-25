// Importing customAPIError handler
const { CustomAPIError } = require('../errors/custom-error');

/** Express middleware for handling errors and sending a standardized JSON response
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandlerMiddleware = (err, req, res, next) => {
  // Check if the error is an instance of the CustomAPIError class
  if (err instanceof CustomAPIError) {
    // Respond with a custom status code and the error message from the CustomAPIError
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // If the error is not a CustomAPIError, respond with a generic 500 Internal Server Error
  return res.status(500).json({
    message: 'Something went wrong, please try again!' // Error message describing the issue
  });
}

module.exports = errorHandlerMiddleware;

