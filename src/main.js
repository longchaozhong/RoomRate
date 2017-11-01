import process from "process";
import log4js from "log4js";

import parseHTML from "./BLL/parseHTML";

/**
 * 在入口函数即配置日志，全局有效
 */
log4js.configure(require('../config/log4js.json'));
let logger = log4js.getLogger();

parseHTML.parseIndex().then(()=>{
    logger.info('done');
}).catch((e) => {
    logger.error(e);
}).finally(() => {
    process.exit();
});


