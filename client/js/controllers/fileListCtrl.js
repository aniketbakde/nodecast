(function () {
	angular.module('nodeCast').controller('FileListCtrl',
		['$rootScope', '$scope', '$timeout', 'filesFactory', 'videoCastFactory',
			function ($rootScope, $scope, $timeout, filesFactory, videoCastFactory) {

				$scope.content = null;
				$scope.currentDir = {};
				$scope.pathBreadCrumbs = null;
				$scope.goToDirName = {};
				$scope.getFilesError = false;

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
						$scope.getFilesError = true;
						$scope.pathBreadCrumbs = $scope.pathBreadCrumbs.slice(0, $scope.pathBreadCrumbs.length - 1);
						$timeout(function () {
							$scope.getFilesError = false;
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
					videoCastFactory.castVideo(file);
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
