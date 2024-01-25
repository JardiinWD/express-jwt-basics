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


// Check if the application is running in development environment
if (process.env.NODE_ENV === 'development') {
  // Apply logging middleware using Morgan in 'dev' mode
  app.use(morgan('dev'));
}

// Custom Middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Express Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Routes

// Setting the MongoDB URI
const mongoDbUri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
// Setting the server to listen on process.env.SERVER_PORT
const port = process.env.SERVER_PORT || 3375

// Function to start the server after connecting to the database
const start = async () => {
  try {
    // Connecting to the database
    await connectDB(mongoDbUri);
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
