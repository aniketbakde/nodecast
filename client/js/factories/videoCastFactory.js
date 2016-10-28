(function () {
	angular.module('nodeCast').factory('videoCastFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/castvideo';
				var _videoCastFactory = {};

				_videoCastFactory.cast = function (data) {
					return $http.post(urlBase, data);
				};

				return _videoCastFactory;
			}
		]);
}
	());
