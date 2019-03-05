const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, discard, iffElse, keep } = require('feathers-hooks-common');
const { associateCurrentUser } = require('feathers-authentication-hooks');

const processGoogleUser = require('../../hooks/process-google-user');
const populateIsAdmin = require('../../hooks/populate-user_isAdmin');
const { adminWhitelist } = require('../../utilities/user-hardcodes');

const isSelf = (context) => {
  if (!context.params.user) {
    return false;
  }

  return context.params.user._id === context.result._id;
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [processGoogleUser()],
    update: [authenticate('jwt'), processGoogleUser()],
    patch: [
      authenticate('jwt'),
      associateCurrentUser({ as: '_id' }),
      (context) => {
        // TODO: move to patach current users
        if (context.id === 'currentUser') {
          context.id = context.data._id;
          context.arguments[0] = context.data._id;
        }
        return context;
      },
      async (context) => {
        // TODO: move to associate roomId
        const { app, data, params } = context;
        const { connection } = params;

        if (data.roomId) {
          const room = await app.service('rooms').get(data.roomId);
          if (room) {
            app.emit('join', { roomId: room._id, connection }); // notify channles
            context.service.emit('joinRoom', { roomId: room._id, user: params.user }); // notifiy clients

            if (params.user.roomId !== room._id) {
              app.emit('leave', { roomId: params.user.roomId, connection }); // notify channles
              context.service.emit('leaveRoom', { roomId: params.user.roomId, user: params.user }); // notifiy clients
            }
          } else {
            data.roomId = null;
          }
        }

        return context;
      },
    ],
    remove: [disallow(), authenticate('jwt')],
  },

  after: {
    all: [],
    find: [
      populateIsAdmin(adminWhitelist),
      keep('_id', 'displayName', 'isAdmin'),
    ],
    get: [
      iffElse(
        isSelf,
        discard('google'),
        keep('_id', 'displayName', 'isAdmin', 'roomId'),
      ),
    ],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
