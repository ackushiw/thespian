'use strict';

module.exports = function(app) {
  // inject:start
  require('./auth')(app);
  // inject:end
};
