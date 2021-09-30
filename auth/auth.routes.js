const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const _ = require('lodash');
const authorization = require('../middleware/auth');


router.post('/login', login);
router.get('/accountDetails', authorization, accountDetails);

async function login(req, res, next) {
    try {
        const { account, session } = await controller.login(req.body);
        res.status(200).send({account, session});
    }
    catch(err) {
        const errMessage = _.get(err, 'message', 'error occurred');
        const errCode = _.get(err, 'status', 500);
        res.status(errCode).json({message: 'error occurred', error: errMessage});
    }
}

async function accountDetails(req, res, next) {
    const { account } = res.locals;
    res.status(200).send({account});
}

module.exports = router;
