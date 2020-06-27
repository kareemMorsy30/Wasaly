const path = require('path');

const SERVER_PORT = 5000;

const SERVER_CONFIGS = {
  DEVELOPMENT: process.env.NODE_ENV === 'development',
  PORT: SERVER_PORT || "not available",
};

module.exports = SERVER_CONFIGS;