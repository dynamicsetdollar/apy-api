const apy = require('./apy/apy.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apy);
};
