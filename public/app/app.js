(function () {
    "use strict";

    angular.module('eventApp', [
        'app.core',
        'app.home',
        'app.event',
        'app.modal'
    ])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('customTheme')
                .primaryPalette('indigo')
                .accentPalette('orange');
        });
})();
