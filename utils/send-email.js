const path = require('path');
const utils = require('./utils');
const emailSender = require('./email-sender');

module.exports = {
    registerVerificationCode: async(details) => {
        const template = path.dirname(__dirname).concat('/email-templates');
        const templateText = await utils.readFile(template.concat('/email-verify.html'));
        if (!templateText) { templateText["text"] = ""; }
        if (templateText.text && details) {
            templateText.text = utils.replaceStr(templateText.text, [{ replaceWith: details.activationlink, replace: "{#accountactivationlink}" },
            { replaceWith: details.code, replace: "{#activationcode}" }]);
        }
        const emailInfo = await emailSender(details.to, 'Hapy Store - Account Activation', templateText.text, false);
        return Promise.resolve({  });
    },
    resetPasswordVerificationCode: async(details) => {
        const template = path.dirname(__dirname).concat('/email-templates');
        const templateText = await utils.readFile(template.concat('/reset-password.html'));
        if (!templateText) { templateText["text"] = ""; }
        if (templateText.text && details) {
            templateText.text = utils.replaceStr(templateText.text, [{ replaceWith: details.resetlink, replace: "{#passwordresetlink}" }]);
        }
        const emailInfo = emailSender(details.to, 'Hapy Store - Password Reset', templateText.text, false);
        return Promise.resolve({});
    },
    welcomeNotification: async(details) => {
        const template = path.dirname(__dirname).concat('/email-templates');
        const templateText = await utils.readFile(template.concat('/reset-password.html'));
        if (!templateText) { templateText["text"] = ""; }
        const emailInfo = emailSender(details.to, 'Hapy Store - Welcome!', templateText.text, false);
        return Promise.resolve({});
    },
    updateNotification: async(details) => {
        const template = path.dirname(__dirname).concat('/email-templates');
        const templateText = await utils.readFile(template.concat('/reset-password.html'));
        if (!templateText) { templateText["text"] = ""; }
        const emailInfo = emailSender(details.to, 'Hapy Store - Products Updates', templateText.text, false);
        return Promise.resolve({});
    }
}