const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
    if (req.header && req.headers['x-access-token']) {
        let accessToken = (req.query && req.query.access_token) || req.headers['x-access-token'];
        let tokenDetail = await jwt.verify(accessToken);
        if (tokenDetail.isExpired) {
            req.isvalidrequest = false;
            await res.status(401).json({ status: 401, message: "Token has been expired, please login again to access the resources." });
            res.end();
        }
        else if (!tokenDetail.isValid && !tokenDetail.isExpired) {
            req.isvalidrequest = false;
            await res.status(401).json({ status: 401, message: "Invalid token, please try again after sometime." });
            res.end();
        } else {
            req.isvalidrequest = true;
            req.role = (tokenDetail.token && tokenDetail.token.payload) && tokenDetail.token.payload.role;
            req.uid = (tokenDetail.token && tokenDetail.token.payload && tokenDetail.token.payload.uid) && tokenDetail.token.payload.uid;
        }
    }
}