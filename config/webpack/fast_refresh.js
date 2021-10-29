const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  configure: (config) => {
    const clone = { ...config };
    const { devServer } = clone;
    devServer.liveReload = false;

    // Webpacker is using an old configuration for the dev-server,
    // We should upgrade wepacker in gem file to use get the correct configuration.
    // In the mean time, we correct the configuration.
    let { client } = devServer;
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
    clone.stats = devServer.stats;
    delete devServer.stats;
    devServer.watchFiles = ['app/javascript/src/*'];

    //  Add react-refresh-plugin to the plugins
    clone.plugins.push(new ReactRefreshWebpackPlugin());

    clone.module = {
      rules: [
        {
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
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    };

    //  Add babel-loader to the loaders for react files.
    // let obj = clone.module;
    // console.log(obj);
    // if (!obj) {
    //   clone.module = {};
    //   obj = clone.module;
    // }
    // obj = obj.rules;
    // if (!obj) {
    //   clone.module.rules = [];
    //   obj = clone.module.rules;
    // }
    // obj.unshift({
    //   test: /\.[jt]sx?$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: require.resolve('babel-loader'),
    //       options: {
    //         plugins: [require.resolve('react-refresh/babel')],
    //       },
    //     },
    //   ],
    // });

    //  value given in the node property is no longer valid.
    delete clone.node;

    return clone;
  },
};
