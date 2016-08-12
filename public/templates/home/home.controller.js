(function () {
    "use strict";

    angular.module('app.home')
        .controller('EventAppController', EventAppController);

    EventAppController.$inject = ['$scope', '$http', '$mdDialog', '$filter', '$timeout'];

    function EventAppController($scope, $http, $mdDialog, $filter, $timeout) {
        this.registred = false;
        $scope.role = "user";
        $scope.admin = false;

        $http({
            method: 'GET',
            url: '/events/'
        }).success(function (data) {
            $scope.events = data;
        });

        $scope.registration = function (ev, index) {
            var $buttonTransition = $(ev.target).closest('.register');

            $buttonTransition.toggleClass('active');
            $timeout(function () {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: '../templates/modal/dialog_register_user.html',
                    parent: angular.element(document.body),
                    locals: {
                        items: {
                            scope: $scope.events,
                            index: index
                        }
                    }
                }, 700);
            });
        };

        $scope.addEvent = function () {
            $mdDialog.show({
                controller: 'DialogController',
                controllerAs: 'dialog',
                templateUrl: '../templates/modal/addEvent.html',
                parent: angular.element(document.body),
                locals: {
                    items: {}
                },
                clickOutsideToClose: true
            });

        };
        $scope.statusRibbon = function (index) {
            var events = $scope.events;
            if ($filter('lowercase')(events[index].status) == 'open') {
                return 'open'
            }
            if ($filter('lowercase')(events[index].status) == 'draft') {
                return 'draft'
            }
            if ($filter('lowercase')(events[index].status) == 'closed') {
                return 'closed'
            }
            if ($filter('lowercase')(events[index].status) == 'sold out') {
                return 'soldOut'
            }

        };

        $scope.loginDialog = function(){
            $mdDialog.show({
                controller: 'EventAppController',
                templateUrl: '../templates/modal/login_dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
        };

        $scope.isSwitched = function(){
            if($scope.role == 'user'){
                  $scope.role = 'admin';

                $scope.admin = true
            } else {
                 $scope.role = 'user';

                $scope.admin = false
            }
        };

        $scope.logIn = function () {
            var obj = {
                role:$scope.role
            }
            $http({
                method: 'POST',
                url: '/login',
                contentType: 'application/json',
                data: JSON.stringify(obj)

            }).success(function (data, status, headers, config) {

                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Authorized by '+ data)
                        .ok('Ok')

                );

                $scope.role = data
            }).error(function (data, status, header, config) {
                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title(data)
                        .ok('Ok')

                );
            });


        };
    };
})();
