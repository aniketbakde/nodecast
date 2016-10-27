(function () {
	var path = require('path');

	var ACCEPT_EXTN = ['.mp4'];

	function isExtnAccept(file) {
		console.log(file+":::"+(path.extname(file)));
		return (ACCEPT_EXTN.indexOf(path.extname(file)) >= 0);
	}

	function filterFiles(files) {
		return files.filter(function (file) {
			if (file.isDirectory || isExtnAccept(file.name)) {
				return file;
			}
		});
	}

	module.exports = {
		filterFiles : filterFiles
	};
}
	());
