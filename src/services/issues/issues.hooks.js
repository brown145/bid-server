const { authenticate } = require('@feathersjs/authentication').hooks;

const processIssue = require('../../hooks/process-issue');
const populateRoom = require('../../hooks/populate-room');
const formatId = require('../../hooks/format-id');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processIssue()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [formatId()],
    get: [populateRoom(), formatId()],
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
