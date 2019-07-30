"use strict";

var TwitterApi = function (options) {
  var shared = {};
  var options = options || {};

  function setupListeners() {
    console.log('setupListeners()');
  }

  var init = function init() {
    console.log('init()');
  };

  shared.init = init;
  return shared;
}();

TwitterApi.init();
//# sourceMappingURL=week5.js.map
