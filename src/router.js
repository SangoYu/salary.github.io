'use strict';

let baseRouter = require('./base/router');

module.exports = (app) => {
    app.use(baseRouter.routes());
};