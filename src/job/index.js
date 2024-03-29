let cronJob = require('cron').CronJob;
const { updateLocale } = require('moment');
let getProvinceList = require('./region');
let getProvinceBaseAndRate = require('./rate');
let { RegionInfo } = require('../models');

console.log("startCronJob", new Date());

new cronJob('0 0 0 * * *', syncRegionData , null, true, 'Asia/Shanghai');  

async function syncRegionData () {
    console.log('sync start', new Date());
    let list = await getProvinceList();
    for(let province of list) {
        let item = await getProvinceBaseAndRate(province);
        let regionInfo = await RegionInfo.findById(province.id,{
            raw: true
        });
        if (!regionInfo || regionInfo.needUpdate){
            RegionInfo.upsert(item);
        }
    }
    console.log('sync end', new Date());
}
