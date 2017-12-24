/**
 * Created by lcz on 2017/11/5.
 */
import Koa  from 'koa';
import serve from 'koa-static';
import webpack from 'webpack';
import {devMiddleware, hotMiddleware} from  'koa-webpack-middleware';

import webpackConfig from '../webpack.config.dev';

const app = new Koa();
const compile = webpack(webpackConfig);
app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,
    hot: true,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: false,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: webpackConfig.output.publicPath,

    // custom headers
    headers: {"X-Custom-Header": "yes"},

    // options for formating the statistics
    stats: {
        colors: true
    }
}));
app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use(async (ctx, next) => {
    console.info(ctx.path);
    await next();
});

app.use(serve('../web'));

app.listen(3000);