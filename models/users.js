// var app = require('../app');
// var userId = 0;
//
// var User = function (role) {
//     this._id = userId++;
//     this.role = role;
// };
//
// User.prototype.save = function () {
//     if (!app.users) {
//         app.users = [];
//     }
//     app.users.push(this);
// };
//
// User.find = function () {
//     return app.users;
// };
//
// User.findByName = function (login, callback) {
//     var users = app.users;
//     var currentUser;
//     var i = users.length - 1;
//
//     for (i; i >= 0; i--) {
//         if (users[i].login == login) {
//             currentUser = app.users[i];
//             return callback(currentUser);
//         }
//     }
//     callback(null);
// };
//
// app.users = [
//     {role: "admin"},
//     {role: "user"}
// ];
//
// User.findByRole = function (role, callback) {
//   var users = app.users;
//   var currentUser;
//     var i = users.length - 1;
//
//     for (i; i >= 0; i--) {
//         if (users[i].role == role) {
//             currentUser = app.users[i];
//             return callback(currentUser);
//         }
//     }
//     callback(null);
// };

//module.exports = User;

var Schema = require('mongoose').Schema;
var mongoose = require('mongoose');

module.exports = function(){
    "use strict";

    var userSchema = new Schema ({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        }

    }, {
        collection: 'User'
    });

    mongoose.model('user', userSchema);
};