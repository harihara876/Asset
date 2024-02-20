const path = require('path');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV.toString() == "development" ? "development" : "production";
module.exports = {
    entry: './src/app.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vridhee_account_ms_bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    },
    optimization: {
        minimize: false
    }
}