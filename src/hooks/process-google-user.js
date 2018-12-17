const { getByDot } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { google } = context.data;

    if (context.data.google) {
      // drop most of the google data
      context.data = {
        googleId: google.profile.id,
        displayName: google.profile.displayName || emails[0].value
      }
    } else {
      throw new errors.Unprocessable('invalid login');
    }

    return context;
  };
};
