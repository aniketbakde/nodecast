(function () {
	angular.module('nodeCast').controller('FileListCtrl',
		['$rootScope', '$scope', '$timeout', 'filesFactory', 'videoCastFactory', 'playerControlsFactory',
			function ($rootScope, $scope, $timeout, filesFactory, videoCastFactory, playerControlsFactory) {

				$scope.content = null;
				$scope.currentDir = {};
				$scope.pathBreadCrumbs = null;
				$scope.goToDirName = {};

				$getFilesErrorModal = $('#getFilesErrorModal');

				function getFiles(dir) {
					if (dir) {
						$scope.currentDir = dir;
						$scope.pathBreadCrumbs = filesFactory.getPathBreadCrumbs($scope.currentDir.fullName);
					} else {
						$scope.currentDir = null;
						$scope.pathBreadCrumbs = [];
					}
					filesFactory.getFiles({
						currentDir : (dir ? dir.fullName : null)
					}).then(function (data) {
						$scope.content = data.data;
					}).catch (function () {
						$scope.pathBreadCrumbs = $scope.pathBreadCrumbs.slice(0, $scope.pathBreadCrumbs.length - 1);
						$getFilesErrorModal.modal('show');
						$timeout(function () {
							$getFilesErrorModal.modal('hide');
						}, 3000);
					});
				};

				function getParentDir() {
					getFiles({
						fullName : filesFactory.getParentDir($scope.currentDir.fullName)
					});
				};

				function goToDir() {
					getFiles({
						fullName : $scope.currentDir.fullName + '/' + $scope.goToDirName.text
					});
					$scope.goToDirName = {};
				}

				function castVideo(file) {
					playerControlsFactory.hideControls();
					videoCastFactory.castVideo(file)
					.then(function (playerStatusData) {
						if (playerStatusData && playerStatusData.data) {
							var playerStatus = playerStatusData.data;
							if (playerStatus && playerStatus.media && playerStatus.media.duration) {
								$rootScope.$broadcast('rootScope:mediaDuration', playerStatus.media.duration);
							}
						}
						playerControlsFactory.showControls()
					});
				}

				$scope.getFiles = getFiles;
				$scope.getParentDir = getParentDir;
				$scope.goToDir = goToDir;
				$scope.castVideo = castVideo;

				getFiles();
			}
		]);
}
	());
