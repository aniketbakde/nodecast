(function () {
	var fs = require('fs'),
	driveDiscoveryService = require('../../services/fileSystem/driveDiscoveryService'),
	fileUtilsFactory = require('../../services/fileSystem/fileUtilsFactory'),
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
				fileUtilsFactory.exists(sourceDir)
				.done(function (exists) {
					if (exists) {
						osFileListingService.getFiles(sourceDir)
						.done(function (files) {
							getStats(sourceDir, files)
							.done(function (data) {
								resolve({
									files : fileUtilsFactory.filterFiles(data)
								});
							});
						});
					} else {
						resolve(null);
					}
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
					// console.log("###############");
					// console.log(file);
					// console.log(stats);
					// console.log("###############");
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
