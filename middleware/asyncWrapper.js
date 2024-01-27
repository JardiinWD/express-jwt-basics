/** Wraps an asynchronous function to handle errors and pass them to the next middleware
 * @param {Function} func - The asynchronous function to be wrapped
 * @returns {Function} - An asynchronous function with error handling
 */
const asyncWrapper = (func) => {

    /** Async middleware function to handle errors in asynchronous operations
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    return async (req, res, next) => {
        // Try executing the provided asynchronous function
        try {
            // Call the provided asynchronous function
            await func(req, res, next);
        } catch (error) {
            // Pass any caught error to the next middleware
            next(error);
        }
    }
}

module.exports = asyncWrapper;
