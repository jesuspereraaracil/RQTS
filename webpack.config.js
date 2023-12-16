const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './build/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'lib')
  },
  externals: {
    "rxjs": "rxjs"
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
