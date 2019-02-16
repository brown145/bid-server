const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = { statusList: ['pending', 'active', 'inactive'] }) {
  return async (context) => {
    const { data } = context;

    if (!data.status) {
      context.data.status = options.statusList[0];
    } else if (!options.statusList.includes(data.status)) {
      throw new errors.Unprocessable(`Invalid status, use: ${options.tatusList.join(', ')}`);
    }

    return context;
  };
};
