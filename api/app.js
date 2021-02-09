'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');

//imports the sequelize ORM 
const { sequelize } = require('./models');

// gains access to our routes
const routes = require('./routes/routes');

// variable to enable global error logging(any errors not logged get cauht and logged here)
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// *** MIDDLEWARE *** // 

// Setup request body JSON parsing.
app.use(express.json());
// setup morgan which gives us http request logging
app.use(morgan('dev'));
// Add routes.js and '/api' to all routes.
app.use('/api', routes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// *** ERROR HANDLING *** //

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500)
    .json({
    message: err.message,
    error: {},
  });
});


// Sequelize model authentication, then logs whether or not we gain access to database 
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// set our port
app.set('port', process.env.PORT || 5000);

// Sequelize model synchronization, then start listening on our port.
sequelize.sync()
  .then( () => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });