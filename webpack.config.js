var path = require('path');

module.exports = {
  mode: 'development',
  entry: './jumper.js',
  output: {
    path: path.resolve(__dirname, "."),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
}
