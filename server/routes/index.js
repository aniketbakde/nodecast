(function () {

	'use strict';
	var express = require('express'),
	fileSystemService = require('./services/fileSystem/fileSystemService'),
	videoCastService = require('./services/videoCast/videoCastService'),
	mdnsService = require('./services/mdnsService');
	var router = express.Router();

	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index');
	});

	//list files
	router.get('/api/files', fileSystemService.getFiles);
	router.post('/api/files', fileSystemService.getFiles);
	router.get('/api/castvideo/:_cmd', videoCastService.cast);
	// router.get('/api/castvideo', videoCastService.cast);
	// router.post('/api/castvideo', videoCastService.cast);
	// router.get('/api/browseStop', mdnsService.browseStop);

	//Need to explore if we need these
	// router.post('/api/files', function (req, res) {});
	// router.put('/api/files', function (req, res) {});
	// router.delete ('/api/files/:_id', function (req, res) {});

	module.exports = router;

}
	());
