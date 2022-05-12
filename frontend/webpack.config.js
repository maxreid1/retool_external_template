const path = require('path');

const { deployOnLocalhost } = require('./config')
const OUTPUT_LOCATION = deployOnLocalhost ? path.join(__dirname, 'dist') : path.join(__dirname, '../backend/public/js');

module.exports = {
  mode: 'development',
  output: {
    filename: 'pbl.bundle.js',
    path: OUTPUT_LOCATION,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PBL_DEV_PORT || 3001,
    proxy: {
      context: ['/auth', '/api'],
      target: ['http://localhost', process.env.PBL_PORT || '3000'].join(':')
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              "@babel/preset-env", 
              "@babel/preset-react"
            ],
            "plugins": [
              ["@babel/plugin-transform-runtime"]
            ],
          }
        }
      }
    ]
  },
};