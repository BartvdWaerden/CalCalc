const path = require( 'path' ),
      webpack = require ('webpack');
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const processCss = isProduction ? '?minimize!postcss-loader' : '';

module.exports = {

    devtool: 'source-map',

    context: path.join(__dirname, 'src'),

    entry: {
        app: './app/index'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        contentBase: false,
        inline: true,
        hot: true,
        stats: 'errors-only'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: `css-loader${processCss}`
                }),
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.json$/,
                loader: 'file-loader',
                include: path.join(__dirname, 'src/'),
                exclude: /(node_modules|bower_components)/
            }
        ]
    },

    resolve: {

        alias: {
            'styles': path.resolve(__dirname, 'src/styles'),
            'assets': path.resolve(__dirname, 'src/assets'),
            'data': path.resolve(__dirname, 'src/data')
        }

    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),

        new ExtractTextPlugin({
            filename: '[name].styles.css',
            allChunks: true,
            disable: !isProduction
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html' ),
            inject: 'body',
            // excludeChunks: [], // exclude certain pages etc.
            hash: true,
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

    ]

};
