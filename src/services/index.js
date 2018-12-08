const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const rooms = require('./rooms/rooms.service.js');
const issues = require('./issues/issues.service.js');
const bids = require('./bids/bids.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(rooms);
  app.configure(issues);
  app.configure(bids);
};
