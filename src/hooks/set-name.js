const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {
  maxLength: 200
}) {
  return async context => {
    const { data } = context;

    if(!data.name) {
      throw new errors.Unprocessable('Name is required.');
    }

    const name = data.name
      .trim()
      .substring(0, options.maxLength);

    context.data.name = name;

    return context;
  };
};
