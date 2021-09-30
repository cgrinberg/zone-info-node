const _ = require('lodash');
const {getHierarchyForIdAsArray} = require('./../hierarchy/hierarchy.controller');

module.exports = async function (req, res, next) {
    try {
        const reqId = _.get(req, 'params.id');
        const {id: accountId} = _.get(res, 'locals.account');
        const hierarchyList = await getHierarchyForIdAsArray(accountId);
        if (reqId && hierarchyList) {
            const isAccountIdOnHierarchy = hierarchyList.some(({memberId}) => memberId === Number(reqId));
            if (isAccountIdOnHierarchy) {
                return next();
            }
            console.log(`accountId: ${accountId} isn't included for hierarchy ${JSON.stringify(hierarchyList)}`);
        }
        throw {message: 'user has no permissions to make the request', status: 401};
    } catch (e) {
        const errMessage = _.get(e, 'message', 'error occurred');
        const errCode = _.get(e, 'status', 500);
        res.status(errCode).json({message: 'error occurred during hierarchy permission check', error: errMessage});
    }
}
