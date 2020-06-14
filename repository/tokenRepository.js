const tokenModel = require('../db/dbschemas/token');

module.exports = {
    insert: async (tokenDetail) => {
        return await tokenModel.create({
            uid: tokenDetail.uid,
            uip: tokenDetail.uip,
            type: tokenDetail.type,
            token: tokenDetail.token
        });
    }
}