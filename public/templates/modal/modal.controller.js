(function () {
    "use strict";

    angular.module('app.modal')
        .controller('DialogController', DialogController);

    DialogController.$inject = ['$scope', '$mdDialog', '$http', 'items'];

    function DialogController($scope, $mdDialog, $http, items) {
        $scope.currentButton = $('.register.active');
        $scope.event = {};
        $scope.event.usersList=[];
        $scope.event.followers = false;
        $scope.event.updateBtn = false;

        $scope.event.statusList=[
            {status: 'Draft'},
            {status: 'Open'},
            {status: 'Sold Out'},
            {status: 'Closed'}
        ];

        if(items.title != undefined){
            $scope.event.updateBtn = true;
            $scope.event.addEvent = items||{};
            $scope.event.addEvent.startDate = new Date(items.startDate);
            $scope.event.addEvent.endDate = new Date(items.endDate);
            refreshFollowers();
        }

        if(items.index !== undefined) {
            $scope.newUser = {
                eventId : items.scope[items.index]._id
            }
        }

        function refreshFollowers(){
            var followersObj = $scope.event.addEvent.followers;
            $scope.event.addEvent.followers = [];
            var i = followersObj.length - 1;
            var user;

            for (i; i >= 0; i--) {
                user = followersObj[i].userId;
                $scope.event.addEvent.followers.push(user)
            }

        };

        $scope.putUpdate = function () {
            var updateData = $scope.event.addEvent;
            $http({
                method: 'PUT',
                url: '/events/',
                contentType: 'application/json',
                data: JSON.stringify(updateData)

            }).success(function (data, status, headers, config) {

                $mdDialog.hide();

                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title("Event Update")
                        .ok('Ok')
                );
            }).error(function (data, status, header, config) {
                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title("Error, try again")
                        .ok('Ok')
                );
            });
        };

        $scope.addNewEvent = function(){
            var formValues = $scope.event.addEvent;

            $http({
                method: 'POST',
                url: '/events/addEvent',
                contentType: 'application/json',
                data: JSON.stringify(formValues)

            }).success(function (data, status, headers, config) {

                $mdDialog.hide();

                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title("New event add")
                        .ok('Ok')
                );

            }).error(function (data, status, header, config) {
                $mdDialog.hide();
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title("Error, try again")
                        .ok('Ok')
                );
            });

        };
        $scope.isSelected = function (value) {
            var follower;
            var i = $scope.event.addEvent.followers.length-1;
            for (i; i >= 0; i--) {
                follower = $scope.event.addEvent.followers[i];
                if(value == follower){
                    console.log('true');
                    return true
                }
            }
            return false;
        };

        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        $scope.addFollowers = function () {
            $http({
                method: 'GET',
                url: '/user/getUsers'
            }).success(function (data) {
                $scope.event.usersList= data;
                $scope.event.followers = true;
            });
        };

        $scope.addUser = function () {
            var formValues = $scope.newUser;

            $http({
                method: 'POST',
                url: '/user/register',
                contentType: 'application/json',
                data: JSON.stringify(formValues)

            }).success(function (data, status, headers, config) {

                $mdDialog.hide();

                $scope.currentButton
                    .removeClass('active')
                    .delay(800)
                    .queue(function(){
                        $(this).find('.fa-star').hide();
                        $(this).find('.fa-check').fadeIn(500)
                    });

                $scope.currentButton.addClass('success');

            }).error(function (data, status, header, config) {
                console.log('client error');
                $mdDialog.hide();

                $scope.currentButton
                    .removeClass('active')
                    .delay(1000)
                    .queue(function(){
                        $(this).find('.fa-times').hide();
                        $(this).find('.fa-star').fadeIn(300);
                        $(this).removeClass('error');
                    });

                $scope.currentButton.addClass('error').find('.fa-star').hide();
                $scope.currentButton.addClass('error').find('.fa-times').fadeIn();
            });


        };

        $scope.close = function (){
            $mdDialog.hide();
            $scope.currentButton.removeClass('active');
        };

    };


})();

