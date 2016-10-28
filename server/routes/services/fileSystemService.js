(function () {
	var fs = require('fs'),
	directoryListingService = require('../services/fileSystem/directoryListingService');

	// var sampleDir = 'E:/Downloads';
	var sampleDir = 'E:/Movies/Harry Potter';

	var getFiles = function (req, res) {
		directoryListingService.getDirectoryContent(req.body.currentDir)
		// directoryListingService.getDirectoryContent(sampleDir)
		.then(function (data) {
			res.json(data);
		});
	};

	module.exports = {
		getFiles : getFiles
	};
}
	());
