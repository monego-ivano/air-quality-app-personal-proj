const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: ['./src/logic.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new Dotenv()
  ]
};