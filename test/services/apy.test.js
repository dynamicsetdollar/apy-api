const assert = require('assert');
const app = require('../../src/app');

describe('\'apy\' service', () => {
  it('registered the service', () => {
    const service = app.service('apy');

    assert.ok(service, 'Registered the service');
  });
});
