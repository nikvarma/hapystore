const mongooes = require('mongoose');
const cartModel = require('../db/dbschemas/cart');
const respoProduct = require('../repository/productsRepository');

module.exports = {
    add: async(uid, body) => {
        const p = await respoProduct.getById(body.pid);
        if (p.isValid) {
            const cart = await cartModel.create({
                uid: uid,
                isDeleted: false,
                addedDate: new Date(),
                isSavedForLater: false,
                count: body.count || 1,
                productId: p.product._id,
            });
            return Promise.resolve({ isSuccess: true, cid: cart.cartId.toString() });
        } else {
            return Promise.resolve({ isSuccess: false });
        }
    },
    deleteSoft: async(params) => {
        const objectID = mongooes.isValidObjectId(params.cid);
        if (objectID) {
            const p = await cartModel.findOneAndUpdate({ isDeleted: false, cartId: mongooes.Types.ObjectId(params.cid) }, { isDeleted: true }).lean();
            if (p) {
                return Promise.resolve({ isSuccess: true, isValid: true });
            } else {
                return Promise.resolve({ isSuccess: false, isValid: true });
            }
        }
        return Promise.resolve({ isSuccess: false, isValid: false });
    },
    saveForLater: async(params) => {
        const objectID = mongooes.isValidObjectId(params.cid);
        if (objectID) {
            const p = await cartModel.findOne({ isDeleted: false, cartId: mongooes.Types.ObjectId(params.cid) }).lean();
            if (p) {
                await cartModel.findByIdAndUpdate({ _id: p._id }, {isSavedForLater: !p.isSavedForLater }).lean();
                return Promise.resolve({ isSuccess: true, isValid: true });
            } else {
                return Promise.resolve({ isSuccess: false, isValid: true });
            }
        }
        return Promise.resolve({ isSuccess: false, isValid: false });
    },
    cart: async(uid) => {
        const c = await cartModel.find({ uid: uid, isDeleted: false, saveForLater: false }).select({  }).lean();
        if (c) {
            return Promise.resolve({ isSuccess: true, cart: c });
        } else {
            return Promise.resolve({ isSuccess: false });
        }
    }
}