const { authenticate } = require('@feathersjs/authentication').hooks;
const processGoogleUser = require('../../hooks/process-google-user');
const { disallow, discard, iffElse, keep } = require('feathers-hooks-common');

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
      keep('_id', 'displayName'),
    ],
    get: [
      iffElse(
        isSelf,
        discard('google'),
        keep('_id', 'displayName'),
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
