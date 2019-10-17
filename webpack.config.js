const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "none",
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "public"
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
  }
};