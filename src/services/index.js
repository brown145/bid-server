const bids = require('./bids/bids.service.js');
const issues = require('./issues/issues.service.js');
const users = require('./users/users.service.js');

module.exports = function (app) {
  app.configure(bids);
  app.configure(issues);
  app.configure(users);
};
