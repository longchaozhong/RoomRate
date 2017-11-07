/**
 * Created by lcz on 2017/10/30.
 */
import https from 'https';
import log4js from "log4js";

const logger = log4js.getLogger();
const load = url => {
    return new Promise((resolve, reject) => {
        try {
            https.get(url, res => {
                let rawData = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    resolve(rawData);
                });
                res.on('error', (e) => {
                    logger.error(e.message);
                    reject(e);
                });
            }).on('error', e => {
                reject(e);
            });
        } catch (e) {
            reject(e);
        }

    });

};

export default {
    load
}