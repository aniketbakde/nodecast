(function () {
	angular.module('nodeCast').factory('filesFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/files';
				var _filesFactory = {};

				_filesFactory.getFiles = function (data) {
					return $http.post(urlBase, data);
				};

				_filesFactory.getParentDir = function (dir) {
					var dirParts = dir.split('/');
					return dirParts.slice(0, dirParts.length - 1).join('/');
				};

				_filesFactory.getPathBreadCrumbs = function (path) {
					var pathArr = [];
					if (path) {
						var pathParts = path.split('/');
						for (var i = 0; i < pathParts.length; i++) {
							pathArr.push({
								name : pathParts[i] + '/',
								fullName : pathParts.slice(0, i + 1).join('/')
							});
						}
					}
					return pathArr;
				}

				return _filesFactory;
			}
		]);
}
	());
