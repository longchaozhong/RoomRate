/**
 * Created by lcz on 2017/10/30.
 */
import log4js from "log4js";
import ProgressBar from "progress";
import EventEmitter from "events";

import saveDetail from './saveDetail';


const logger = log4js.getLogger();

class MyEmitter extends EventEmitter {
}


class Pool {
    constructor(totalTask, finishedCallback) {
        logger.info(`共${totalTask}个房源,开始下载`);

        const _this = this;
        _this.bar = new ProgressBar(`[:bar]:current/:total :etas `, {
            complete: '=',
            incomplete: ' ',
            width: 40,
            total: totalTask
        });
        _this.emitter = new MyEmitter();
        _this.maxActiveTask = 50;
        _this.waitArr = [];
        _this.activeTaskCount = 0;
        _this.finishedCount = 0;

        _this.emitter.on('newTask', url => {
            if (_this.activeTaskCount >= _this.maxActiveTask) {
                _this.waitArr.push(url);
            } else {
                _this.activeTaskCount++;
                saveDetail.saveDetailInfo(url).then(communityURL => {
                    return saveDetail.saveCommunityInfo(communityURL);
                }).catch(error => {
                    logger.error(`${error.message}`);
                }).finally(() => {
                    _this.finishedCount++;
                    _this.activeTaskCount--;
                    _this.bar.tick();
                    if (_this.activeTaskCount < _this.maxActiveTask && _this.waitArr.length) {
                        _this.emitter.emit('newTask', _this.waitArr.pop());
                    }

                    if (_this.finishedCount >= totalTask) {
                        finishedCallback();
                    }
                });
            }
        });
    }

    addTask(url) {
        if (url && typeof url === 'object') {
            this.emitter.emit('newTask', url);
        }
    }
}

export default Pool;