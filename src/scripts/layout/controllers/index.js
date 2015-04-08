'use strict';

module.exports = function(app) {
    // inject:start
    require('./landing')(app);
    require('./main')(app);
    require('./mainView')(app);
    // inject:end
};