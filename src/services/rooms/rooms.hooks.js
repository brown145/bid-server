const { authenticate } = require('@feathersjs/authentication').hooks;

const processRoom = require('../../hooks/process-room');
const populateOwner = require('../../hooks/populate-owner');

const formatId = require('../../hooks/format-id');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processRoom()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [formatId()],
    get: [populateOwner(), formatId()],
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
