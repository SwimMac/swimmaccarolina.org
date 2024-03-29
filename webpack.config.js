const isProduction = process.env.NODE_ENV === 'production';
const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: __dirname + '/src/_assets/scripts/app.js',
    },
    output: {
        path: isProduction ? __dirname + '/dist/static' : __dirname + '/src/static', // `/dist` is the destination
        filename: 'app.bundled.js', // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
    },
    module: {
        rules: [{
            test: /\.js$/, // rule for .js files
            exclude: /node_modules/,
            loader: "babel-loader" // apply this loader for js files
        }
        ]
    }
};