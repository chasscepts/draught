process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const fastRefresh = require('./fast_refresh');
const environment = require('./environment');

const config = environment.toWebpackConfig();

module.exports = fastRefresh.configure(config);
