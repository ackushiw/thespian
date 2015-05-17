'use strict';

module.exports = function(app) {
    // inject:start
    require('./cloudStorage')(app);
    // inject:end
};