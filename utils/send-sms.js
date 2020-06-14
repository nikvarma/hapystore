const smsSender = require('./sms-sender');

module.exports = {
    otp: async(detail) => {
        const template = `Your OTP is ${detail.otp}.\n Thank you! for using our service. \n\n Hapy Store. \n https://hapy.store.`;
        const sms = await smsSender('Transactional', `+${detail.countrycode}${detail.to}`, template, 'HAPYSTORE');
        return Promise.resolve(sms);
    }
}