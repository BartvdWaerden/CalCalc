const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    devtool: 'source-map',

    context: path.join(__dirname, '../src'),

    entry: {
      app: [
        './app/index.js',
        './styles/app.scss',
      ],
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },

    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'src/styles'),
        assets: path.resolve(__dirname, 'src/assets'),
        data: path.resolve(__dirname, 'src/data'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader!eslint-loader',
          include: path.join(__dirname, 'src'),
          exclude: /(node_modules)/,
        },
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
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[hash].[ext]',
          },
          include: path.join(__dirname, 'src/'),
        },
        {
          test: /\.json$/,
          loader: 'file-loader?name=[name].[hash].[ext]',
          include: path.join(__dirname, 'src/'),
          exclude: /(node_modules)/,
        },
      ],
    },

    plugins: [

      new ExtractTextPlugin({
        filename: '[name].[hash].css',
        allChunks: true,
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, '..', 'src', 'index.html'),
        inject: 'body',
        // excludeChunks: [], // exclude certain pages etc.
        hash: true,
        filename: 'index.html',
      }),

    ],
  };
};
