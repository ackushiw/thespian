'use strict';

module.exports = function(app) {
    // inject:start
    require('./menuButton')(app);
    require('./responsive')(app);
    // inject:end
};