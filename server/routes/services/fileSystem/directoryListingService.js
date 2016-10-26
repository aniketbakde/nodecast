(function () {
	var fs = require("fs"),
	driveDiscoveryService = require("../../services/fileSystem/driveDiscoveryService"),
	blackListedDirectories = require('../../services/fileSystem/blackListedDirectories');
	Promise = require('promise');

	function getDirectoryContent(sourceDir) {
		if (!sourceDir) {
			return new Promise(function (resolve, reject) {
				driveDiscoveryService.getDrives()
				.done(resolve, reject);
			});
		} else if (isBlackListed(sourceDir)) {
			return new Promise(function (resolve, reject) {
				resolve(null);
			});
		} else {
			return new Promise(function (resolve, reject) {
				fs.readdir(sourceDir, function (err, files) {
					if (err) {
						reject(err);
					}
					getStats(sourceDir, files).done(function (data) {
						resolve(data);
					});
				});
			});
		}
	}

	function isBlackListed(fName) {
		for (var i = 0; i < blackListedDirectories.names.length; i++) {
			if (fName.includes(blackListedDirectories.names[i])) {
				return true;
			}
		}
		return false;
	}

	function filterBlackListed(files) {
		return files.filter(function (file) {
			if (!isBlackListed(file)) {
				return file;
			}
		});
	}

	function getFileStatPromise(sourceDir, file) {
		return new Promise(function (resolve, reject) {
			fs.stat(sourceDir + "/" + file, function (err, stats) {
				if (err) {
					reject(err);
				}
				if (stats) {
					resolve({
						name : file,
						fullName : sourceDir + "/" + file,
						isDirectory : stats.isDirectory()
					});
				} else {
					resolve(null);
				}
			});
		});
	}

	function getStats(sourceDir, files) {
		return new Promise(function (resolve, reject) {
			var statPromises = [];
			if (files) {
				files = filterBlackListed(files);
				files.forEach(function (file) {
					statPromises.push(getFileStatPromise(sourceDir, file));
				});
				Promise.all(statPromises).done(resolve);
			} else {
				resolve(null);
			}
		});
	}

	module.exports = {
		getDirectoryContent : getDirectoryContent
	};
}
	());
