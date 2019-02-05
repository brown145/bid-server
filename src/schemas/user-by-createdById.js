module.exports = {
  include: {
    service: 'users',
    nameAs: 'createdBy',
    parentField: 'createdById',
    childField: '_id',
  },
};
