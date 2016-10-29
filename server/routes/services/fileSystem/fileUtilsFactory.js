(function () {
	var fs = require('fs'),
	path = require('path'),
	Promise = require('promise');

	var ACCEPT_EXTN = ['.mp4'];

	function isExtnAccept(file) {
		return (ACCEPT_EXTN.indexOf(path.extname(file)) >= 0);
	}

	function filterFiles(files) {
		if (files) {
			return files.filter(function (file) {
				if (file.isDirectory || isExtnAccept(file.name)) {
					return file;
				}
			});
		} else {
			return null;
		}
	}

	function exists(file) {
		return new Promise(function (resolve, reject) {
			fs.exists(file, function (exists) {
				if (exists) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	module.exports = {
		filterFiles : filterFiles,
		exists : exists
	};
}
	());
