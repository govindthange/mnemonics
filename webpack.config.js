const path = require('path');

module.exports = {
    entry: './src/index.ts', // entry point code for the application
    devtool: 'inline-source-map', // mapping of the source code. i.e. mapping the files from where the code is coming and is packed into the bundle.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};