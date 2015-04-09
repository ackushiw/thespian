'use strict';

module.exports = function(app) {
    // inject:start
    require('./initializeUser')(app);
    // inject:end
};