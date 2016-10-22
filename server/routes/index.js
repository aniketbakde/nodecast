(function () {

	'use strict';
	var express = require('express'),
	fileSystem = require('./services/fileSystemService');
	var router = express.Router();


	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index');
	});

	//list files
	router.get('/api/files', fileSystem.getFiles);

	//Need to explore if we need these
	// router.post('/api/files', function (req, res) {});
	// router.put('/api/files', function (req, res) {});
	// router.delete ('/api/files/:_id', function (req, res) {});

	module.exports = router;

}
	());