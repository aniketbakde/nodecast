nodeCast.factory('filesFactory',
	['$http',
		function ($http) {
			var urlBase = '/api/files';
			var _filesFactory = {};

			_filesFactory.getFiles = function (data) {
				return $http.post(urlBase, data);
			};

			_filesFactory.getParentDir = function (dir) {
				var dirParts = dir.split("/");
				return dirParts.slice(0, dirParts.length - 1).join("/");
			}

			return _filesFactory;
		}
	]);
