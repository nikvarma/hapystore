const requestHandler = require('./request-handler');

module.exports = (roles) => {
    return async (req, res, next) => {
        await requestHandler(req, res, next);
        let isAuthorized = false;
        if (roles && Array.isArray(roles) && req.isvalidrequest) {
            if (roles.includes(req.role) < 0) {
                await res.status(401).json({ status: 401, message: "You are not authorized to access this request." })
                res.end();
            } else {
                isAuthorized = true;
            }
        }
        if (isAuthorized) {
            next();
        }
    }
}