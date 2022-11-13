import * as os from 'os';
import log4js from 'log4js';

log4js.configure({
  appenders: { ribbon: { type: 'file', filename: `${os.homedir()}/ribbon.log` } },
  categories: { default: { appenders: ['ribbon'], level: 'info' } },
});

const logger = log4js.getLogger('ribbon');
export default logger;
