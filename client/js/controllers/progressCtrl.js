(function () {
	angular.module('nodeCast').controller('ProgressCtrl',
		['$rootScope', '$scope', '$timeout', '$interval', 'playerControlsFactory', 'playerStatusFactory',
			function ($rootScope, $scope, $timeout, $interval, playerControlsFactory, playerStatusFactory) {

				var STATUS_CHECK_INTERVAL = 1000;

				$scope.mediaDuration = 0;
				$scope.progress = 0;

				$scope.$on('rootScope:startStatusTimer', function (event) {
					startStatusTimer();
				});

				$scope.$on('rootScope:stopStatusTimer', function (event) {
					stopStatusTimer();
				});

				$scope.statusTimer = {
					timer : null,
					isBusy : false
				};

				function startStatusTimer() {
					stopStatusTimer();
					$scope.statusTimer.timer = $interval(function () {
							if (!$scope.statusTimer.isBusy) {
								$scope.statusTimer.isBusy = true;
								playerStatusFactory.getStatus()
								.then(function (playerStatus) {
									$scope.progress = playerStatus.progress;
									$scope.mediaDuration = playerStatus.mediaDuration;
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

				function seek(time) {
					playerControlsFactory.seek({
						time : time
					});
				}

				$("#progress-bar").on('click', function (e) {
					var progressBarWidth = $(this).outerWidth();
					var parentWidth = $(this).parent().outerWidth();
					var offsetX = (parentWidth - progressBarWidth) / 2;
					var xPos = e.pageX - offsetX;
					var seekTime = ($scope.mediaDuration * xPos) / progressBarWidth;
					seek(seekTime);
				});
			}
		]);
}
	());
