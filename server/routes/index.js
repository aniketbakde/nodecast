(function () {

	'use strict';
	var express = require('express');
	var router = express.Router();
	var fs = require("fs");

	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index');
	});

	var sampleDir = "D:/Node/Projects/nodecast";

	//list files
	router.get('/api/files', function (req, res) {
		console.log("Going to read directory " + sampleDir);
		fs.readdir(sampleDir, function (err, files) {
			if (err) {
				return console.error(err);
			}
			var resjson = "";

			files.forEach(function (file) {
				resjson += file + ", ";

				fs.stat(sampleDir + "/" + file, function (err, stats) {
					if (err) {
						return console.error(err);
					}
					if (stats.isFile()) {
						console.log(file+":isFile");
					}
					if (stats.isDirectory()) {
						console.log(file+":isDir");
					}	
				});
			});
			res.json(resjson);
		});
	});

	//Need to explore if we need these
	// router.post('/api/files', function (req, res) {});
	// router.put('/api/files', function (req, res) {});
	// router.delete ('/api/files/:_id', function (req, res) {});

	module.exports = router;

}
	());
