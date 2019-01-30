const feathers = require('@feathersjs/feathers');
const associateIssue = require('../../src/hooks/associate-issue');

describe('\'associate-issue\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      },
    });

    app.service('dummy').hooks({
      before: associateIssue(),
    });
  });

  it('runs the hook', async () => {
    expect.assertions(1);
    const result = await app.service('dummy').get('test');
    expect(result).toEqual({ id: 'test' });
  });
});
