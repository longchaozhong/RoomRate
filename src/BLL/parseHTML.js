/**
 * Created by lcz on 2017/10/30.
 */
import URL from "url";
import cheerio from "cheerio";
import log4js from "log4js";
import co from "co";
import ProgressBar from "progress";

import Utils from "./common/utils";
import room from "../DAL/room";
import community from "../DAL/community";
import dynamic_data from "../DAL/dynamic_data";

const urls = require("../../config/URL.json");

const logger = log4js.getLogger();
const parseIndex = () => {
    return Utils.load(URL.resolve(urls.BASIC, 'y4l2l3p2p1/')).then(html => {
        let $ = cheerio.load(html);
        //获取分页信息
        let page = $('.page-box.house-lst-page-box').attr('page-data');
        page = JSON.parse(page);

        //获取所有详情页url
        return co(function*() {
            let detailURLs = [];
            logger.info(`共${page.totalPage}页数据,计算房源总数`);
            let pageBar = new ProgressBar(`[:bar]:current/:total :etas`, {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: page.totalPage
            });
            for (let pageNum = 1; pageNum <= page.totalPage; pageNum++) {
                yield collectDetailURL(URL.resolve(urls.BASIC, `p${pageNum}y4l2l3p2p1/`)).then(result => {
                    detailURLs = detailURLs.concat(result);
                    pageBar.tick();
                });
            }

            logger.info(`共${detailURLs.length}个房源,开始下载`);
            let bar = new ProgressBar(`[:bar]:current/:total :etas`, {
                complete: '=',
                incomplete: ' ',
                width: 100,
                total: detailURLs.length
            });
            for (let i = 0; i < detailURLs.length; i++) {

                yield saveDetailInfo(detailURLs[i]).then(() => {
                    bar.tick();
                });
            }
            return true;
        });


    }).catch(error => {
        logger.error(error);
    });
};

/**
 * 收集列表每页房源的详情页URL
 * @param pageURL
 * @returns {Promise.<Array>}
 */
const collectDetailURL = pageURL => {
    return Utils.load(pageURL).then(html => {
        let result = [];
        let $ = cheerio.load(html);
        $('li .title a', '.sellListContent').each((index, ele) => {
            result.push($(ele).attr('href'));
        });
        return result;
    }).catch(error => {
        logger.error(error);
    });
};

/**
 * 收集详情页信息
 * @param detailURL
 * @returns {Promise.<Object>}
 */
const saveDetailInfo = detailURL => {

    return co(function*() {
        let html = yield Utils.load(detailURL).catch(error => {
            logger.error(error);
            throw error;
        });

        let $ = cheerio.load(html);
        let $titleWrapper = $('.title-wrapper');//标题部分
        let $price = $('.price');//价格部分
        let $aroundInfo = $('.aroundInfo');//地址信息部分
        let $intrducetion = $('#introduction');//基本信息部分
        let $baseInfo = $intrducetion.find('.base .content li');//基础信息
        let $transaction = $intrducetion.find('.transaction .content li');//交易信息
        let $tags = $intrducetion.find('.tags');//房源标签
        let $baseattribute = $intrducetion.find('.baseattribute');//
        let communityURL = $aroundInfo.find('.communityName .info').attr('href');
        $baseInfo.each((index, ele) => {
            $(ele).find('.label').remove();
        });
        $transaction.each((index, ele) => {
            $(ele).find('.label').remove();
        });
        let detailInfo = {
            id: detailURL,
            title: $titleWrapper.find('.main').text().trim(),
            sub_title: $titleWrapper.find('.sub').text().trim(),

            house_type: $baseInfo.eq(0).text().trim(),
            floor: $baseInfo.eq(1).text().trim(),
            building_area: $baseInfo.eq(2).text().trim(),
            room_structure: $baseInfo.eq(3).text().trim(),
            room_area: $baseInfo.eq(4).text().trim(),
            building_type: $baseInfo.eq(5).text().trim(),
            room_direction: $baseInfo.eq(6).text().trim(),
            building_structure: $baseInfo.eq(7).text().trim(),
            decoration: $baseInfo.eq(8).text().trim(),
            elevator_rate: $baseInfo.eq(9).text().trim(),
            elevator: $baseInfo.eq(10).text().trim(),
            serviceable_life: $baseInfo.eq(11).text().trim(),

            publish_time: $transaction.eq(0).text().trim(),
            transact_type: $transaction.eq(1).text().trim(),
            last_transact_time: $transaction.eq(2).text().trim(),
            house_use_way: $transaction.eq(3).text().trim(),
            hold_duration: $transaction.eq(4).text().trim(),
            owner: $transaction.eq(5).text().trim(),
            mortgage: $transaction.eq(6).text().trim(),
            code: $transaction.eq(8).text().trim(),

            two_years: ($tags.find('.tage.is_near_subway').length || $tags.find('.tage.taxfree').length) ? 1 : 0,
            five_years: $tags.find('.tage.taxfree').length ? 1 : 0,
            near_subway: $tags.find('.tage.taxfree').length ? 1 : 0,
            see_free: $tags.find('.tage.is_see_free').length ? 1 : 0,

            selling_point: $baseattribute.eq(0).find('.content').text().trim(),
            transportation: $baseattribute.eq(1).find('.content').text().trim(),

            address_area: $aroundInfo.find('.areaName a').eq(0).text().trim(),
            address_street: $aroundInfo.find('.areaName a').eq(3).text().trim(),
            community: communityURL,
            url: detailURL
        };

        let dynamicData = {
            follow_count: $('#favCount').text().trim() * 1,
            cart_count: $('#cartCount').text().trim() * 1,
            price_total: $price.find('.total').text().trim(),
            price_unit: $price.find('.unitPriceValue').text().trim(),
            recently_visit: $('#record .panel .count').text().trim(),
            room_id: detailInfo.id
        };

        const rows = yield room.exists({code: detailInfo.code});
        if (rows) {
            yield room.update(detailInfo, {id: rows[0]});
        } else {
            yield saveCommunityInfo(communityURL);
            yield room.add(detailInfo);
        }

        yield dynamic_data.add(dynamicData);

    });
};

const saveCommunityInfo = url => {
    return co(function*() {
        const absoluteURL = URL.resolve(urls.BASIC, url);
        let html = yield Utils.load(absoluteURL).catch(error => {
            logger.error(error);
            throw error;
        });
        let $ = cheerio.load(html);
        let $detail = $('.xiaoquInfoContent');
        let detail = {
            id: url,
            name: $('.detailTitle').text().trim(),
            address: $('.detailDesc').text().trim(),
            decade: $detail.eq(0).text().trim(),
            type: $detail.eq(1).text().trim(),
            condo_fee: $detail.eq(2).text().trim(),
            condo_company: $detail.eq(3).text().trim(),
            develop_company: $detail.eq(4).text().trim(),
            building_count: $detail.eq(5).text().trim(),
            house_count: $detail.eq(6).text().trim(),
            url: absoluteURL
        };

        const exists = yield community.exists({id: url});

        if (exists) {
            yield community.update(detail, {id: url});
        } else {
            yield community.add(detail);
        }

        return true;
    });
};

export default {parseIndex};