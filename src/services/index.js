const bids = require('./bids/bids.service.js');
const issues = require('./issues/issues.service.js');
const users = require('./users/users.service.js');

const rooms = require('./rooms/rooms.service.js');

module.exports = function (app) {
  app.configure(bids);
  app.configure(issues);
  app.configure(users);
  app.configure(rooms);
};
