/**
 * Created by lcz on 2017/11/1.
 */
import XLSX from 'xlsx';
import log4js from 'log4js';
import co from 'co';

import room from '../DAL/room';
import community from '../DAL/community';
import dynamic_data from '../DAL/dynamic_data';

const logger = log4js.getLogger();

const exportExcel = () => {
    return co(function*() {
        let dataArr = yield [room.query(), community.query(), dynamic_data.query()];
        logger.info(JSON.stringify(dataArr));
        return dataArr;
    });
};

export default {exportExcel}