const jwt = require('../utils/jwt');
const message = require('../commons/responseMessage');
const reposToken = require('../repository/tokenRepository');

module.exports = {
    create: async (tokenType, role, uid, uip) => {
        const token = await jwt.create({ role: role, uid: uid }, '12h');
        await reposToken.insert({ token: token, type: tokenType, uid: uid, uip: uip });
        return { token: token, message: message.createSuccess("Token") };
    }
}