
"use strict";
module.exports = function (app) {
  var eventModel = require('mongoose').model('event');

    function create (req, res, next) {
        var body = req.body || {};
        var eventItem = body;
        var err;
        var i = body.followers.length - 1;
        var allFollowers = body.followers;
        eventItem.followers = [];

        if(!eventItem.title || !eventItem.description || !eventItem.startDate){
            err = new Error('Fields can be empty');
            err.status = 400;
            return next(err);
        }

        for (i; i >= 0; i--) {
            var user = {};
            user = {
              userId: allFollowers[i]
            };
            eventItem.followers.push(user)
        }

         eventModel.create(eventItem, function(err, model){

                if (err) {
                    return next(err)
                }
                res.status(201).send(model);
            }
        );
    };

    function getAll (req, res, next) {
        eventModel.find(function(err, models){
            if (err) {
                return next(err)
            }
            res.status(201).send(models);
        });
    };

    function getEvent(req, res, next){
        var id = req.params.id;

        eventModel.findOne({_id: id}, function(err, result){
            if (err) {
                return next(err);
            }
            res.status(200).send(result);
        });
    }

    function updateEventById (req, res, next) {
        var body = req.body;
        var id = body._id;
        var eventItem = body;
        var i = body.followers.length - 1;
        var allFollowers = body.followers;
        eventItem.followers = [];

        for (i; i >= 0; i--) {
            var user = {};
            user = {
                userId: allFollowers[i]
            };
            eventItem.followers.push(user)
        }


        eventModel.findOneAndUpdate({_id: id}, {$set: body}, function(err, result){
            if (err) {
                return next(err);
            }
            res.status(200).send(result);
        });
    };


    return {
        create: create,
        getAll: getAll,
        getEvent: getEvent,
        updateEventById: updateEventById
    }
};
