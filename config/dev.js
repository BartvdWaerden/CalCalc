const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    devServer: {
      contentBase: false,
      inline: true,
      hot: true,
      stats: 'errors-only',
    },

    plugins: [

      new webpack.HotModuleReplacementPlugin(),

    ],
  });
};
