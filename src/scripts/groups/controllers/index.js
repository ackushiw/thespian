'use strict';

module.exports = function(app) {
  // inject:start
  require('./create')(app);
  require('./main')(app);
  require('./userGroups')(app);
  // inject:end
};
