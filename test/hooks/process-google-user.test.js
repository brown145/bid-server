const feathers = require('@feathersjs/feathers');
const parseGoogleUser = require('../../src/hooks/process-google-user');

const getDummyDataObj = (id) => ({
  google: {
    profile: {
      id,
      displayName: 'dummyDisplayName',
      emails: [{
        value: 'fake@fake.com',
      }],
    },
  },
});
const dummyUserWhitelist = ['999'];

describe('\'process-google-user\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async update(id, data) {
        return data;
      },
    });

    app.service('dummy').hooks({
      before: {
        update: parseGoogleUser(dummyUserWhitelist),
      },
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').update('id-001', getDummyDataObj('999'));
    expect(result).toEqual({ googleId: '999', displayName: 'dummyDisplayName' });
  });
});
