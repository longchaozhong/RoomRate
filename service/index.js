/**
 * Created by lcz on 2017/11/5.
 */
import fs from 'fs';
import path from 'path';
import Koa  from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';
import webpack from 'webpack';
import {devMiddleware, hotMiddleware} from  'koa-webpack-middleware';

import webpackConfig from '../webpack.config.dev';
const devConfig = require('../config/devConfig.json');

const app = new Koa();
const router = new Router();
const compile = webpack(webpackConfig);

/**
 * 配置webpack-dev中间件，可以避免文件操作，构建后的文件常驻内存
 */
const webpackDevMiddleware = devMiddleware(compile, {
    noInfo: false,
    quiet: false,
    hot: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: webpackConfig.output.publicPath,
    headers: {"X-Custom-Header": "yes"},
    stats: {
        colors: true
    }
});
app.use(webpackDevMiddleware);
/**
 * 配置热更新中间件，path指定心跳请求地址
 */
app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

/**
 * 静态文件目录配置
 */
app.use(serve(path.resolve(__dirname, '../web/')));

router.get('*', (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../web/src/index.dev.html'));
});
app.use(router.routes());

app.listen(devConfig.port);