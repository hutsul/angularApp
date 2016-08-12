var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongo = require('mongo');
var mongoose = require('mongoose');
var routers = require('./router/index');
var sessionStore = require('connect-mongo')(session);
var User = require('./handlers/usersRole')(app);
var mongoDBUrl;

require('./config/development')();

mongoDBUrl = process.env.MONGODB_URI;

mongoose.connect(mongoDBUrl);

var DB = mongoose.connection;

var models = require('./models')();

function checkAuthenfication(req, res, next) {
    if (req.session.role) {
        next();
    } else {
        res.status(401).send("Not Authorize");
    }

};

function isAdmin(req, res, next) {
    var role = req.session.role;

    if (role.toLowerCase() == 'admin') {
        next()
    } else {
        res.status(401).send("admin");
    }
};

function isUser(req, res, next) {
    var role = req.session.role;

    if (role.toLowerCase() == 'user') {
        next()
    } else {
        res.status(401).send("user");
    }
};

app.checkAuth = checkAuthenfication;
app.isAdmin = isAdmin;
app.isUser = isUser;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.use(session({
    secret: 'asdasd',
    name: 'log.sid',
    saveUninitialized: true,
    store: new sessionStore({
        mongooseConnection: DB
    }),
    cookie: {
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000
    }
}));

app.post('/login', function (req, res, next) {
    var role = req.body.role;

    User.findByRole(role, function (user) {
        if (user) {
            req.session.role = user.role;

            res.status(200).send(user.role);
        } else {
            res.status(401).send('User don`t exist');
        }
    })
});

app.use(express.static('./public/'));
routers(app);

module.exports = app;

