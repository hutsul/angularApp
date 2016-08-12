(function () {
    "use strict";

    angular.module('app.event')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$http', '$routeParams', '$mdDialog'];

    function EventController($scope, $http, $routeParams, $mdDialog){
        var id = $routeParams.id;
        var url = 'events/'+id;

        $scope.chooseEvent = {};
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {
            $scope.currentEvent = data;
        });

        $scope.updateEvent = function(){
            $mdDialog.show({
                controller: 'DialogController',
                controllerAs: 'dialog',
                templateUrl: '../templates/modal/addEvent.html',
                parent: angular.element(document.body),
                locals: {
                    items: $scope.currentEvent
                },
                clickOutsideToClose: true
            });
        }
    }
})();
