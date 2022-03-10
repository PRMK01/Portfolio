const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/script.js',
    devServer: {
        static: './dist'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    stats: {
        errorDetails: true,
    },
}