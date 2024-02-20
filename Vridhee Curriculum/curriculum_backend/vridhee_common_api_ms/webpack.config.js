const path = require('path');
const {
    NODE_ENV = 'production',
} = process.env;
module.exports = {
    entry: './src/app.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vridhee_common_api_ms_bundle.js'
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