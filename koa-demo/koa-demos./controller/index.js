const log4js = require('log4js');

const logger = log4js.getLogger('controller');

function addRouter(router){
    roouter = router||'';
    console.log(router);
    return router;
}

logger.error("yao",'test yaoyunchou');
module.exports =  {
    addRouter
};