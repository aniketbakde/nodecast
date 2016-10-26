(function () {
	var fs = require('fs'),
	directoryListingService = require('../services/fileSystem/directoryListingService');

	var sampleDir = "C:/";

	var getFiles = function (req, res) {
		directoryListingService.getDirectoryContent(sampleDir)
		.then(function (data) {
			res.json(data);
		});
	};

	module.exports = {
		getFiles : getFiles
	};
}
	());
