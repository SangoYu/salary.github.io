let request = require('./request');

module.exports = async function getProvinceBaseAndRate (province) {
    let maxBase = await getMaxBase(province);
    let minBase = await getMinBase(province);

    let personalRate = {
        "birth": 0,
        "injury": maxBase.grgsbx_rate / 100, 
        "medical": 0.095,
        "pension": maxBase.grylbx_rate / 100, 
        "extrahouse": 0,
        "unemployment": maxBase.grsybx_rate / 100,
        "house": 0.07
    };

    let companyRate = {
        "birth": 1/100,
        "injury": maxBase.dwgsbx_rate / 100, 
        "medical": 0.095,
        "pension": maxBase.dwylbx_rate / 100,
        "extrahouse": 0,
        "unemployment": maxBase.dwsybx_rate / 100,
        "house": 0.07,
    };

    let insuranceBase = {
        "max": maxBase.baseSalary,
        "min": minBase.baseSalary,
        "actual": 0
    };

    let houseBase = {
        "max": maxBase.baseSalary,
        "min": minBase.baseSalary,
        "actual": 0
    };

    let regionBaseData = {
        ...province,
        personalRate: JSON.stringify(personalRate), 
        companyRate: JSON.stringify(companyRate), 
        insuranceBase: JSON.stringify(insuranceBase), 
        houseBase: JSON.stringify(houseBase)
    };

    return regionBaseData;
}

async function getBase (province, max) {
    let { id } = province;

    let url = `http://si.zwfw.mohrss.gov.cn/insuredPayCompute.jspx`;
    let formData = {};

    formData['cbtype'] = 1;
    formData['aab301'] = id;
    formData['salary'] = max;
    formData['aac028'] = 0;
    formData['nian_jin'] = 0;
    formData['aaz113'] = 1.6;
    formData['notkeyflag'] = 1;

    let res = await request(url, {
        json: false,
        method: 'POST',
        formData
    });

    return res.fieldData;
}

async function getMaxBase(province) {
    const Max = 100000;
    return getBase(province, Max);
}

async function getMinBase(province) {
    const Min = 1000;
    return getBase(province, Min);
}