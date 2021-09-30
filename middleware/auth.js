const _ = require('lodash');
const cryptoService = require('../services/crypto/service');
const moment = require('moment');
const SESSION_TOKEN_EXPIRATION_IN_MINUTES = 20;

module.exports = async function (req, res, next) {

  try {
    const session = _.get(req, 'headers.session');
    let decryptedSession = '';

    try {
      decryptedSession = cryptoService.decrypt(session);
    }
    catch (err) {
      throw {message: 'Session is not valid, please re-login', status: 401};
    }

    // Validate the account authentication
    if (!decryptedSession) {
      throw {message: 'No session provided, please re-login', status: 401};
    }
    const { account, timestamp } = JSON.parse(decryptedSession);

    // Validate provided session
    if (!timestamp || moment.duration(moment().diff(timestamp)).asMinutes() > SESSION_TOKEN_EXPIRATION_IN_MINUTES) {
      throw {message: 'Session expired, please re-login', status: 401};
    }
    res.locals = res.locals || {};
    res.locals.account = account;
    //
    next();
  }
  catch (err) {
    const errMessage = _.get(err, 'message', 'error occurred');
    const errCode = _.get(err, 'status', 500);

    res.status(errCode).json({message: 'error occurred during auth validation', error: errMessage});
  }

};
