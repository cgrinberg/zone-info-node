const dbService = require('../db/db.service');
const cryptoService = require('../services/crypto/service');

module.exports = {
    login
};

/**
 * 1. Validate credentials
 * 2. Authenticate the user and provide a new session
 * **/
async function login(username, password) {
    // Validate Credentials
    const encryptedPassword = cryptoService.encrypt(password);
    const account = await dbService.getAccount(username, encryptedPassword);
    if (!account) throw {message: 'Wrong Credentials', status: 401};
    //
    const clonedAccount = {...account};
    delete clonedAccount.password;
    const toEncrypt = JSON.stringify({account: clonedAccount, timestamp: new Date()});
    const session = cryptoService.encrypt(toEncrypt);
    //
    return {account: clonedAccount, session};
}
