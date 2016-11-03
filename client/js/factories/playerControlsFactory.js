(function () {
	angular.module('nodeCast').factory('playerControlsFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/castvideo/';
				var playerControlCommands = {
					PLAY : 'play',
					PAUSE : 'pause',
					STOP : 'stop',
					SEEK : 'seek'
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

				_playerControlsFactory.play = function () {
					return $http.post(urlBase + playerControlCommands.PLAY);
				};

				_playerControlsFactory.pause = function () {
					return $http.post(urlBase + playerControlCommands.PAUSE);
				};

				_playerControlsFactory.stop = function () {
					return $http.post(urlBase + playerControlCommands.STOP);
				};

				_playerControlsFactory.seek = function (data) {
					return $http.post(urlBase + playerControlCommands.SEEK, data);
				};

				return _playerControlsFactory;
			}
		]);
}
	());
