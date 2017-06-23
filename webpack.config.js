const path = require( 'path' )
// const ASSET_PATH = process.env.ASSET_PATH || './public';ç

module.exports = {
  devtool: 'inline-sourcemap',
  context: path.resolve( __dirname + '/src' ),
  entry: './index.js',

  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'bundle.js'
  },

  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot-loader', 'babel-loader' ]
      },
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ]

  }
}
