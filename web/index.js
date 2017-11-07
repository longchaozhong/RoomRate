/**
 * Created by lcz on 2017/11/5.
 */
import Koa  from 'koa';

const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);