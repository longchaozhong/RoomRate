/**
 * Created by lcz on 2017/10/30.
 */
import URL from "url";
import cheerio from "cheerio";
import log4js from "log4js";

import Utils from "./common/utils";
import saveDetail from './saveDetail';
import SavePool from './savePool';

const urls = require("../../config/URL.json");

const logger = log4js.getLogger();
const parseIndex = (finishedCallback) => {
    Utils.load(URL.resolve(urls.BASIC, 'y4l2l3p2p1/')).then(html => {
        let $ = cheerio.load(html);
        //获取分页信息
        let page = $('.page-box.house-lst-page-box').attr('page-data');
        let totalRoom = $('.resultDes .total span').text().trim() * 1;
        page = JSON.parse(page);

        const savePool = new SavePool(totalRoom, finishedCallback);
        return Promise.all((() => {
            let promiseArr = [];
            for (let pageNum = 1; pageNum <= page.totalPage; pageNum++) {
                promiseArr.push(
                    saveDetail.collectDetailURL(URL.resolve(urls.BASIC, `pg${pageNum}y4l2l3p2p1/`), pageNum)
                        .then(result => {
                            result.forEach(detailURL => {
                                savePool.addTask(detailURL);
                            });
                        })
                );
            }
            return promiseArr;
        })());

    }).catch(error => {
        logger.error(`收集详情页URL过程中出错${error.message}`);
    });
};


export default {parseIndex};