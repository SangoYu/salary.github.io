let moment = require('moment');
let {sequelize, SalaryInfo, MessageInfo, VisitInfo, RegionInfo} = require('../models');

let Service = {};

Service.recordSalary = async function (salary) {
    return SalaryInfo.create(salary);
};

Service.recordMessage = async function (message) {
    return MessageInfo.create(message);
};

Service.showMessage = async function (message) {
    return MessageInfo.findAll({
        order: 'time DESC'
    });
};


Service.getRegionList = async function () {
    return RegionInfo.findAll();
}

Service.analytics = async function() {
    let sql = `select salary, count, concat(cast( format((count/(select count(*) from salary))*100, 2) as char),'%') as rate from
          (select salary, count(*) as count from (
          select
          case
                 when salary>=3000 and salary <=5000 then '3K-5K'
                 when salary>5000 and salary <= 8000 then '5K-8K'
                 when salary > 8000 and salary <= 12000  then '8K-12K'
                 when salary > 12000 and salary <= 15000 then '12K-15K'
                 when salary > 15000 and salary <=20000 then '15K-20K'
                 when salary > 20000 and salary <=30000 then '20K-30K'
                 when salary > 30000 and salary <=50000 then '30K-50K'
                 when salary > 50000 and salary <=100000 then '50K-100K'
                 else '其他'
          end
          as salary from salary)a
          group by salary)b;`;

    
    return sequelize.query(sql, {model: SalaryInfo});
}

Service.count = async function (ip, page) {
    let where = {
            ip,
            page
        };
    let record = await VisitInfo.find({
        where
    });

    if(record){
        return VisitInfo.update({
            visits : record.visits+1
        },{
            where
        });
    }else{
        return VisitInfo.create({
            ip,
            page
        });
    }
};

Service.others = async function (ip) {
    let sql = `SELECT salary,time,aftertax FROM salary where ip!='${ip}' and time>date_sub(curdate(),interval 2 day) group by ip order by id desc limit 50`;

    return sequelize.query(sql, {model: SalaryInfo});
};

Service.realtime = async function () {
    let sql = `select salary, Date_Format(time, '%T') as stime from salary where salary<50000 order by time desc limit 40`;

    return sequelize.query(sql, {model: SalaryInfo});
};

Service.visits = async function () {

    let date = moment().format('YYYY-MM-DD');

    let sql = `SELECT *,@rownum:=@rownum+1 as id FROM visit,(select @rownum:=0) temp where updatedAt like '${date}%' order by id desc`;

    return sequelize.query(sql, {model: VisitInfo});
}

module.exports = Service;