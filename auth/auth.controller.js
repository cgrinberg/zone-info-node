const service = require('./auth.service');

module.exports = {
  login
};

async function login({ username, password }) {
  // Validate Input existence
  if (!username || !password) {
    throw {message: 'Missing BasicAuth user and password', status: 400};
  }
  const { account, session } = await service.login(username, password);
  return {
    account,
    session
  }
}
