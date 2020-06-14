const utils = require('../utils/utils');
const comTypes = require('../utils/comtype');
const userModel = require('../db/dbschemas/user');

module.exports = {
    login: async (userid, pwd) => {
        const user = await userModel.findOne({ $or: [{ primary_contact: userid },
            { registeredemailid: userid }] }).select({ _id: true, role: true, pwd: true }).lean();
        if (user && user._id && pwd === user.pwd) {
            return Promise.resolve({ id: user._id, role: user.role, isValid: true });
        } if (user && user._id && pwd !== user.pwd) {
            return Promise.resolve({ id: null, role: null, isValid: false });
        } else {
            return Promise.resolve(null);
        }
    },
    create: async (usr, uid) => {
        if (!usr) {
            return Promise.resolve({ isSuccess: false });
        } else {
            const user = await userModel.create({
                uid: uid,
                pwd: usr.pwd,
                active: true,
                verified: false,
                fname: usr.fname,
                lname: usr.lname,
                fullname: usr.fullname,
                isEmailVerified: false,
                isMobileVerified: false,
                emailid: usr.emailaddress,
                role: comTypes.roles.user,
                primary_contact: usr.mobilenumber,
                countrycode: usr.countrycode || 91,
                registeredemailid: usr.emailaddress
            });
            return Promise.resolve({ isSuccess: true });
        }
    },
    isAccountExsits: async (contactnumber, emailid, uid) => {
        const user = await userModel.findOne({ $or: [{ primary_contact: contactnumber },
            { registeredemailid: emailid }, { uid: uid }], active: true }).select({ _id: true, role: true, registeredemailid: true, primary_contact: true, verified: true, uid: true, isMobileVerified: true, isEmailVerified: true, countrycode: true, codeSendCounter: true }).lean();
        if (user) {
            return Promise.resolve({ id: user._id, emailid: user.registeredemailid, role: user.role, contactnumber: user.primary_contact, uid: user.uid, countrycode: user.countrycode, codeSendCounter: user.codeSendCounter,
                verified: user.verified, isExists: true, isEmail: (user.registeredemailid === emailid), isContactNumber: (user.primary_contact === contactnumber), mobileVerified: user.isMobileVerified, emailVerified: user.isEmailVerified });
        } else {
            return Promise.resolve({ isExists: false });
        }
    },
    updateActivationCode: async (uid, emailotp, mobileotp, count) => {
        let updateOTP = { };
        if (emailotp && !mobileotp) {
            updateOTP["emailotp"] = emailotp;
        }
        if (mobileotp && !emailotp) {
            updateOTP["contactnumberotp"] = mobileotp;
        }
        if (mobileotp && emailotp) {
            updateOTP["emailotp"] = emailotp;
            updateOTP["contactnumberotp"] = mobileotp;
        }
        updateOTP["codeSendCounter"] = count;
        await userModel.updateOne({ uid: uid }, updateOTP);
        return Promise.resolve({ isSuccess: true });
    },
    verifyActivationCode: async (uid, sendTo, activationCode) => {
        let updateReady = false;
        let isAccountAlreadyVerified = false;
        let updateCondition = { uid: uid, active: true };
        let updateColumns = { };
        if (sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase()) {
            updateCondition["contactnumberotp"] = Number(activationCode);
            updateColumns["isMobileVerified"] = true;
        }
        if (sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase()) {
            updateCondition["emailotp"] = Number(activationCode);
            updateColumns["isEmailVerified"] = true;
        }
        const info = await userModel.findOne(updateCondition).select({ isMobileVerified: true, isEmailVerified: true, verified: true, emailotp: true, contactnumberotp: true }).lean();
        if (info) {
            if (info.isMobileVerified && !info.isEmailVerified && 
                sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase() &&
                Number(activationCode) === info.emailotp) {
                    updateColumns["verified"] = true;
                    updateColumns["codeSendCounter"] = 0;
            } else if (!info.isMobileVerified && info.isEmailVerified && 
                sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase() &&
                Number(activationCode) === info.contactnumberotp) {
                updateColumns["verified"] = true;
                updateColumns["codeSendCounter"] = 0;
            } else if (info.isMobileVerified && info.isEmailVerified) {
                updateColumns["verified"] = true;
                updateColumns["codeSendCounter"] = 0;
            }
            if (info.isMobileVerified && sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase()) {
                isAccountAlreadyVerified = true;
            }
            if (info.isEmailVerified && sendTo.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase()) {
                isAccountAlreadyVerified = true;
            }
            updateReady = true;
        } else {
            updateReady = false;
        }
        if (updateReady && !isAccountAlreadyVerified) {
            await userModel.updateOne(updateCondition, updateColumns);
            return Promise.resolve({ isSuccess: true, isAccountAlreadyVerified: isAccountAlreadyVerified });
        } else {
            return Promise.resolve({ isSuccess: false, isAccountAlreadyVerified: isAccountAlreadyVerified });
        }
    }
}