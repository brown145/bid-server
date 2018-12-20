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
      associateCurrentUser({ as: 'createdById' }),
      setName({ maxLength: 200 }),
      (context) => { context.data.memberIds = []; return context; },
      keep('createdAt', 'createdById', 'memberIds', 'name'),
    ],
    update: [disallow()],
    patch: [disallow()], // TODO: iff(context => !context.params.user.isAdmin, disallow())
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [
      populate({ schema: createdBySchema }),
      // TODO: populate members
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
