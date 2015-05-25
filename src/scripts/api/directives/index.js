'use strict';

module.exports = function(app) {
  // inject:start
  require('./fireImage')(app);
  require('./fireUpload')(app);
  // inject:end
};
