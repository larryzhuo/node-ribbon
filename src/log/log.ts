import * as os from 'os';

const log4js = require('log4js');

log4js.configure({
  appenders: { throttler: { type: 'file', filename: `${os.homedir()}/throttler.log` } },
  categories: { default: { appenders: ['throttler'], level: 'info' } },
});

const logger = log4js.getLogger('throttler');
export default logger;
