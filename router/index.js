module.exports = function(app){
    var usersRout = require('./user.js')(app);
    var eventRout = require('./events.js')(app);
    app.use('/events', eventRout);
    app.use('/user', usersRout);

    app.use(errorHandler);

    function errorHandler(err, req, res, next){
        var status = err.status||500;
        var message = err.message||'Somsing wrong';

        res.status(status).json({error :message});
    }
};