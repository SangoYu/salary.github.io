let Sequelize = require('sequelize');
let config = require('../config');
let {join} = require('path');

let dbConfig = config.mysql;

let obj = {};

let sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host : dbConfig.host,
    dialect : 'mysql',
    pool : {
        max : dbConfig.poolSize,
        min : 0,
        idle : 10000
    },
    logging: false,
    define: {
        underscored: true
    },
    timezone : '+08:00'
});


let SalaryInfo = sequelize.import(join(__dirname, './salary.info'));
let VisitInfo = sequelize.import(join(__dirname, './visit.info'));
let MessageInfo = sequelize.import(join(__dirname, './message.info'));
let RegionInfo = sequelize.import(join(__dirname, './region.info'));

obj.sequelize = sequelize;
obj.SalaryInfo = SalaryInfo;
obj.MessageInfo = MessageInfo;
obj.VisitInfo = VisitInfo;
obj.RegionInfo = RegionInfo;

sequelize.sync();

module.exports = obj;