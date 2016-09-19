import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/app.js',
  resolve: {
    root: path.join(__dirname, 'src')
  },
  output: {
    path: 'build',
    publicPath: './build/',
    filename: './app.js'
  },
  plugins: [ new HtmlWebpackPlugin() ],
  module: {
    // preLoaders: [
    //   { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['eslint-loader'] }
    // ],
    loaders: [
      // { test: /\.js$/, /* exclude: /node_modules/,*/ loader: "babel-loader" },
      // { test: /node_modules\/constitute\/\.js$/, loader: "babel-loader" },
      {
        // test: /\.js$/, loaders: [ "babel-loader", "eslint-loader" ],
        test: /\.js$/, loaders: [ "babel-loader" ],
        exclude: /node_modules/
      },
      { test: /sinon\/pkg\/sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
  },
  // eslint: {
  //   configFile: '.eslintrc',
  //   failOnWarning: false,
  //   failOnError: true,
  //   emitError: true
  // }
}
