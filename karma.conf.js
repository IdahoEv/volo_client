
// var webpackCfg = require('./webpack.config');
var path =require('path');


// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'Chrome' ],
    files: [
      // 'test/**/*Test.js'
      'tests.webpack.js'
    ],
    port: 8001,
    captureTimeout: 2000,
    frameworks: [ 'mocha', 'sinon-chai' ],
    client: {
      mocha: {},
      captureConsole: true,
      chai: { includeStack: true }
    },
    // reporters: [ 'mocha', 'coverage' ],
    reporters: [ 'mocha' ],
    preprocessors: {

      // use loadspecs.js to force coverage of all files whether or not they
      // have specs written.  Use test/**/*Test.js to webpack each spec file individually
      // which may make debugging easier but excludes coverage of files that don't get
      // imported by specs.
      // 'test/**/*Test.js': ['webpack']
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: {
      node: {
        fs: 'empty'
      },
      cache: true,
      devtool: 'inline-source-map',
      resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js'],
        // Sinon's conditional AMD requires make webpack unhappy.  I can probably remove
        // this once sinon 2.0 is released. Fix from here:
        // SEE this: https://github.com/webpack/webpack/issues/304#issuecomment-193319594
        alias: {
          sinon: 'sinon/pkg/sinon.js'
        }
      },

      // Instrument code that isn't test or vendor code.
      module: {
        preLoaders: [
          // { test: /\.js$/, loader: 'isparta', include: path.join(__dirname, 'src/') }
        ],
        loaders: [
          { test: /\.js$/,
            exclude: /node_modules/, //path.join(__dirname, 'src/'),
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          // Sinon's conditional AMD requires make webpack unhappy.  We can probably remove
          // this once sinon 2.0 is released. Fix from here:
          // SEE this: https://github.com/webpack/webpack/issues/304#issuecomment-193319594
          { test: /sinon\/pkg\/sinon\.js/,
            loader: 'imports?define=>false,require=>false' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    // coverageReporter: {
    //   dir: 'coverage/',
    //   reporters: [
    //     { type: 'html' },
    //     { type: 'lcov', subdir: 'lcov' },
    //     { type: 'text' }
    //   ]
    // }
  });
};
