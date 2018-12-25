const path = require('path')
const webpack = require('webpack')

module.exports = {

  mode: 'production',

  entry: './src/index',

  output: {
    filename: 'coladb.js',
    path: path.join(__dirname, 'dist'),
    library: 'colaDB',
    libraryExport: 'default',
    libraryTarget: 'var'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
}
