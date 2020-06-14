const utils = require('../../../utils/utils');
const cartModal = require('../../../models/cart');
const message = require('../../../commons/responseMessage');
const cartService = require('../../../services/cartService');
const exceptionHandler = require('../../../handlers/exception-handler');
const cart = require('../../../models/cart');

module.exports = {
    get: async(req, res) => {
        await exceptionHandler.exceptionController(async() => {
            if (req["uid"]) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await cartService.get(uid, utils.getRequestIP(req)) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }            
        }, req, res);
    },
    add: async(req, res) => {
        await exceptionHandler.exceptionController(async() => {
            const validateBody = utils.validateBody(req.body, cartModal.add);
            if (validateBody && validateBody.isValid) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await cartService.add(req.uid, utils.getRequestIP(req), validateBody.model) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }            
        }, req, res);
    },
    deleteSoft: async(req, res) => {
        const cid = req["params"]["cid"];
        if (cid) {
            await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await cartService.deleteSoft({ uid: req.uid, cid: cid }, utils.getRequestIP(req)) });
        } else {
            await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: message.somethingWentWrong("Unable to find product in your cart list.") });
        }
    },
    saveForLater: async(req, res) => {
        const cid = req["params"]["cid"];
        if (cid) {
            await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await cartService.saveForLater({ uid: req.uid, cid: cid }, utils.getRequestIP(req)) });
        } else {
            await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: message.somethingWentWrong("Unable to find product in your cart list.") });
        }
    },
    checkout: async(req, res) => {
        await exceptionHandler.exceptionController(async() => {
            if (req["uid"]) {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), result: await cartService.checkout(uid, utils.getRequestIP(req)) });
            } else {
                await res.status(200).json({ status: 200, message: message.validateSuccess("Request"), errors: validateBody.errors });
            }            
        }, req, res);
    }
}