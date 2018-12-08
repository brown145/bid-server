// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const fibonacci = [1,2,3,5,8,13,21];

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data, params } = context;

    // Throw an error if we didn't get a value
    if(!data.value) {
      throw new Error('A bid must have a value');
    }

    // Throw an error if we didn't get an issue id
    if(!data.issueId) {
      throw new Error('A bid must have an issue');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message value
    const value = Number(context.data.value);
    // Validate that this s a valid room id
    const issue = await app.service('issues').get(data.issueId, params);

    // Validate value is number
    if(value === NaN) {
      throw new Error('Bid value must be a number');
    }

    // Validate value is in fibonacci series
    if(!fibonacci.includes(value)) {
      throw new Error(`Bid value not valid. Use one of ${fibonacci.slice(0, -1).join(', ')} or ${fibonacci.slice(-1)}.`);
    }

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      value,
      // Set the user id
      userId: user.id,
      // Add the current date
      createdAt: new Date().getTime(),
      // Needs to ve associated to a issue
      issueId: issue.id
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
