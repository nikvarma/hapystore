const utils = require('../../../utils/utils');
const comTypes = require('../../../utils/comtype');
const tokenService = require('../../../services/tokenService');
const exceptionHandler = require('../../../handlers/exception-handler');

module.exports = {
    create: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            let _tokenRes = await tokenService.create(comTypes.tokenType.accessToken, comTypes.roles.visitor, utils.randomUUIdv4(), utils.getRequestIP(req));
            await res.status(200).json({ status: 200, message: "Request validated successfully.", result: _tokenRes });
        }, req, res);
    },
    delete: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await res.status(200).json({ status: 200, message: "Token delete successfully." });
        }, req, res);
    },
    validate: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await res.status(200).json({ status: 200, message: "Validation complete successfully." });
        }, req, res);
    }
}