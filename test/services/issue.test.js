const app = require('../../src/app');

describe('\'issues\' service', () => {
  it('registered the service', () => {
    const service = app.service('issues');
    expect(service).toBeTruthy();
  });
});
