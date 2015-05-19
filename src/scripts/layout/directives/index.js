'use strict';

module.exports = function(app) {
  // inject:start
  require('./getDimensions')(app);
  require('./menuButton')(app);
  require('./responsive')(app);
  // inject:end
};
