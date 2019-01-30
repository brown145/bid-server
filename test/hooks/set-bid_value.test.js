const feathers = require('@feathersjs/feathers');
const setValue = require('../../src/hooks/set-bid_value');

describe('\'set-value\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      },
    });

    app.service('dummy').hooks({
      before: setValue(),
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').get('test');
    expect(result).toEqual({ id: 'test' });
  });
});
