// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { value, issueId, createdAt, createdById } = context.data;

    context.data = {
      createdAt,
      createdById,
      issueId,
      value
    };

    return context;
  };
};
