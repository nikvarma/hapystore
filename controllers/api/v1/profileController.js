const utils = require('../../../utils/utils');
const profileModal = require('../../../models/profile');
const message = require('../../../commons/responseMessage');
const profileService = require('../../../services/profileService');
const exceptionHandler = require('../../../handlers/exception-handler');

module.exports = {
    profile: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            const validateBody = utils.validateBody(req.body, profileModal.profile);
            if (validateBody && validateBody.isValid && req.uid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await profileService.profile(req.uid, utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors || { message: message.tryAgain("error occurred") } });
            }
        });
    }
}