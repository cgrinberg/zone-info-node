// Nodejs encryption with CTR
const crypto = require('crypto');

const algo = 'aes-256-ctr';
const pwd = 'ytgfr65tghjkp76r';

module.exports = {
    encrypt,
    decrypt
};

function encrypt(toEncrypt) {
    let cipher = crypto.createCipher(algo, pwd);
    let crypted = cipher.update(toEncrypt, 'utf8','hex');
    crypted+= cipher.final('hex');
    return crypted;
}

function decrypt(toDecrypt) {
    let decipher = crypto.createDecipher(algo, pwd);
    let dec = decipher.update(toDecrypt, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
