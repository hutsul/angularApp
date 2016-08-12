var Schema = require('mongoose').Schema;
var mongoose = require('mongoose');

module.exports = function(){
    "use strict";

    var eventSchema = new Schema ({
       title: {
           type: String,
           required: true
       },
        shortDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String
        },
        session: {
            type: String,
            default: 'Open'
        },
        regLimit: {
            type: Number,
            required: true
        },
        followers: [
            {
                userId: {
                    type: String,
                    _id: null
                }
            }
        ]
    }, {
            collection: 'Event'
        });

    mongoose.model('event', eventSchema);
};