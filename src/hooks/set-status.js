const errors = require('@feathersjs/errors');

module.exports = function (options = { statusList: ['pending', 'active', 'inactive'] }) {
  return async (context) => {
    const { id, method, app, data } = context;

    if (method === 'patch') {
      const existing = await app.service('issues').get(id);
      if (existing.status === 'inactive') {
        throw new errors.Unprocessable('Cannot update status for inactive issue');
      }
    }

    if (!data.status) {
      context.data.status = options.statusList[0];
    } else if (!options.statusList.includes(data.status)) {
      throw new errors.Unprocessable(`Invalid status, use: ${options.tatusList.join(', ')}`);
    }

    return context;
  };
};
