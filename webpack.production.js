/*eslint-disable*/
var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.s?css$/, //match css or scss
                loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
            },
            {
                test: /\.js$/,
                loaders: ['babel?cacheDirectory=true&presets=es2015'],
                //exclude: /node_modules.((?!snabbdom-to-html)).*/ //webpack pulls in snabbdom-to-html as part of cycle-snabbdom.  Uflify doesn't like es6 code.
                exclude: /node_modules/
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        //new webpack.IgnorePlugin(/snabbdom-to-html/),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};
/*eslint-enable*/
