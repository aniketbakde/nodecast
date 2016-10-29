(function () {
	var fs = require('fs'),
	path = require('path'),
	mediaContentTypes = require('../../services/mediaInfo/mediaContentTypes'),
	Promise = require('promise');

	function isExtnAccept(file) {
		return (mediaContentTypes[path.extname(file)] !== undefined);
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
