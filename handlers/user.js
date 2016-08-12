"use strict";
module.exports = function () {
    var userModel = require('mongoose').model('user');
    var eventModel = require('mongoose').model('event');

    function create(req, res, next) {
        var body = req.body || {};
        var firstName = body.firstName;
        var lastName = body.lastName;
        var email = body.email;
        var newUserId;
        var err;
        var eventId = body.eventId;

        if (!firstName || !lastName || !email) {
            err = new Error('Fields can be empty');
            err.status = 400;
            return next(err);
        }

        userModel.create(body, function (err, model) {

            if (err) {
                console.log('User register err: ' + err);
                return next(err)
            }
            console.log('User register success');


            newUserId = model._doc._id;

            eventModel.findOneAndUpdate(
                {_id: eventId},
                {$addToSet: {followers: {userId: newUserId}}},

                function (err, model) {
                    if (err) {
                        console.log('User register err: ' + err);
                        return next(err)
                    }
                    res.status(200).send(model)
                })
        });

    };

    function getUsers(req, res, next) {
        userModel.find(function (err, models) {
            if (err) {
                return next(err)
            }
            res.status(201).send(models);
        });
    }

    return {
        create: create,
        getUsers: getUsers
    }
};