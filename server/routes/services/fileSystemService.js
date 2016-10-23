(function () {
	var fs = require("fs");

	var sampleDir = "E:/Movies/Harry Potter/01 - Harry Potter and the Sorcerer's Stone (2001) 7.2";
	
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
