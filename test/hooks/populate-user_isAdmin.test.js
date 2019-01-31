const feathers = require('@feathersjs/feathers');
const isAdmin = require('../../src/hooks/populate-user_isAdmin');

describe('\'populate-user_isAdmin\' hook', () => {
  let app;

  const dummyUsers = [{
    googleId: 1,
  }, {
    googleId: 2,
  }];
  const dummyAdminUsers = [1];

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find() {
        return { data: dummyUsers };
      },
    });

    app.service('dummy').hooks({
      after: {
        find: isAdmin(dummyAdminUsers),
      },
    });
  });

  it('runs the hook', async () => {
    expect.assertions(2);
    const results = await app.service('dummy').find();
    expect(results.data.find((result) => result.googleId === 1).isAdmin)
      .toEqual(true);
    expect(results.data.find((result) => result.googleId === 2).isAdmin)
      .toEqual(false);
  });
});
