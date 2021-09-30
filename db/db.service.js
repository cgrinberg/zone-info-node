const data = require('./db.json');
const _ = require('lodash');


const getHierarchyItemById = (id) => {
  return new Promise((resolve, reject) => {
    const item = data.hierarchy.find(h => h.memberId === parseInt(id));
    if(item) {
      resolve(item);
    } else {
      reject();
    }
  })
};

const getMembers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        total: data.members.length,
        members: data.members
      });
    }, 1000);
  })
};

const getMembersByIds = (ids) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const members = ids.map((id) => data.members.find((member) => member.id === parseInt(id)));
      resolve(members);
    }, 1000);
  })
};

const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = data.members.find(member => parseInt(id) === member.id);
      resolve(member);
    }, 1000);
  })
};

const getAccount = (email, encryptedPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = data.accounts.find(account => email === account.email && encryptedPassword === account.password);
      resolve(account);
    }, 1000);
  })
};

module.exports = {
  getHierarchyItemById,
  getMembersByIds,
  getMembers,
  getMemberById,
  getAccount
};
