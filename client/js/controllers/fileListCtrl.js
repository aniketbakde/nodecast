(function () {
	angular.module('nodeCast').controller('FileListCtrl',
		['$rootScope', '$scope', 'filesFactory', 'videoCastFactory', 'layoutFactory',
			function ($rootScope, $scope, filesFactory, videoCastFactory, layoutFactory) {

				$scope.content = null;
				$scope.currentDir = {};

				function getFiles(dir) {
					$scope.currentDir.text = (dir ? dir.fullName : '');
					filesFactory.getFiles({
						currentDir : (dir ? dir.fullName : null)
					}).then(function (data) {
						$scope.content = data.data;
					});
				};

				function getParentDir() {
					getFiles({
						fullName : filesFactory.getParentDir($scope.currentDir.text)
					});
				};

				function goToDir() {
					getFiles({
						fullName : $scope.currentDir.text
					});
				}

				function castVideo(file) {
					console.log(file);
					videoCastFactory.cast(file.fullName);
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
