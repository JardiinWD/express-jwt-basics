// Custom error class to represent API errors with specific status codes
class CustomAPIError extends Error {
  // Constructor for the CustomAPIError class
  constructor(message, statusCode) {
    // Call the superclass constructor with the provided error message
    super(message);
    // Store the provided status code in the object
    this.statusCode = statusCode;
  }
}

/** Factory function to create instances of CustomAPIError
 * @param {string} msg - The error message
 * @param {number} statusCode - The HTTP status code for the error
 * @returns {CustomAPIError} - An instance of CustomAPIError with the specified message and status code
 */
const createCustomError = (msg, statusCode) => {
  // Create and return a new instance of CustomAPIError with the provided message and status code
  return new CustomAPIError(msg, statusCode);
}

// Export the createCustomError function and the CustomAPIError class for external use
module.exports = {
  createCustomError,
  CustomAPIError
}