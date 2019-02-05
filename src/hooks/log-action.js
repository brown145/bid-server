// log actions where authorization is required
const logger = require('../logger');

module.exports = function () {
  return (context) => {
    if (context.params.user) {
      const userId = context.params.user._id;
      logger.info(`Action ${context.method} ${context.path} by user ${userId}`);
    }


    return context;
  };
};
