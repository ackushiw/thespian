'use strict';

module.exports = function(app) {
    // inject:start
    require('./resume')(app);
    require('./stats')(app);
    // inject:end
};