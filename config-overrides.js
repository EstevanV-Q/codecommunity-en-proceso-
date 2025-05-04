const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.extensions = [...config.resolve.extensions, '.mjs', '.json'];
  
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf.unshift({
        test: /\.(js|mjs)$/,
        include: /node_modules\/react-dropzone/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ],
            cacheDirectory: true,
            cacheCompression: false,
            compact: false,
          }
        }
      });
    }
    return rule;
  });

  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "assert": require.resolve("assert/"),
    "fs": false,
    "tls": false,
    "net": false,
    "zlib": false,
    "http": false,
    "https": false
  };

  // Add plugins
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  // Add alias for react-dropzone
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dropzone': path.resolve(__dirname, 'node_modules/react-dropzone/dist/esm/index.js')
  };

  return config;
}; 