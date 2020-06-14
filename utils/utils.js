const fs = require('fs');
const uuid = require('uuid');
const crypto = require('crypto');

module.exports = {
    encryptdecryptCBC: (str, type) => {
        const algorithm = "aes-256-cbc",
        key = Buffer.from('4zTvzr2p87VC82jmV88rIYu2048x8TlY');
        let encrypt = () => {
            let iv = crypto.randomBytes(16);
            let cipher = crypto.createCipheriv(algorithm, key, iv)
            let encrypted = cipher.update(str);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        };
        let decrypt = () => {
            let textParts = str.split(':');
            let iv = Buffer.from(textParts.shift(), 'hex');
            let encryptedText = Buffer.from(textParts.join(':'), 'hex');
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
        if (type === 'encrypt') {
            return encrypt();
        } else if (type === 'decrypt') {
            return decrypt();
        } else {
            return null;
        }
    },
    randomNumbers: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomUUIdv4: () => {
        return uuid.v4();
    },
    getRequestIP: (req) => {
        if (req.headers['x-forwarded-for']) {
            return req.headers['x-forwarded-for'];
        }
        return req.connection.remoteAddress;
    },
    getFilterValues: (filter) => {
        return null;
    },
    validateBody: (body, model) => {
        let errors = [{ message: "All values are invalid, please try again." }];
        let modelList = {};
        let isValid = false;
        let isRequiredErr = true;
        let isMinLengthErr = true;
        let isMaxLengthErr = true;
        if (body && Array.isArray(model)) {
            for (let index = 0; index < model.length; index++) {
                const element = model[index];
                const elementVal = body[element.name];
                if (elementVal && typeof element.required === "boolean" && element.required) {
                    isRequiredErr = false;
                } else if ((elementVal && typeof element.required === "boolean" &&
                !element.required) || typeof element.required === "undefined" ||
                element.required == null) {
                    isRequiredErr = false;
                }
                if (elementVal && element.minlength && elementVal.length >= element.minlength ||
                    typeof element.minlength === "undefined") {
                    isMinLengthErr = false;
                }
                if ((elementVal && element.maxlength && elementVal.length <= element.maxlength) ||
                typeof element.maxlength === "undefined") {
                    isMaxLengthErr = false;
                }
                if (isMaxLengthErr || isMinLengthErr || isRequiredErr) {
                    let error = {};
                    error["field"] = (element.label) ? element.label : element.name;
                    if (isRequiredErr && !isMinLengthErr && !isMaxLengthErr) {
                        error["message"] = `${error["field"]} is required.`;
                    } else if (!isRequiredErr && isMinLengthErr && !isMaxLengthErr) {
                        error["message"] = `${error["field"]} should be greater than ${element.minlength}.`;
                    } else if (isRequiredErr && !isMinLengthErr && isMaxLengthErr) {
                        error["message"] = `${error["field"]} should be less than ${element.maxlength}.`;
                    } else {
                        error["message"] = `${error["field"]} is required and should be less then ${element.minlength} and greater than ${element.maxlength}.`;
                    }
                    errors.push(error);
                }
                if (!isMaxLengthErr && !isMinLengthErr && !isRequiredErr) {
                    isValid = true;
                    modelList[element.name] = elementVal;
                }
            }
        }
        if (isValid && errors.length <= 1) {
            isValid = true;
            errors.splice(0, 1);
        } else {
            isValid = false;
        }
        if (errors && errors.length > 0) {
            return {
                errors: errors,
                isValid: isValid
            }
        } else {
            return {
                model: modelList,                
                isValid: isValid
            }
        }
    },
    readFile: async(path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (!err) {
                    resolve({ text: data });
                } else {
                    resolve({ error: err });
                }
            });
        });
    },
    replaceStr: (text, replaceArry) => {
        let newStr = text;
        for (let index = 0; index < replaceArry.length; index++) {
            const element = replaceArry[index];
            if (element.replace && element.replaceWith) {
                const _replace = new RegExp(element.replace, "gim");
                const _replaceWith = element.replaceWith;
                newStr = newStr.replace(_replace, _replaceWith);
            }
        }
        return newStr;
    }
}