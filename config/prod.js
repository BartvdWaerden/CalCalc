const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    output: {
      filename: '[name].[chunkhash].js',
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader',
            ],
          }),
          include: path.join(__dirname, '../src/'),
        },
      ],
    },

    plugins: [

      new CleanWebpackPlugin(['dist'], {
        root: __dirname,
        verbose: true,
        dry: false,
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),

      new webpack.optimize.UglifyJsPlugin(),

      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        allChunks: true,
      }),

      // Make sure this is after ExtractTextPlugin.
      new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute.
        paths: glob.sync(path.join(__dirname, '../src/*.html')),
      }),

    ],
  });
};
