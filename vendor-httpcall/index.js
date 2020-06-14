const request = require('request');

module.exports = {
    toJson: async (err, res) => {
        let result = {}
        if (Object.getPrototypeOf("toJSON")) {
            let jsonRes = res.toJSON();
            result = {
                body: jsonRes.body,
                headers: jsonRes.headers,
                request: jsonRes.request,
                status: jsonRes.statusCode
            }
        } else {
            result = {
                error: res,
                status: (res.statusCode) ? res.statusCode : 500
            }
        }
        return result;
    },
    getRequest: async (endpoint, querystring, options) => {
        return new Promise((resolve, reject) => {
            let _querystring = null;
            let _endpoint = (_querystring) ? `${endpoint}${_querystring}` : `${endpoint}`;
            request.get(_endpoint, options, async (err, res) => {
                if (err) {
                    resolve({
                        error: res,
                        status: (res.statusCode) ? res.statusCode : 500
                    });
                } else {
                    let result = res.toJSON();
                    resolve({
                        headers: result.headers,
                        request: result.request,
                        status: result.statusCode,
                        body: JSON.parse(result.body)
                    });
                }
            });
        });
    }
}