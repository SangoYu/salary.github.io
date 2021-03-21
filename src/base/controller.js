let Service = require('./service');

let SalaryInfo = Service.SalaryInfo;

let Controller = {};

let getIp = function (ctx) {
    let v6Ip = ctx.request.ip;

    // console.log(v6Ip);

    // let v6IpArr = v6Ip.split(':');

    // return v6IpArr[v6IpArr.length-1];

    return v6Ip;
}

let ipAddress = function (ctx) {
    let ip = getIp(ctx);
    ctx.body = ip;
}

let calculate = async function (ctx, next) {
    let data = null;
    let body = ctx.request.body;

    body.ip = getIp(ctx);

    data = await Service.recordSalary(body);

    ctx.body = 'ok';
}

let analytics = async function (ctx ,next) {
    let data = null;
    data = await Service.analytics();
    ctx.body = data;
}

let message = async function (ctx, next) {
    let data = null;
    let body = ctx.request.body;

    body.ip = getIp(ctx);

    data = await Service.recordMessage(body);

    ctx.body = 'ok';
}

let showmessage = async function (ctx,next) {
    let data = null;

    data = await Service.showMessage();

    ctx.body = data;
}

let count = async function (ctx,next) {
    let data = null;

    let ip = getIp(ctx);
    let page = ctx.request.headers['referer'];

    data = await Service.count(ip, page);

    ctx.body = data;
}

let others = async function (ctx,next) {
    let data = null;

    let ip = getIp(ctx);
    data = await Service.others(ip);

    ctx.body = data;
}

let realtime = async function (ctx,next) {
    let data = null;

    data = await Service.realtime();

    ctx.body = data;
}

let visits = async function (ctx, next) {
    let data = null;
    data = await Service.visits();

    ctx.body = data;
}

let regionList = async function (ctx, next) {
    let data = null;
    data = await Service.getRegionList();

    ctx.body = data;
}

Controller.calculate = calculate;
Controller.analytics = analytics;
Controller.message = message;
Controller.showmessage = showmessage;
Controller.count = count;
Controller.others = others;
Controller.realtime = realtime;
Controller.visits = visits;
Controller.ipAddress = ipAddress;

Controller.regionList = regionList;

module.exports = Controller;