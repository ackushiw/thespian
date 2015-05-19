'use strict';

module.exports = function(app) {
  // inject:start
  require('./pictures')(app);
  require('./resume')(app);
  require('./stats')(app);
  // inject:end
};
