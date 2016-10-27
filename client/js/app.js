nodeCast = angular.module('nodeCast', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/fileList.html',
        controller: 'FileListCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });