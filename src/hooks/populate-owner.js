const populateUser = require('../hooks/populate-user');

module.exports = function () {
  return async context => populateUser({
    propName: 'owner',
    keyId: 'ownerId'
  })(context);
}
