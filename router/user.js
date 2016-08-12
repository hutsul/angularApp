var express = require('express');
var router = express.Router();

module.exports = function(app){
    var handler = require('../handlers/user')(app);

    router.get('/getUsers', app.isAdmin, handler.getUsers);
    router.post('/register', app.isAdmin, handler.create);

    return router;
};
