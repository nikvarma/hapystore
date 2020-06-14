const mongoose = require('mongoose');

let TokenSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    uip: { type: String, required: true },
    token: { type: String, required: true },
    type: { type: String, required: true },
    createon: { type: Date, required: true, default: new Date() }
});
mongoose.model('token', TokenSchema);
module.exports = mongoose.model('token');