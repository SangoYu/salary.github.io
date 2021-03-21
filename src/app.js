let Koa = require('koa');
let config = require('./config');
let Router = require('./router');
let server = require('koa-static');
let {join} = require('path');
let convert = require('koa-convert');
let koaBody = require('koa-body');
let cors = require('koa-cors');

const app = new Koa();


app.use(server(join(__dirname,'./static')));


app.use(convert(koaBody()));

app.use(convert(cors({
    origin: function (req) {
        let origin = req.origin;
        if (origin && config.allowOrigins.indexOf(origin) != -1) {
            return origin;
        }
        return config.allowOrigins[0];
    },
    credentials: true
})));

app.proxy = true;


Router(app);


app.listen(config.port, () => {
    console.log('listen on ' + config.port);
});