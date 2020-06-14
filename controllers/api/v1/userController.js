const utils = require('../../../utils/utils');
const userModal = require('../../../models/user');
const message = require('../../../commons/responseMessage');
const userService = require('../../../services/userService');
const exceptionHandler = require('../../../handlers/exception-handler');

module.exports = {
    login: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.login);
            if (validateBody && validateBody.isValid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await userService.login(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }            
        }, req, res);
    },
    create: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.register);
            if (validateBody && validateBody.isValid) {
                const result = await userService.create(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model);
                if (result.code == 08) {
                    await userService.sendActivationCode(utils.randomUUIdv4(), utils.getRequestIP(req), { uid: result.uid });
                }
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: result });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    },
    resetPassword: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.resetPassword);
            if (validateBody && validateBody.isValid) {
                const result = await userService.resetPassword(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model);
                if (result.code == 05) {
                    await userService.sendActivationCode(utils.randomUUIdv4(), utils.getRequestIP(req), { uid: result.uid });
                }
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: result });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    },
    updatePassword: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.updatePassword);
            if (validateBody && validateBody.isValid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await userService.updatePassword(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    },
    sendActivationCode: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.sendActivationCode);
            if (validateBody && validateBody.isValid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await userService.sendActivationCode(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    },
    verifyActivationCode: async (req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, userModal.verifyActivationCode);
            if (validateBody && validateBody.isValid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await userService.verifyActivationCode(utils.randomUUIdv4(), utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }
        }, req, res);
    }
}