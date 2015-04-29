'use strict';

module.exports = function(app) {
    // inject:start
    require('./create')(app);
    require('./draftsDetail')(app);
    require('./draftsList')(app);
    // inject:end
};