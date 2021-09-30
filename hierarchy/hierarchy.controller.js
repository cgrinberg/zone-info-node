const {getHierarchyItemById} = require('../db/db.service')


///utils methods: 

const getObjectById = async reqId => {
    try {
        return await getHierarchyItemById(reqId);
    } catch (e) {
        console.error(e);
        return null;
    }
};

/**
 *
 * @param {*} reqId  the reuquested input id
 * @param {*} includeSelf (default false) - return the fisrt member as well
 * @param {*} parentsList  chanied parents list
 * returns array of all parents nodes of hirearchy
 */
const getHierarchyList = async (reqId, includeSelf = false, parentsList = []) => {
    const item = await getObjectById(reqId);
    if (!item) {
        return [];
    }
    parentsList.unshift(item);
    if (item && item.level === 1) {
        //remove last object from array (the requested input id from beginning) if includeSelf is false
        if (!includeSelf) {
            parentsList.pop();
        }
        return parentsList;
    }
    return getHierarchyList(item.parentMemberId, includeSelf, parentsList);
};

/**
 *
 * @param {*} itemsArr  array of objects
 * @param {*} attr  chained attribute
 *
 * returns array's string as attr1 -> attr2 -> attr3... >- attrN *
 */
const buildOutString = (itemsArr, attr = "name") => {
    if (Array.isArray(itemsArr)) {
        return itemsArr.reduce((acc, item, index, itemsArr) => {
            acc += item ? item[attr] : "";
            if (index < itemsArr.length - 1) {
                acc += " -> ";
            }
            return acc;
        }, "");
    }
    return "";
};

async function getHierarchyForId(id) {
    console.log(`getHierarchyForId request for id: ${id}`);
    const hierarchyArray = await getHierarchyList(id);
    const resultString = buildOutString(hierarchyArray);
    console.log(resultString);
    //return to client
    return resultString;
}

/**
 * easier to handle at client side
 * @param id
 * @returns {any[]}
 */
async function getHierarchyForIdAsArray(id) {
    console.log(`getHierarchyForIdAsArray request for id: ${id}`);
    try {
        const resArray = await getHierarchyList(id);
        if (resArray && Array.isArray(resArray)) {
            return resArray.map(({name, memberId}) => ({name, memberId}));
        }
    } catch (e) {
        console.log('error occurred during hierarchy as list fetch', e);
    }
    return [];
}


module.exports = {
    getHierarchyForId,
    getHierarchyForIdAsArray
}

