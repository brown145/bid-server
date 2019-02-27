module.exports = function () {
  return async (context) => {
    const { app, data } = context;
    const user = await app.service('users').get(data.createdById);
    data.roomId = user.roomId;
    return context;
  };
};
