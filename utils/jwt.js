'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');

const privateKey = fs.readFileSync(path.join(__dirname, 'jwtkeys', 'private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'jwtkeys', 'public.key'), 'utf8');

const i = 'GStore';
const s = 'contact@groceristore.com';
const a = 'https://groceristore.com';

var signOption = {
    issuer: i,
    subject: s,
    audience: a    
};
//expiresIn: '15m'
module.exports = {
    create: async (payload, expiresIn) => {
        return new Promise((resolve, reject) => {
            signOption.algorithm = 'RS256';
            signOption.expiresIn = expiresIn || '15m';
            let encryptPayload = utils.encryptdecryptCBC(JSON.stringify(payload), 'encrypt');
            let token = jwt.sign({ payload: encryptPayload }, privateKey, signOption);
            resolve(token);
        });
    },
    verify: async (token) => {
        return new Promise((resolve, reject) => {
            try {
                signOption.algorithm = ["RS256"];
                let _token = jwt.verify(token, publicKey, signOption);
                _token.payload = JSON.parse(utils.encryptdecryptCBC(_token.payload, 'decrypt'));
                resolve({
                    isValid: true,
                    isExpired: false,
                    token: _token
                });
            } catch (err) {
                let message = (err && err.message) ? err.message.replace(/jwt/g, "token") : err.message;
                let isExpired = (message) ? message.includes("expire") : false;
                let isValid = (message) ? !!(message.includes("invalid") && isExpired) : true;
                resolve({
                    message: message,
                    isValid: isValid,
                    isExpired: isExpired
                });
            }
        });
    }
}