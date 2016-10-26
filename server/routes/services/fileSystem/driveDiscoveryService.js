(function () {
	var drivelist = require('drivelist'),
	Promise = require('promise');

	function getDrives() {
		return new Promise(function (resolve, reject) {
			drivelist.list(function (error, disks) {
				if (error) {
					reject(error);
				} else {
					resolve(disks);
				}
			});
		});
	}
	
	module.exports = {
		getDrives : getDrives
	};
}
	());
