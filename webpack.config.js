const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const processCss = isProduction ? '?minimize!postcss-loader' : '';

module.exports = {

  devtool: 'source-map',

  context: path.join(__dirname, 'src'),

  entry: {
    app: [
      './app/index.js',
      './styles/app.scss',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js', // finally should be '[name].[chunkhash].js for Long-Term Caching
  },

  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: false,
    inline: true,
    hot: true,
    stats: 'errors-only',
  },

  module: {
    rules: [ // was loaders
      {
        test: /\.js$/,
        loader: 'babel-loader!eslint-loader',
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [`css-loader${processCss}`, 'sass-loader'],
          fallback: 'style-loader',
        }),
        include: path.join(__dirname, 'src/'),
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
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },

  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'src/assets'),
      data: path.resolve(__dirname, 'src/data'),
    },
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),

    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
      disable: !isProduction,
    }),

    new webpack.optimize.UglifyJsPlugin({
      disable: !isProduction,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
      // excludeChunks: [], // exclude certain pages etc.
      hash: true,
      filename: 'index.html',
    }),

    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),

    new webpack.HotModuleReplacementPlugin(),

  ],
};
