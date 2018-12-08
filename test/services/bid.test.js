const app = require('../../src/app');

describe('\'bids\' service', () => {
  it('registered the service', () => {
    const service = app.service('bids');
    expect(service).toBeTruthy();
  });
});
