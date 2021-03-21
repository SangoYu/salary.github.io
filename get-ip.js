let Koa = require('koa');
let convert = require('koa-convert');
let koaBody = require('koa-body');
let Router = require('koa-router');

var router = new Router();


let port = 10000;


const app = new Koa();


app.use(convert(koaBody()));

app.proxy = true;

router.get('/', (ctx) => {
    console.log(ctx.headers);

    let req = ctx.req;
    let realIp = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let forwardIp = req.headers['X-Forwarded-For'];
    let ip = req.ip;
    console.log(realIp, forwardIp, ip);
    ctx.body = {
        realIp, forwardIp, ip
    };
});

app.use(router.routes());


app.listen(port, () => {
    console.log('listen on ' + port);
});