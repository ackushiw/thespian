'use strict';

module.exports = function(app) {
    // inject:start
    require('./initializeUser')(app);
    require('./profileData')(app);
    // inject:end
};