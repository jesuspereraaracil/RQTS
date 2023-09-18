const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    globalObject: 'this',
    library: {
      type: 'commonjs'
    },
    path: path.resolve(__dirname, 'lib')
  },
  externals: {
    "rxjs": "rxjs"
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
