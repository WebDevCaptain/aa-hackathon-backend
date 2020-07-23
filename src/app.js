const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Database Connection
require('./db/index');

// Import Routes and Hooks
const baseRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const webHooks = require('./routes/hooks/data');

const app = express();

// Setting secure response headers
app.use(
  helmet({
    hidePoweredBy: {
      setTo: 'PHP/5.4.0',
    },
  })
);

// Configuring the application
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Registering Routes and WebHooks
app.use('/auth', userRoutes);
app.use(baseRoutes);
app.use(webHooks);

module.exports = app;
