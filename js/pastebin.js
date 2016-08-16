angular.module('pastebin',
               ['ngRoute', 'ngResource',
                'pastebin.controllers'])

    .config(function($routeProvider) {
        $routeProvider
            .when('/paste', {
                controller: 'PasteCtrl',
                templateUrl: 'tpl/paste.html'
            })
            .when('/paste/:pasteId', {
                controller: 'PasteViewCtrl',
                templateUrl: 'tpl/view.html'
            })
            .otherwise({
                redirectTo: '/paste'
            });
    });

    
