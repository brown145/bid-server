const feathers = require('@feathersjs/feathers');
const setValue = require('../../src/hooks/set-bid_value');

describe('\'set-value\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return data;
      },
    });

    app.service('dummy').hooks({
      before: {
        create: setValue(),
      },
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').create({ value: 1 });
    expect(result).toEqual({ value: 1 });
  });
});
