/**
 * Created by lcz on 2017/10/31.
 */
import DB from './MySQL_Pool';
import log4js from 'log4js';

const logger = log4js.getLogger();

const add = data => {
    return DB.execute('insert into room set ?', [data]);
};

const update = (data, condition) => {
    return DB.execute('update room set ? where ?', [data, condition]);
};

const exists = param => {
    return DB.query('select id from room where ? limit 0,1', [param]).then(rows => {
        if (rows.length) {
            return rows;
        } else {
            return false;
        }
    });
};

export default {add, update, exists}