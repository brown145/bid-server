const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (userWhitelist = []) {
  return async (context) => {
    const { google } = context.data;

    if (google && userWhitelist.includes(google.profile.id)) {
      // drop most of the google data
      context.data = {
        googleId: google.profile.id,
        email: google.profile.emails[0].value,
        displayName: google.profile.displayName || google.profile.emails[0].value,
      };
    } else {
      throw new errors.Unprocessable('invalid login');
    }

    return context;
  };
};
