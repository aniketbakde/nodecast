(function () {
	angular.module('nodeCast').controller('PlayerControlsCtrl',
		['$rootScope', '$scope', '$timeout', '$interval', 'playerControlsFactory', 'playerStatusFactory',
			function ($rootScope, $scope, $timeout, $interval, playerControlsFactory, playerStatusFactory) {

				var playerSeekTime = { //seconds
					STEPBACK : -60,
					FASTBACK : -10,
					BACK : -1,
					FORWARD : 1,
					FASTFORWARD : 10,
					STEPFORWARD : 60
				}

				$scope.isPlaying = 1;

				var playPauseButton = $("#play-pause");

				function pause() {
					$scope.isPlaying = 0;
					playPauseButton.removeClass('glyphicon-play').addClass('glyphicon-pause');
					$rootScope.$broadcast('rootScope:stopStatusTimer');
					playerControlsFactory.pause();
				}

				function play() {
					$scope.isPlaying = 1;
					playPauseButton.removeClass('glyphicon-pause').addClass('glyphicon-play');
					$rootScope.$broadcast('rootScope:startStatusTimer');
					playerControlsFactory.play();
				}

				function seek(timeDiff) {
					var localStatus = playerStatusFactory.getLocalStatus();

					var time = localStatus.currentTime + timeDiff;
					if (time < 0) {
						time = 0;
					} else if (time >= localStatus.mediaDuration) {
						time = localStatus.mediaDuration + playerSeekTime.FASTBACK;
					}
					$rootScope.$broadcast('rootScope:stopStatusTimer');
					playerControlsFactory.seek({
						time : time
					}).then(function () {
						//ToDo: update status bar if not playing
						if ($scope.isPlaying === 1) {
							$rootScope.$broadcast('rootScope:startStatusTimer');
						}
					});
				}

				$scope.stepback = function () {
					seek(playerSeekTime.STEPBACK);
				}
				$scope.fastback = function () {
					seek(playerSeekTime.FASTBACK);
				}
				$scope.back = function () {
					seek(playerSeekTime.BACK);
				}

				$scope.playPause = function () {
					if ($scope.isPlaying === 1) {
						pause();
					} else {
						play();
					}
				};
				$scope.stop = function () {
					playerControlsFactory.stop();
					$rootScope.$broadcast('rootScope:stopStatusTimer');
					$scope.isPlaying = 1;
					$timeout(playerControlsFactory.hideControls, 3000);
				};

				$scope.forward = function () {
					seek(playerSeekTime.FORWARD);
				}
				$scope.fastforward = function () {
					seek(playerSeekTime.FASTFORWARD);
				}
				$scope.stepforward = function () {
					seek(playerSeekTime.STEPFORWARD);
				}
			}
		]);
}
	());
