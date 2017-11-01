/**
 * Created by lcz on 2017/11/1.
 */
import log4js from 'log4js';
import co from 'co';
import moment from 'moment';

import room from '../DAL/room';
import community from '../DAL/community';
import dynamic_data from '../DAL/dynamic_data';
import WorkBook from './common/excel';

const logger = log4js.getLogger();

const exportExcel = () => {
    return co(function*() {
        let dataArr = yield [room.query(), community.query(), dynamic_data.query()];
        const roomTitles = [
            '房源名称',
            '房源简介',
            '房型',
            '所在楼层',
            '建筑面积',
            '套内面积'
        ];
        const communityTitles = ['小区名称', '地址', '建筑年代', '建筑类型', '物业费用', '物业公司'];

        const excel = new WorkBook([
            {name:'房源基本信息',data:dataArr[0],header:[]},
            {name:'小区信息',data:dataArr[1],header:[]},
            {name:'房源动态数据',data:dataArr[2],header:[]}
        ]);
        excel.writeFile(`export/房源数据${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`);
        return true;
    });
};

export default {exportExcel}