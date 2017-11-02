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
        const roomHeader = [
            'ID(忽略)',
            '房源名称',
            '房源简介',
            '房型',
            '所在楼层',
            '建筑面积',
            '套内面积',
            '户型结构',
            '建筑类型',
            '房屋朝向',
            '建筑结构',
            '装修情况',
            '梯户比例',
            '配备电梯',
            '产权年限',
            '发布时间',
            '交易权属',
            '上次交易时间',
            '房屋用途',
            '房屋年限',
            '产权所属',
            '抵押信息',
            '链家系统编码',

            '是否满五年',
            '是否满两年',
            '是否近地铁',
            '是否随时看房',

            '核心卖点',
            '交通出行',
            '房源地址-所在区',
            '房源地址-所在街道',
            '房源所在小区ID',
            '网页地址',
            '数据抓取时间',

            '关注人数',
            '总带看人数',
            '总价',
            '单价',
            '对应的房产',
            '最近七天看房次数'
        ];
        const communityHeader = [
            'ID(忽略)',
            '小区名称',
            '地址',
            '建筑年代',
            '建筑类型',
            '物业费用',
            '物业公司',
            '开发商',
            '楼栋总数',
            '房屋总数',
            '网页地址',
            '数据抓取时间'
        ];
        const dynamicDataHeader = [
            'ID(忽略)',
            '关注人数',
            '总带看人数',
            '总价',
            '单价',
            '对应的房产',
            '最近七天看房次数',
            '数据抓取时间'
        ];

        const roomData = dataArr[0].map(item => {
            item.five_years = item.five_years === 1 ? '是' : '否';
            item.two_years = item.two_years === 1 ? '是' : '否';
            item.near_subway = item.near_subway === 1 ? '是' : '否';
            item.see_free = item.see_free === 1 ? '是' : '否';
            return Object.values(item);
        });
        const communityData = dataArr[1].map(item => {
            return Object.values(item);
        });
        const dynamicData = dataArr[1].map(item => {
            return Object.values(item);
        });

        const excel = new WorkBook([
            {name: '房源基本信息', data: [roomHeader, ...roomData]},
            {name: '小区信息', data: [communityHeader, ...communityData]}
        ]);
        excel.writeFile(`export/房源数据${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`);
        return true;
    });
};

export default {exportExcel}