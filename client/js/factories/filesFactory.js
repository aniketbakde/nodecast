nodeCast.factory('filesFactory',
	['$http',
		function ($http) {
			var urlBase = '/api/files';
			var _filesFactory = {};

			_filesFactory.getFiles = function (data) {
				return $http.post(urlBase, data);
			};

			// _filesFactory.postWidth = function (width) {
			// return $http.post(urlBase, width);
			// };

			_filesFactory.getParentDir = function (dir) {
				var dirParts = dir.split("/");
				var pDirParts = dirParts.slice(0, dirParts.length - 1);
				if (pDirParts.length == 1) {
					return null; //Drives
				} else {
					return pDirParts.join("/");
				}
			}

			return _filesFactory;
		}
	]);
