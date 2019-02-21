const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, discard, iffElse, keep } = require('feathers-hooks-common');

const processGoogleUser = require('../../hooks/process-google-user');
const populateIsAdmin = require('../../hooks/populate-user_isAdmin');
const { adminWhitelist } = require('../../utilities/user-hardcodes');

const isSelf = (context) => {
  if (!context.params.user) {
    return false;
  }

  return context.params.user._id === context.result._id;
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [processGoogleUser()],
    update: [authenticate('jwt'), processGoogleUser()],
    patch: [authenticate('jwt')],
    remove: [disallow(), authenticate('jwt')],
  },

  after: {
    all: [],
    find: [
      populateIsAdmin(adminWhitelist),
      keep('_id', 'displayName', 'isAdmin'),
    ],
    get: [
      iffElse(
        isSelf,
        discard('google'),
        keep('_id', 'displayName', 'isAdmin'),
      ),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
