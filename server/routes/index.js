(function () {

	'use strict';
	var express = require('express'),
	fileSystemService = require('./services/fileSystem/fileSystemService'),
	videoCastService = require('./services/videoCast/videoCastService');
	var router = express.Router();

	/* GET home page. */
	router.get('/', function (req, res) {
		res.render('index');
	});

	// router.get('/api/files', fileSystemService.getFiles);
	router.post('/api/files', fileSystemService.getFiles);
	router.post('/api/castvideo/:_cmd', videoCastService.cast);

	module.exports = router;

}
	());
