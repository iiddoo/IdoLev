
var site = angular.module("site", [
    "ui.router",
    "oc.lazyLoad",
    "ngSanitize"
]);

/* Routing Pages */
site.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/site.html");

    $stateProvider
        .state('site', {
            url: "/site.html",
            templateUrl: "App/site/site.html",
            data: { pageTitle: 'site' },
            controller: "SiteController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'site',
                        files: [
                            'App/site/SiteController.js'
                        ]
                    }]);
                }]
            }
        });
}]);

site.run(function ($rootScope, $state) {

    $rootScope.$state = $state;

});