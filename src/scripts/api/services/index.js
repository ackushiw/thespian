'use strict';

module.exports = function(app) {
  // inject:start

  require('./cognito')(app);

  require('./google')(app);

  require('./uploadS3')(app);

  // inject:end
};
