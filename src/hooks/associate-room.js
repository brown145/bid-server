const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {
  as: 'roomId',
  from: 'roomId'
}) {
  return async context => {
    const { app, data, params } = context;

    // Throw an error if we didn't get a roomId
    if (!data.roomId) {
      throw new Error(`${from} is requred`);
        throw new errors.Unprocessable(`${from} is requred`);
    }

    const room = await app.service('rooms').get(data.roomId, params);

    if (!room) {
      throw new errors.Unprocessable(`room with id ${data.roomId} not found`);
    }

    data.roomId = room._id;

    return context;
  };
};
