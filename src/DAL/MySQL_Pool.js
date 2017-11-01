/**
 * Created by lcz on 2017/10/27.
 */
import MySQL from 'mysql2/promise';
import co from 'co';
const DBConfig = require('../../config/database.json');

const pool = MySQL.createPool(DBConfig);

/**
 * 开启事务执行SQL
 * @param sql
 * @param param
 * @returns {Promise}
 */
const execute = (sql, param = []) => {
    return co(function*() {
        let connection = yield pool.getConnection();
        yield connection.beginTransaction();
        let results = yield connection.query(sql, param).catch((error) => {
            connection && connection.release();
            throw error;
        });
        yield connection.commit().catch((error) => {
            connection && connection.release();
            throw error;
        });
        connection.release();
        return results[0];
    });
};

/**
 * 数据库查询操作
 * @param sql
 * @param params
 * @returns {Promise}
 */
const query = (sql, params = []) => {
    return co(function*() {
        let connection = yield pool.getConnection();
        let results = yield connection.query(sql, params).finally(() => {
            connection && connection.release();
        });
        return results[0];
    });
};

export default {
    execute,
    query
}
