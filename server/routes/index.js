(function () {

	'use strict';
	var express = require('express'),
	fileSystem = require('./services/fileSystemService'),
	mdnsService = require('./services/mdnsService');
	var router = express.Router();

	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index');
	});

	//list files
	// router.get('/api/files', fileSystem.getFiles);
	router.post('/api/files', fileSystem.getFiles);
	// router.get('/api/browseStart', mdnsService.browseStart);
	// router.get('/api/browseStop', mdnsService.browseStop);

	//Need to explore if we need these
	// router.post('/api/files', function (req, res) {});
	// router.put('/api/files', function (req, res) {});
	// router.delete ('/api/files/:_id', function (req, res) {});

	module.exports = router;

}
	());
