const feathers = require('@feathersjs/feathers');
const isAdmin = require('../../src/hooks/populate-user_isAdmin');

describe('\'populate-user_isAdmin\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      },
    });

    app.service('dummy').hooks({
      after: isAdmin(),
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').get('test');
    expect(result).toEqual({ id: 'test' });
  });
});
