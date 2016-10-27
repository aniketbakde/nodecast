nodeCast.controller('FileListCtrl',
	['$rootScope', '$scope', 'filesFactory', 'layoutFactory',
		function ($rootScope, $scope, filesFactory, layoutFactory) {

			$scope.content = null;
			$scope.currentDir = null;

			function getFiles(dir) {
				$scope.currentDir = (dir ? dir.fullName : '');
				filesFactory.getFiles({
					currentDir : (dir ? dir.fullName : null)
				}).then(function (data) {
					$scope.content = data.data;
				});
			};

			$scope.getFiles = getFiles;

			$scope.getParentDir = function () {
				getFiles({
					fullName : filesFactory.getParentDir($scope.currentDir)
				});
			};

			getFiles();
		}
	]);
