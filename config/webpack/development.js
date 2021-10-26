process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const fastRefresh = require('./fast_refresh');
const environment = require('./environment');

const config = environment.toWebpackConfig();

fastRefresh.configure(config);

module.exports = config;  // environment.toWebpackConfig();
