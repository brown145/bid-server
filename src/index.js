/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, prc) => logger.error('Unhandled Rejection at: Promise ', prc, reason)
);

logger.info('Attempt Feathers application start on http://%s:%d', app.get('host'), port);
server.on('listening', () => logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
