// Initializes the `apy` service on path `/apy`
const { Apy } = require('./apy.class');
const hooks = require('./apy.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/apy', new Apy(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('apy');

  service.hooks(hooks);
};
