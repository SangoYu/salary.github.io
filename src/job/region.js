let request = require('./request');

module.exports = async function getProvinceList() {
    let url = `http://si.zwfw.mohrss.gov.cn/loadAdministrativeCode.jspx`;
    let res = await request(url);
    return res.fieldData.codelist;
}