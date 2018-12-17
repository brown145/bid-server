const errors = require('@feathersjs/errors');
const fibonacci = [1,2,3,5,8,13,21];

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    // Throw an error if we didn't get a value
    if(!context.data.value) {
      throw new errors.Unprocessable('A bid must have a value');
    }

    const value = Number(context.data.value);

    // Validate value is number
    if(value === NaN) {
      throw new errors.Unprocessable('Bid value must be a number');
    }

    // Validate value is in fibonacci series
    if(!fibonacci.includes(value)) {
      throw new errors.Unprocessable(`Bid value not valid. Use one of ${fibonacci.slice(0, -1).join(', ')} or ${fibonacci.slice(-1)}.`);
    }

    context.data.value = value;

    return context;
  };
};
