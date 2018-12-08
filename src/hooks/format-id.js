// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of items either by wrapping
    // a single message into an array or by getting the `data` from the `find` method's result
    const items = method === 'find' ? result.data : [ result ];

    // Asynchronously get user object from each message's `userId`
    // and add it to the message
    await Promise.all(items.map(async item => {
      // Also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      item.id = item._id;
      delete item._id;
    }));

    return context;
  };
};
