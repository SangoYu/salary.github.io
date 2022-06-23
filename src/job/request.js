let request = require('request');

async function baseRequest(getUrl, {
    url: configUrl, method = 'GET', json = true, body = null, formData = null, headers = {}
} = {}) {
    let args = arguments;
    let url = getUrl || configUrl;
    return new Promise((resolve, reject) => request({
        url, method, json, body, formData, headers
    }, function (e, res, body) {
        if (!e) {
            if (typeof body == 'string') body = JSON.parse(body);
            let { success, fieldData } = body;
            if (success) {
                resolve(body);
            } else {
                console.log(errmsg, JSON.stringify(args));
                reject(errmsg);
            }
        } else {
            reject(e, JSON.stringify(args));
        }
    }));
}

module.exports = baseRequest;