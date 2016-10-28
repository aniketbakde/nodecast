(function () {
	var fs = require('fs'),
	path = require('path'),
	Promise = require('promise');

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

	function exists(file) {
		return new Promise(function (resolve, reject) {
			fs.exists(file, function (exists) {
				(exists ? resolve(true) : resolve(false));
			});
		});
	}

	module.exports = {
		filterFiles : filterFiles,
		exists : exists
	};
}
	());
