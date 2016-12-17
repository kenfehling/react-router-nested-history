'use strict';

var webpack = require('webpack');
var base = require('./webpack.config.base');
var _ = require("lodash");

module.exports = _.merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});