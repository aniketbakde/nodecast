(function () {
	angular.module('nodeCast', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
	.config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
				$routeProvider
				.when('/', {
					templateUrl : '/partials/fileList.html'
				}).otherwise({
					redirectTo : '/'
				});

				localStorageServiceProvider
				.setPrefix('nodeCast')
				.setStorageType('localStorage');
			}
		]);
}
	());
