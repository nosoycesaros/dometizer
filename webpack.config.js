const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'dometizer',
    libraryTarget:'umd'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  mode: 'development',
  devtool: 'sourceMap'
};