(function () {
	var fs = require("fs");

	var sampleDir = "D:/Node/Projects/nodecast";
	var getFiles = function (req, res) {
		fs.readdir(sampleDir, function (err, files) {
			if (err) {
				return console.error(err);
			}
			var response = [];

			files.forEach(function (file) {
				response.push({
					file : file
				});

				fs.stat(sampleDir + "/" + file, function (err, stats) {
					if (err) {
						return console.error(err);
					}
					// if (stats.isFile()) {
					// console.log(file+":isFile");
					// }
					// if (stats.isDirectory()) {
					// console.log(file+":isDir");
					// }
				});
			});
			res.json(response);
		});
	};

	module.exports = {
		getFiles : getFiles
	};
}
	());