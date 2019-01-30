// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (adminWhitelist = []) {
  return async (context) => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { method, result } = context;

    // Make sure that we always have a list of items either by wrapping
    // a single item into an array or by getting the `data` from the `find` method's result
    const items = method === 'find' ? result.data : [result];

    // Asynchronously get user object from each item's `userId`
    // and add it to the item
    await Promise.all(items.map((item) => {
      // Also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      item.isAdmin = adminWhitelist.includes(item.googleId);
    }));

    // Best practice: hooks should always return the context
    return context;
  };
};
