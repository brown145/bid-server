const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const {
      app, data, params,
    } = context;

    // Throw an error if we didn't get a issueId
    if (!data.issueId) {
      throw new errors.Unprocessable('IssueId is requred');
    }

    const issue = await app.service('issues').get(data.issueId, params);

    if (!issue) {
      throw new errors.Unprocessable(`issue with id ${data.issueId} not found`);
    }

    data.issueId = issue._id;

    return context;
  };
};
