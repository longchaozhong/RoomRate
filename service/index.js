/**
 * Created by lcz on 2017/11/5.
 */
import path from 'path';
import Koa  from 'koa';
import serve from 'koa-static';
import webpack from 'webpack';
import {devMiddleware, hotMiddleware} from  'koa-webpack-middleware';

import webpackConfig from '../webpack.config.dev';
const devConfig = require('../config/devConfig.json');

const app = new Koa();
const compile = webpack(webpackConfig);
/**
 * 配置webpack-dev中间件，可以避免文件操作，构建后的文件常驻内存
 */
app.use(devMiddleware(compile, {
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
}));
/**
 * 配置热更新中间件，path指定心跳请求地址
 */
app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use(async(ctx, next) => {
    console.info(ctx.path);
    await next();
});

app.use(serve(path.resolve(__dirname, '../web/')));

app.listen(devConfig.port);