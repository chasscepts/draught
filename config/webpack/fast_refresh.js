const webpack = require('webpack');
const { environment } = require('@rails/webpacker');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  configure: (config) => {
    const devServer = config.devServer;
    devServer.liveReload = false;

    //  Webpacker is using an old configuration for the dev-server, We should upgrade wepacker in gem file to use get the correct configuration. In the mean time, we correct the configuration.
    let client = devServer.client;
    if (!client) {
      client = {};
      devServer.client = client;
    }

    client.logging = 'error';
    delete devServer.clientLogLevel;
    client.overlay = devServer.overlay;
    delete devServer.overlay;

    delete devServer.quiet;
    delete devServer.disableHostCheck;

    let staticProperty = devServer.static;
    if (!staticProperty) {
      staticProperty = {};
      devServer.static = staticProperty;
    }
    staticProperty.directory = devServer.contentBase;
    delete devServer.contentBase;
    staticProperty.publicPath = devServer.publicPath;
    delete devServer.publicPath;

    delete devServer.inline;
    delete devServer.useLocalIp;
    delete devServer.public;
    delete devServer.watchOptions;
    config.stats = devServer.stats;
    delete devServer.stats;
    devServer.watchFiles = ['app/javascript/components/*'];

    //  Add react-refresh-plugin to the plugins
    config.plugins.push(new ReactRefreshWebpackPlugin());

    //  Add babel-loader to the loaders for react files.
    let obj = config.module;
    if (!obj) {
      config.module = {};
      obj = config.module;
    }
    obj = obj.rules;
    if (!obj) {
      config.module.rules = [];
      obj = config.module.rules;
    }
    obj.unshift({
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      ],
    });

    //  value given in the node property is no longer valid.
    delete config.node;
  }
};
