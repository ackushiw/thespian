'use strict';

module.exports = function(app) {
    // inject:start
    require('./main')(app);
    require('./mainView')(app);
    // inject:end
};