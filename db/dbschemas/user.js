const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    pwd: { type: String, required: true },
    role: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    active: { type: Boolean, required: true },
    emailotp: { type: Number, require: true },
    status: { type: Boolean, required: false },
    address: { type: String, required: false },
    emailid: { type: String, required: false },
    fullname: { type: String, required: true },
    countrycode: { type: String, required: true },
    codeSendCounter: { type: Number, required: true },
    primary_contact: { type: String, required: true },
    contactnumberotp: { type: Number, require: true },
    registeredemailid: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: false },
    secondary_contact: { type: String, required: false },
    isMobileVerified: { type: Boolean, required: false },
    verified: { type: Boolean, required: true, default: false }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;