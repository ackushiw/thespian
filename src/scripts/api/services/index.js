'use strict';

module.exports = function(app) {
  // inject:start

  require('./uploadS3')(app);

  // inject:end
};
