nodeCast.factory('layoutFactory',
	['$window',
		function ($window) {
			var _layoutFactory = {};

			_layoutFactory.windowSize = function () {
				console.log($window.innerWidth);
				return $window.innerWidth;
			};

			_layoutFactory.prepareLayoutJson = function (data) {}

			return _layoutFactory;
		}
	]);
