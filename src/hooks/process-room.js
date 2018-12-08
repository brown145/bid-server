// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a name
    if(!data.name) {
      throw new Error('A room must have a name');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message name
    const name = context.data.name
      // Names can't be longer than 400 characters
      .substring(0, 400);

    console.log('processRoom user', user)

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      name,
      // Set the user id
      ownerId: user.id,
      // Add the current date
      createdAt: new Date().getTime(),
      // create array for users
      memberIds: []
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
