const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('./services/CORS.service');
const authorization = require('./middleware/auth');

/**
 * Routes
 * **/
const authRouter = require('./auth/auth.routes');
const membersRouter = require('./members/members.routes');
const hierarchyRouter = require('./hierarchy/hierarchy.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors);

app.use('/auth', authRouter);
app.use('/hierarchy', authorization, hierarchyRouter);
app.use('/members', authorization, membersRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Node app is running in: http://dev.zoominfo.com:${PORT} ..`);
});

module.exports = app;
