const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    count: { required: true, type: Number },
    addedDate: { required: true, type: Date },
    isDeleted: { required: true, type: Boolean },
    isSavedForLater: { required: true, type: Boolean },
    uid: { required: true, type: String, minlength: 11 },
    cartId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    productId: { required: true, type: mongoose.Schema.Types.ObjectId }
});
mongoose.set('useFindAndModify', false);
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;