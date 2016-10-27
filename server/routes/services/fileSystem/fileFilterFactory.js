(function () {
	var path = require('path');

	var ACCEPT_EXTN = ['', '.mp4'];

	function isExtnAccept(file) {
		return (ACCEPT_EXTN.indexOf(path.extname(file)) >= 0);
	}

	function filterFiles(files) {
		return files.filter(function (file) {
			if (isExtnAccept(file)) {
				return file;
			}
		});
	}

	module.exports = {
		filterFiles : filterFiles
	};
}
	());
