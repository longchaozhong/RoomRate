import process from "process";
import log4js from "log4js";

import parseHTML from "./BLL/parseHTML";
import exportExcel from "./BLL/exportExcel";
import room from './DAL/room';

/**
 * 在入口函数即配置日志，全局有效
 */
log4js.configure(require('../config/log4js.json'));
let logger = log4js.getLogger();

/*const startTime = new Date().getTime();
 parseHTML.parseIndex().then(() => {
 logger.info(`下载完毕，耗时${(new Date().getTime() - startTime) / 1000}s`);
 }).catch((e) => {
 logger.error(e);
 }).finally(() => {
 process.exit();
 });*/


exportExcel.exportExcel().catch((e) => {
    logger.error(e);
}).finally(() => {
    process.exit();
});