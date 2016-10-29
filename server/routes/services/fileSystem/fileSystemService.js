(function () {
	var fs = require('fs'),
	directoryListingService = require('../../services/fileSystem/directoryListingService');

	var getFiles = function (req, res) {
		directoryListingService.getDirectoryContent(req.body.currentDir)
		.then(function (data) {
			res.json(data);
		});
	};

	module.exports = {
		getFiles : getFiles
	};
}
	());
