const path = require( 'path' ),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'source-map',

    context: path.join(__dirname, 'app'),

    entry: {
        app: './app.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        stats: 'errors-only'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, 'app'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'index.html' ),
            hash: true,
            chunk: ['app']
        })
    ]

};
