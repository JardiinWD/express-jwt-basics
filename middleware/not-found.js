/** Controller function for handling not-found routes by sending a 404 response
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const notFound = (req, res) => {
    // Respond with a 404 status and a message indicating the route does not exist
    res.status(404).send('Route does not exist');
}

module.exports = notFound;