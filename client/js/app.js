(function () {
	angular.module('nodeCast', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl : '/partials/fileList.html',
			controller : 'FileListCtrl'
		}).otherwise({
			redirectTo : '/'
		});
	});
}
	());
