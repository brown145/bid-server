const { authenticate } = require('@feathersjs/authentication').hooks;
const { associateCurrentUser } = require('feathers-authentication-hooks');
const { disallow, keep, populate, required, setNow } = require('feathers-hooks-common');

const setName = require('../../hooks/set-name');
const createdBySchema = require('../../schemas/user-by-createdById');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      required('name'),
      setNow('createdAt'),
      setName({ maxLength: 200 }),
      associateCurrentUser({ as: 'createdById' }),
      keep('createdAt', 'createdById', 'name'),
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [
      populate({ schema: createdBySchema }),
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
