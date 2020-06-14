const utils = require('../utils/utils');
const comTypes = require('../utils/comtype');
const smsSender = require('../utils/send-sms');
const emailSender = require('../utils/send-email');
const message = require('../commons/responseMessage');
const reposCart = require('../repository/cartRepository');

module.exports = {
    add: async(uid, uip, body) => {
        const cartStatus = await reposCart.add(uid, body);
        let msg = (cartStatus.isSuccess) ? message.validateSuccess("Cart") : message.somethingWentWrong("Unable to update cart");
        return Promise.resolve({ isSuccess: cartStatus.isSuccess, message: msg, cid: cartStatus.cid });
    },
    deleteSoft: async(params) => {
        const cartStatus = await reposCart.deleteSoft(params);
        let msg = (cartStatus.isSuccess) ? message.validateSuccess("Cart") :
        (!cartStatus.isSuccess && cartStatus.isValid) ? message.tryAgain("Cart item is not found") : message.somethingWentWrong("Unable to update cart");
        return Promise.resolve({ isSuccess: cartStatus.isSuccess, message: msg });
    },
    saveForLater: async(params) => {
        const cartStatus = await reposCart.saveForLater(params);
        let msg = (cartStatus.isSuccess) ? message.validateSuccess("Cart") :
        (!cartStatus.isSuccess && cartStatus.isValid) ? message.tryAgain("Cart item is not found") : message.somethingWentWrong("Unable to update cart");
        return Promise.resolve({ isSuccess: cartStatus.isSuccess, message: msg });
    },
    checkout: async(uid) => {
        let msg = message.somethingWentWrong("Unable to get cart items");
        let code = 11.9;
        const c = await reposCart.cart(uid);
        if (c.isSuccess && c.cart && c.cart.length > 0) {
            code = 11;
            msg = message.fetchSuccess("Cart item");
        } else if (c.isSuccess && c.cart && c.cart.length <= 0) {
            code = 11.2;
            msg = "Your cart is empty, looks like you haven't made your choice yet.";
        }
        return Promise.resolve({ isSuccess: c.isSuccess, cart: c, message: msg, code: code });
    },
    get: async(uid) => {
        let msg = message.somethingWentWrong("Unable to get cart items");
        let code = 11.9;
        const c = await reposCart.cart(uid);
        if (c.isSuccess && c.cart && c.cart.length > 0) {
            code = 11;
            msg = message.fetchSuccess("Cart item");
        } else if (c.isSuccess && c.cart && c.cart.length <= 0) {
            code = 11.2;
            msg = "Your cart is empty, looks like you haven't made your choice yet.";
        }
        return Promise.resolve({ isSuccess: c.isSuccess, cart: c, message: msg, code: code });
    }
}