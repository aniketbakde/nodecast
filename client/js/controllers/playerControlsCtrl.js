(function () {
	angular.module('nodeCast').controller('PlayerControlsCtrl',
		['$rootScope', '$scope', '$timeout', '$interval', 'playerControlsFactory',
			function ($rootScope, $scope, $timeout, $interval, playerControlsFactory) {

				var STATUS_CHECK_INTERVAL = 1000;

				$scope.playerState = {
					isPlaying : 1,
					mediaDuration : 0,
					currentTime : 0,
					progress : 0 //%
				}

				$scope.$on('rootScope:mediaDuration', function (event, data) {
					$scope.playerState = {
						isPlaying : 1,
						mediaDuration : data,
						currentTime : 0,
						progress : 0 //%
					};
					startStatusTimer();
				});

				$scope.statusTimer = {
					timer : null,
					isBusy : false
				};

				$scope.progressTimer = null;

				function setPlayerStateData(playerStatusData) {
					if (playerStatusData && playerStatusData.data) {
						var playerStatus = playerStatusData.data;
						if (playerStatus) {
							if (playerStatus.media && playerStatus.media.duration) {
								$scope.playerState.mediaDuration = playerStatus.media.duration;
							}
							if (playerStatus.currentTime) {
								$scope.playerState.currentTime = playerStatus.currentTime;
							}
							if ($scope.playerState.mediaDuration) {
								$scope.playerState.progress = parseInt(($scope.playerState.currentTime * 100) / $scope.playerState.mediaDuration);
							}
						}
					}
				}

				function startStatusTimer() {
					stopStatusTimer();
					$scope.statusTimer.timer = $interval(function () {
							if (!$scope.statusTimer.isBusy) {
								$scope.statusTimer.isBusy = true;
								playerControlsFactory.getPlayerStatus()
								.then(function (playerStatusData) {
									setPlayerStateData(playerStatusData);
									$scope.statusTimer.isBusy = false;
								});
							}
						}, STATUS_CHECK_INTERVAL);
				}

				function stopStatusTimer() {
					if ($scope.statusTimer.timer) {
						$interval.cancel($scope.statusTimer.timer);
						$scope.statusTimer.timer = null;
					}
				}

				$scope.stepback = playerControlsFactory.stepback;
				$scope.fastback = playerControlsFactory.fastback;
				$scope.back = playerControlsFactory.back;
				$scope.play = function () {
					$scope.playerState = {
						isPlaying : 1
					};
					playerControlsFactory.play();
				};
				$scope.pause = function () {
					$scope.playerState = {
						isPlaying : 0
					};
					playerControlsFactory.pause();
				};
				$scope.stop = function () {
					playerControlsFactory.stop();
					stopStatusTimer();
					$timeout(playerControlsFactory.hideControls, 3000);
				};
				$scope.forward = playerControlsFactory.forward;
				$scope.fastforward = playerControlsFactory.fastforward;
				$scope.stepforward = playerControlsFactory.stepforward;
			}
		]);
}
	());
