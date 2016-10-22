nodeCast = angular.module('nodeCast', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/files.html',
        controller: 'FilesCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });