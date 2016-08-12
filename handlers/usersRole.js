

module.exports = function(app){

    app.users = [
        {role: "admin"},
        {role: "user"}
    ];

    function findByRole (role, callback) {
        var users = app.users;
        var currentUser;
        var i = users.length - 1;

        for (i; i >= 0; i--) {
            if (users[i].role == role) {
                currentUser = app.users[i];
                return callback(currentUser);
            }
        }
        callback(null);
    };

    return {
        findByRole: findByRole
    }

};
