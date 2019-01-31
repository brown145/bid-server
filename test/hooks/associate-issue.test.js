const feathers = require('@feathersjs/feathers');
const associateIssue = require('../../src/hooks/associate-issue');

describe('\'associate-issue\' hook', () => {
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
        create: associateIssue(),
      },
    });

    app.use('/issues', {
      async get(id) {
        return { _id: id };
      },
    });

    app.service('issues').hooks({
      after: {
        get: (context) => context,
      },
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').create({ issueId: 123 });
    expect(result).toEqual({ issueId: 123 });
  });
});
