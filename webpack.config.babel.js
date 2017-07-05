import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: './src/app.js',
  resolve: {
    root: path.join(__dirname, 'src')
  },
  output: {
    path: 'build',
    filename: 'app.js'
  },
  plugins: [ new HtmlWebpackPlugin(
    { title: "Volo Game Screen",
      template: "src/index.ejs"
    }
  )],
  devtool: "#source-map",
  module: {
    // preLoaders: [
    //   { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['eslint-loader'] }
    // ],
    loaders: [
      // { test: /\.js$/, /* exclude: /node_modules/,*/ loader: "babel-loader" },
      // { test: /node_modules\/constitute\/\.js$/, loader: "babel-loader" },
      {
        // test: /\.js$/, loaders: [ "babel-loader", "eslint-loader" ],
        test: /\.js$/, loaders: [ "babel-loader" ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
