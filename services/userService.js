const jwt = require('../utils/jwt');
const utils = require('../utils/utils');
const comTypes = require('../utils/comtype');
const smsSender = require('../utils/send-sms');
const emailSender = require('../utils/send-email');
const message = require('../commons/responseMessage');
const reposUser = require('../repository/userRepository');
const repoProfile = require('../repository/profileRepository');

module.exports = {
    login: async (uid, uip, body) => {
        const user = await reposUser.login(body.userid, body.pwd);
        if (user) {
            if (user.isValid) {
                const token = await jwt.create({ role: user.role, uid: uid }, '2 days');
                await reposToken.insert({ token: token, type: comTypes.tokenType.accessToken, uid: uid, uip: uip });
                return Promise.resolve({ token: token, message: message.createSuccess("Token") });
            } else {
                return Promise.resolve({ code: 03, message: message.tryAgain("Invalid UserId or Password") });
            }
        } else {
            return Promise.resolve({ code: 02, message: message.tryAgain("UserId is not registered") });
        }
    },
    create: async (uid, uip, body) => {
        const _acc = await reposUser.isAccountExsits(body.mobilenumber, body.emailaddress);
        if (!_acc.isExists) {
            const user = await reposUser.create(body, uid);
            if (user && user.isSuccess && typeof user.isSuccess === "boolean") {
                return Promise.resolve({ code: 08, message: message.createSuccess("Account").concat(" Verification code send to your registered contacts Ids."), uid: utils.encryptdecryptCBC(uid, 'encrypt') });
            } else {
                return Promise.resolve({ code: 02, message: message.somethingWentWrong("Unable to create account") });
            }
        } else {
            let errorCode = 04;
            let msg = message.somethingWentWrong("Unable to create account");
            if (!_acc.verified) {
                if (!_acc.mobileVerified && _acc.emailVerified) {
                    errorCode = 4.1;
                    msg = "Contact Number & Email Address already registered, please your verify the contact #.";
                } else if (_acc.mobileVerified && !_acc.emailVerified) {
                    errorCode = 4.2;
                    msg = "Contact Number & Email Address already registered, please verify your the email id.";
                } else {
                    msg = "Contact Number & Email Address already registered, please verify your email & contact id.";
                }
                return Promise.resolve({ code: errorCode, message: msg, uid: utils.encryptdecryptCBC(_acc.uid, 'encrypt') });
            } else {                
                if (_acc.isEmail && !_acc.isContactNumber) {
                    msg = "Email Address already registered, please try login or reset the pasword.";
                } else if (!_acc.isEmail && _acc.isContactNumber) {
                    msg = "Contact Number already registered, please try login or reset the pasword.";
                } else if (_acc.isEmail && _acc.isContactNumber) {
                    msg = "Contact Number & Email Address already registered, please try login or reset the pasword.";
                }
                return Promise.resolve({ code: 05, message: msg });
            }
        }
    },
    resetPassword: async(uid, uip, body) => {
        let resetlink;
        const info = await reposUser.isAccountExsits(body.emailormobile, body.emailormobile);
        if (info.isExists && info.verified) {
            resetlink = utils.encryptdecryptCBC({ uid: info.uid, date: new Date().getUTCMilliseconds() }, 'encrypt');
            await emailSender.resetPasswordVerificationCode({ to: [info.emailid], resetlink: resetlink });
            return Promise.resolve({ message: "Reset link has been sent to your registered email address successfully." });
        } else if (!info.verified && typeof info.verified === "boolean") {
            return Promise.resolve({ code: 05, message: "Account is not activated yet, activation link has been sent to your registered email address successfully.", uid: utils.encryptdecryptCBC(info.uid, 'encrypt') });
        } else {
            return Promise.resolve({ message: message.tryAgain("Contact Number or Email Address is not registered") });
        }
    },
    updatePassword: async(uid, uip, body) => {
        const info = utils.encryptdecryptCBC(body.pwdtoken, 'decrypt');
        if (info) {
            await repoProfile.updatePassword(body.pwd, info.uid);
            return await Promise.resolve({ message: message.updateSuccess("Password has been") });
        } else {
            return await Promise.resolve({ message: message.somethingWentWrong("Unable to update password")});
        }
    },
    sendActivationCode: async(uid, uip, body) => {
        const deInfo = utils.encryptdecryptCBC(body.uid, 'decrypt');
        if (deInfo) {
            const info = await reposUser.isAccountExsits(null, null, deInfo);
            if (info.isExists && !info.verified && info.codeSendCounter <= 5) {
                let msg = "";
                let sendEmail = false;
                const emailotp = utils.randomNumbers(6, 999999);
                const mobileotp = utils.randomNumbers(6, 999999);
                if (body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase()
                    && !info.mobileVerified) {
                    await reposUser.updateActivationCode(info.uid, null, mobileotp, info.codeSendCounter++);
                    let usrinfo = { to: info.contactnumber, countrycode: info.countrycode, otp: mobileotp };
                    await smsSender.otp(usrinfo);
                    msg = "Account activation code has been sent to your registered mobile #.";
                } else if (body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase()
                    && !info.emailVerified) {
                    sendEmail = true;
                    await reposUser.updateActivationCode(info.uid, emailotp, null, info.codeSendCounter++);
                } else if (!info.emailVerified && !info.mobileVerified && body.sendto.toLocaleLowerCase() === 'both') {
                    sendEmail = true;
                    await reposUser.updateActivationCode(info.uid, emailotp, mobileotp, info.codeSendCounter++);
                    let usrinfo = { to: info.contactnumber, countrycode: info.countrycode, otp: mobileotp };
                    await smsSender.otp(usrinfo);
                    msg = "Account activation link/code has been sent your registered IDs successfully.";
                }

                if (body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase()
                && info.mobileVerified) {
                    msg = "Mobile Number has verified successfully.";                    
                }
                if (sendEmail) {
                    const activationlink = body.uid;
                    msg = "Account activation link/code has been sent to your registered email ID successfully.";
                    await emailSender.registerVerificationCode({ to: [info.emailid], code: emailotp, activationlink: activationlink });
                } else if (!sendEmail && body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase()) {
                    msg = "Email ID has verified successfully.";
                }
                return Promise.resolve({ message: msg });
            } else {
                if (info.codeSendCounter > 5) {
                    return Promise.resolve({ message: "You have exceed the number of attempted, please try after 24 hour or contact us." });
                } else {
                    return Promise.resolve({ message: message.tryAgain("Contact Number or Email Address is not registered") });
                }
            }
        } else {
            return Promise.resolve({ message: message.somethingWentWrong("Unable to re-send activation link") });
        }        
    },
    verifyActivationCode: async (uid, uip, body) => {
        let verifyStatus = {}, msg = "";
        const deInfo = utils.encryptdecryptCBC(body.uid, 'decrypt');
        if (deInfo) {
            verifyStatus = await reposUser.verifyActivationCode(deInfo, body.sendto, body.otp);
        }
        if (verifyStatus.isSuccess && body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase())
        {
            msg = "Mobile Number has verified successfully.";
        }
        else if (verifyStatus.isSuccess && body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase())
        {
            msg = "Email ID has verified successfully.";            
        }
        else {
            if (verifyStatus.isAccountAlreadyVerified &&
                body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.mobile.toLocaleLowerCase()) {
                msg = "Mobile Number has already verified successfully.";
            } else if (verifyStatus.isAccountAlreadyVerified &&
                body.sendto.toLocaleLowerCase() === comTypes.sendEmailTo.email.toLocaleLowerCase()) {
                msg = "Email ID has already verified successfully.";
            } else {
                msg = message.somethingWentWrong("Unable to verify your request");
            }
        }
        return Promise.resolve({ message: msg });
    }
}