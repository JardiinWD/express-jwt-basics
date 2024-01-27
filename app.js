// Requiring the 'express' module
const express = require('express')
// Importing the dotenv package for environment variable configuration
const dotenv = require('dotenv');
// Configuring dotenv and specifying the path for the environment variables file
dotenv.config({ path: './config.env' })
// Requiring the 'express-async-errors' module
const asyncErrors = require('express-async-errors');
// Creating an Express application
const app = express();
// Requiring the 'morgan' module 
const morgan = require('morgan');
// Use morgan
app.use(morgan('dev'))
// Requiring the 'connectDB' function from the 'db/connect' module
const connectDB = require(`${__dirname}/db/connect`);
// Requiring the tasks routes
const mainRouter = require(`${__dirname}/routes/main`)
// Custom Middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// Check if the application is running in development environment
if (process.env.NODE_ENV === 'development') {
  // Apply logging middleware using Morgan in 'dev' mode
  app.use(morgan('dev'));
}

// Express Middlewares
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/express-jwt', mainRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Setting the server to listen on process.env.SERVER_PORT
const port = process.env.SERVER_PORT || 3375

// Function to start the server after connecting to the database
const start = async () => {
  try {
    // Starting the Express app and listening on the specified port
    app.listen(port, () => {
      console.log(`App is currently running on port: ${port}`);
    });
  } catch (error) {
    // Handling errors during the startup process
    console.error(error.message);
  }
}

// Calling the 'start' function to initiate the server startup process
start();
