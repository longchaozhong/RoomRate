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

const parseData = ($, rules) => {
    let result = {};
    for (let key in rules) {
        if (rules.hasOwnProperty(key)) {
            const rule = rules[key];
            let $dom = $(rule.selector);
            let value;
            if (rule.eq !== undefined) {
                $dom = $dom.eq(rule.eq);
            }
            switch (rule.type) {
                case 'Array':
                    let arr = [];
                    $dom.each((index, ele) => {
                        arr.push(_getValue($(ele), rule.value));
                    });
                    break;
                case 'String':
                    value = _getValue($dom, rule.value);
                    result[key] = value || rule.default || '';
                    break;
                case 'Bit':
                    value = _getValue($dom, rule.value);
                    result[key] = value ? 1 : 0;
                    break;
                default:
                    break;
            }
        }
    }
    return result;
};

const _getValue = ($dom, value) => {
    switch (value) {
        case 'text':
            return $dom.text().trim();
        case 'length':
            return $dom.length;
        default:
            return $dom.attr(value);
    }
};

export default {
    load, parseData
}