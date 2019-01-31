const feathers = require('@feathersjs/feathers');
const setName = require('../../src/hooks/set-name');

describe('\'set-name\' hook', () => {
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
        create: setName(),
      },
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').create({ name: 'boo' });
    expect(result).toEqual({ name: 'boo' });
  });
});
