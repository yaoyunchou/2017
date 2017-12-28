var log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'info' } }
  });
var logger = log4js.getLogger('test');

logger.debug("Time:", new Date());

module.exports = {log4js,logger};