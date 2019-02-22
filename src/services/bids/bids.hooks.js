const { authenticate } = require('@feathersjs/authentication').hooks;
const { associateCurrentUser } = require('feathers-authentication-hooks');
const { disallow, keep, populate, required, setNow } = require('feathers-hooks-common');

const setBidValue = require('../../hooks/set-bid_value');
const associateIssue = require('../../hooks/associate-issue');
const issueSchema = require('../../schemas/issue-by-issueId');
const createdBySchema = require('../../schemas/user-by-createdById');
const validateUniqueBid = require('../../hooks/validate-bid_unique');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      required('value', 'issueId'),
      setNow('createdAt'),
      setBidValue(),
      associateCurrentUser({ as: 'createdById' }),
      associateIssue(),
      keep('createdAt', 'createdById', 'value', 'issueId'),
      validateUniqueBid(),
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [
      populate({ schema: createdBySchema }),
    ],
    get: [
      populate({ schema: issueSchema }),
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
