const { authenticate } = require('@feathersjs/authentication').hooks;
const { associateCurrentUser } = require('feathers-authentication-hooks');
const { disallow, keep, populate, required, setNow } = require('feathers-hooks-common');

const setName = require('../../hooks/set-name');
const setStatus = require('../../hooks/set-status');
const associateRoomIdByUser = require('../../hooks/associate-roomByUser');
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
      setStatus(),
      associateCurrentUser({ as: 'createdById' }),
      associateRoomIdByUser(),
      keep('createdAt', 'createdById', 'name', 'status', 'roomId'),
    ],
    update: [disallow()],
    patch: [
      required('status'),
      setStatus(),
      keep('status'),
    ],
    remove: [], // TODO: some validation here, like status is pending
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
