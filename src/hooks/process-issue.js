// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data, params } = context;

    // Throw an error if we didn't get a name
    if(!data.name) {
      throw new Error('An issue must have a name');
    }

    // Throw an error if we didn't get a roomId
    if(!data.roomId) {
      throw new Error('An issue must have a roomId');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message name
    const name = context.data.name
      // Names can't be longer than 400 characters
      .substring(0, 400);
    // Validate that this s a valid room id
    const room = await app.service('rooms').get(data.roomId, params);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      name,
      // Set the user id
      userId: user.id,
      // Add the current date
      createdAt: new Date().getTime(),
      // Needs to ve associated to a room
      roomId: room._id
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
