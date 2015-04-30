'use strict';

module.exports = function(app) {
    // inject:start
    require('./expanded')(app);
    require('./landing')(app);
    require('./main')(app);
    require('./mainView')(app);
    require('./sidenav')(app);
    // inject:end
};