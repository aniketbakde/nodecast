(function () {
	angular.module('nodeCast').factory('videoCastFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/castvideo/';
				var videoCastCommands = {
					START: 'start'
				}
				
				var _videoCastFactory = {};

				_videoCastFactory.castVideo = function (data) {
					return $http.post(urlBase+videoCastCommands.START, data);
				};

				return _videoCastFactory;
			}
		]);
}
	());
