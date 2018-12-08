const { authenticate } = require('@feathersjs/authentication').hooks;

const processBid = require('../../hooks/process-bid');
const populateIssue = require('../../hooks/populate-issue');
const populateUser = require('../../hooks/populate-user');
const formatId = require('../../hooks/format-id');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processBid()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [formatId()],
    get: [populateIssue(), populateUser(), formatId()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
