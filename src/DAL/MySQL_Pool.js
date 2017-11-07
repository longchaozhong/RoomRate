/**
 * Created by lcz on 2017/10/27.
 */
import MySQL from 'mysql2/promise';
const DBConfig = require('../../config/database.json');

const pool = MySQL.createPool(DBConfig);

/**
 * 开启事务执行SQL
 * @param sql
 * @param param
 * @returns {Promise}
 */
const execute = async(sql, param = []) => {
    let connection = await pool.getConnection();
    await connection.beginTransaction();
    let results = await connection.query(sql, param).catch((error) => {
        connection && connection.release();
        throw error;
    });
    await connection.commit().catch((error) => {
        connection && connection.release();
        throw error;
    });
    connection.release();
    return results[0];
};

/**
 * 数据库查询操作
 * @param sql
 * @param params
 * @returns {Promise}
 */
const query = async(sql, params = []) => {
    let connection = await pool.getConnection();
    let results = await connection.query(sql, params).finally(() => {
        connection && connection.release();
    });
    return results[0];
};

export default {
    execute,
    query
}
