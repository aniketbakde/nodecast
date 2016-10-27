(function () {
	var fs = require('fs'),
	driveDiscoveryService = require('../../services/fileSystem/driveDiscoveryService'),
	fileFilterFactory = require('../../services/fileSystem/fileFilterFactory'),
	osFileListingService = require('../../services/operatingSystem/fileListingService'),
	Promise = require('promise');

	function getDirectoryContent(sourceDir) {
		if (!sourceDir) {
			return new Promise(function (resolve, reject) {
				driveDiscoveryService.getDrives()
				.done(resolve, reject);
			});
		} else {
			return new Promise(function (resolve, reject) {
				osFileListingService.getFiles(sourceDir)
				.done(function (files) {
					getStats(sourceDir, files)
					.done(function (data) {
						resolve(fileFilterFactory.filterFiles(data));
					});
				});
			});
		}
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
