const express = require('express');
const {getHierarchyForIdAsArray} = require("./hierarchy.controller");
const router = express.Router();

router.route('/:id').get(getHierarchyById);

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getHierarchyById(req, res) {
    const {id} = req.params;

    if (!id) {
        res.send({err: 'missing id param', data: null})
    }

    res.send(await getHierarchyForIdAsArray(id));
}


module.exports = router;
