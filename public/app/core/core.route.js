(function () {
    "use strict";

    angular.module('app.core')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '../templates/home/home.html',
                    controller: 'EventAppController',
                    controllerAs: 'eventList'
                })
                .when('/events/:id', {
                    templateUrl: '../templates/events/event.html',
                    controller: 'EventController',
                    controllerAs: 'event'
                })
                .when('/404', {
                    templateUrl: '/404.html'
                })
                .otherwise({redirectTo: '/404'})
        });
})();
