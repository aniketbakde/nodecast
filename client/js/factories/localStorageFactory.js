(function () {
	angular.module('nodeCast').factory('localStorageFactory',
		['localStorageService',
			function (localStorageService) {
				var _localStorageFactory = {};

				var LAST_ACCESSED_DIR_KEY = 'lastAccessedDir';
				var LOCAL_STORAGE = 'localStorage';

				_localStorageFactory.setLastAccessedDir = function (lastAccessedDir) {
					localStorageService.set(LAST_ACCESSED_DIR_KEY, lastAccessedDir);
				};

				_localStorageFactory.getLastAccessedDir = function () {
					return localStorageService.get(LAST_ACCESSED_DIR_KEY);
				};

				return _localStorageFactory;
			}
		]);
}
	());
