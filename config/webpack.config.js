'use strict';

const path = require('path');
const babelRules = require('./webpack/babel-rules');

module.exports = function(env = 'production') {
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      library: 'link-to-name',
      libraryTarget: env === 'development' ? 'umd' : 'commonjs2',
      path: path.resolve(__dirname, '../lib'),
      filename: 'index.js',
    },
    module: {
      strictExportPresence: true,
      rules: [
        babelRules(env, __dirname),
      ],
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
    },
    devtool: env === 'development' ? 'eval-source-map': undefined,
  };
};
