const errors = require('@feathersjs/errors');

module.exports = function () {
  return async (context) => {
    const { app, data } = context;
    const { createdById, issueId } = data;

    const existingBids = await app.service('bids').find({
      query: {
        createdById,
        issueId,
      },
    });

    if (existingBids.total > 0) {
      throw new errors.Unprocessable(
        'User has already bid on this issue',
        { bidValue: existingBids.data[0].value }
      );
    }

    return context;
  };
};
