(function () {
	angular.module('nodeCast').factory('playerControlsFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/castvideo/';
				var playerControlCommands = {
					STEPBACK : 'stepback',
					FASTBACK : 'fastback',
					BACK : 'back',
					PLAY : 'play',
					PAUSE : 'pause',
					STOP : 'stop',
					FORWARD : 'forward',
					FASTFORWARD : 'fastforward',
					STEPFORWARD : 'stepforward',
					STATUS : 'status',
					SEEK: 'seek'
				}

				var _playerControlsFactory = {};
				var playerControls = $("#player-controls");

				_playerControlsFactory.showControls = function () {
					playerControls.animate({
						bottom : "0px"
					});
				}
				_playerControlsFactory.hideControls = function () {
					playerControls.animate({
						bottom : "-150px"
					});
				}

				_playerControlsFactory.stepback = function () {
					return $http.post(urlBase + playerControlCommands.STEPBACK);
				};

				_playerControlsFactory.fastback = function () {
					return $http.post(urlBase + playerControlCommands.FASTBACK);
				};

				_playerControlsFactory.back = function () {
					return $http.post(urlBase + playerControlCommands.BACK);
				};

				_playerControlsFactory.play = function () {
					return $http.post(urlBase + playerControlCommands.PLAY);
				};

				_playerControlsFactory.pause = function () {
					return $http.post(urlBase + playerControlCommands.PAUSE);
				};

				_playerControlsFactory.stop = function () {
					return $http.post(urlBase + playerControlCommands.STOP);
				};

				_playerControlsFactory.forward = function () {
					return $http.post(urlBase + playerControlCommands.FORWARD);
				};

				_playerControlsFactory.fastforward = function () {
					return $http.post(urlBase + playerControlCommands.FASTFORWARD);
				};

				_playerControlsFactory.stepforward = function () {
					return $http.post(urlBase + playerControlCommands.STEPFORWARD);
				};

				_playerControlsFactory.getPlayerStatus = function () {
					return $http.post(urlBase + playerControlCommands.STATUS);
				};
				
				_playerControlsFactory.seek = function (data) {
					return $http.post(urlBase + playerControlCommands.SEEK, data);
				};

				return _playerControlsFactory;
			}
		]);
}
	());
