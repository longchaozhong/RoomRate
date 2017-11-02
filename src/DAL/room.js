/**
 * Created by lcz on 2017/10/31.
 */
import DB from './MySQL_Pool';
import log4js from 'log4js';

const logger = log4js.getLogger();

const tableName = 'room';
const add = data => {
    return DB.execute(`insert into ${tableName} set ?`, [data]);
};

const update = (data, condition) => {
    return DB.execute(`update ${tableName} set ? where ?`, [data, condition]);
};

const exists = param => {
    return DB.query(`select id from ${tableName} where ? limit 0,1`, [param]).then(rows => {
        if (rows.length) {
            return rows;
        } else {
            return false;
        }
    });
};
const query = () => {
    return DB.query(`select distinct * from ${tableName} as r right join dynamic_data as d on r.id = d.room_id`);
};

export default {add, update, exists, query}