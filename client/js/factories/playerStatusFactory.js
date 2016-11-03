(function () {
	angular.module('nodeCast').factory('playerStatusFactory',
		['$http',
			function ($http) {
				var urlBase = '/api/castvideo/';
				var playerStatusCommand = 'status';

				var _playerStatusFactory = {};
				var playerStatus = {
					mediaDuration : 0,
					currentTime : 0,
					progress : 0 //%
				};

				_playerStatusFactory.getLocalStatus = function () {
					return playerStatus;
				}

				_playerStatusFactory.getStatus = function () {
					return $http.post(urlBase + playerStatusCommand).then(function (pPlayerStatus) {
						if (pPlayerStatus && pPlayerStatus.data) {
							var playerStatusData = pPlayerStatus.data;
							if (playerStatusData) {
								if (playerStatusData.media && playerStatusData.media.duration) {
									playerStatus.mediaDuration = playerStatusData.media.duration;
								}
								if (playerStatusData.currentTime) {
									playerStatus.currentTime = playerStatusData.currentTime;
								}
								if (playerStatus.mediaDuration) {
									playerStatus.progress = parseInt((playerStatus.currentTime * 100) / playerStatus.mediaDuration);
								}
							}
						}

						return playerStatus;
					});
				};

				return _playerStatusFactory;
			}
		]);
}
	());
