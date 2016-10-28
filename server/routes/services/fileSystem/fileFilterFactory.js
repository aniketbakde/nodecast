(function () {
	var path = require('path');

	var ACCEPT_EXTN = ['.mp4'];

	function isExtnAccept(file) {
		return (ACCEPT_EXTN.indexOf(path.extname(file)) >= 0);
	}

	function filterFiles(files) {
		return (files ? files.filter(function (file) {
				if (file.isDirectory || isExtnAccept(file.name)) {
					return file;
				}
			}) : null);
	}

	module.exports = {
		filterFiles : filterFiles
	};
}
	());
