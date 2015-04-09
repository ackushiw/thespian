'use strict';

module.exports = function(app) {
    // inject:start
    require('./stats')(app);
    // inject:end
};