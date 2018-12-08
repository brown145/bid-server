// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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
    }

    return context;
  };
};
