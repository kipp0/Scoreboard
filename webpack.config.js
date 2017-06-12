const path = require( 'path' )

module.exports = {
  entry: './app.js',

  output: {
    path: path.resolve( __dirname, 'build'),
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
//  OLD SYNTAX
  // loaders: [
  //
  //   {
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     loader: 'babel-loader'
  //   },
  //   {
  //     test: /\.css$/,
  //     // loader: 'style-loader!css-loader'
  //     loader: ['style-loader', 'css-loader']
  //   }
  // ]
