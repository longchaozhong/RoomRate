/**
 * Created by lcz on 2017/10/30.
 */
import https from 'https';

const load = url => {
    return new Promise((resolve, reject) => {
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
                reject(e);
            });
        });
    });

};

export default {
    load
}