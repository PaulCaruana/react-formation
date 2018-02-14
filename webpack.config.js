let path = require("path");

module.exports = {
    entry: ["./index.js"],
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015", "stage-1"]
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        root: [path.resolve("./src")]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./"
    },
    debug: true,
    devtool: "source-map",
    externals: {
        react: {
            root: "React",
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom"
        }
    }
};