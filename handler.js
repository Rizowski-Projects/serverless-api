'use strict';
var ig = require('./functions/instagram');
var goog = require('./functions/google');

module.exports = {
  latestPhoto: ig.getLatestPhoto,
  getGoogleLogo: goog.getLogo
};
