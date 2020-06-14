const message = require('../../../commons/responseMessage');
const uploadService = require('../../../services/uploadService');
const exceptionHandler = require('../../../handlers/exception-handler');


module.exports = {
    userImage: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            if (req.uid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await uploadService.userImage(req.uid, utils.getRequestIP(req), body) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    },
    productImage: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {

        }, req, res);
    }
}