(function () {
	var networkDiscoveryService = require('../../services/network/networkDiscoveryService'),
	CastCommand = require('../../services/videoCast/castCommand'),
	CastClient = require('../../services/videoCast/castClient'),
	mediaHostingService = require('../../services/mediaHosting/mediaHostingService'),
	mediaInfoUtilsFactory = require('../../services/mediaInfo/mediaInfoUtilsFactory'),
	Promise = require('promise');

	var castClient;

	function startCastClient(host, media) {
		return new Promise(function (resolve, reject) {
			stopCastClient()
			.then(function () {
				castClient = new CastClient();
				return castClient.connect(host.addresses);
			})
			.then(function () {
				return castClient.launch();
			})
			.then(function () {
				return castClient.load({
					// Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
					contentId : mediaHostingService.hostMediaContent(media.fullName),
					contentType : mediaInfoUtilsFactory.getContentType(media.name),
					streamType : 'BUFFERED', // or LIVE
					// Title and cover displayed while buffering
					metadata : {
						type : 0,
						metadataType : 0,
						title : media.name,
						// images : [{
						// url : "TODO: try to add media cover"
						// }]
					}
				});
			}).done(resolve);
		});
	}

	function seekCastClient(pTime) {
		return new Promise(function (resolve, reject) {
			if (castClient) {
				castClient.seek(pTime.time).done(resolve);
			} else {
				resolve();
			}
		});
	}

	function playCastClient() {
		return new Promise(function (resolve, reject) {
			if (castClient) {
				castClient.play().done(resolve);
			} else {
				resolve();
			}
		});
	}

	function pauseCastClient() {
		return new Promise(function (resolve, reject) {
			if (castClient) {
				castClient.pause().done(resolve);
			} else {
				resolve();
			}
		});
	}

	function stopCastClient() {
		return new Promise(function (resolve, reject) {
			mediaHostingService.stopMediaContentHosting();
			if (castClient) {
				castClient.stop().done(resolve);
			} else {
				resolve();
			}
		});
	}

	function getCastClientStatus() {
		return new Promise(function (resolve, reject) {
			if (castClient) {
				castClient.getPlayerStatus().done(resolve);
			} else {
				resolve();
			}
		});
	}

	//request handlers
	function startCast(req, res) {
		networkDiscoveryService.getChromeCast()
		.done(function (host) {
			startCastClient(host, req.body)
			.done(function (status) {
				res.json(status);
			});
		});
	}

	function seekCast(req, res) {
		seekCastClient(req.body)
		.done(function () {
			res.json(true);
		});
	}

	function playCast(req, res) {
		playCastClient()
		.done(function () {
			res.json(true);
		});
	}

	function pauseCast(req, res) {
		pauseCastClient()
		.done(function () {
			res.json(true);
		});
	}

	function stopCast(req, res) {
		stopCastClient()
		.done(function () {
			res.json(true);
		});
	}

	function getStatus(req, res) {
		getCastClientStatus()
		.done(function (status) {
			res.json(status);
		});
	}

	function dummyHandler(req, res) {
		//for test purpose
		mediaInfoUtilsFactory.getContentType('abc.avi');
		res.json(true);
	}

	function cast(req, res) {
		var cmd = new CastCommand(req.params._cmd);
		switch (cmd.value) {
		case cmd.commands.START:
			startCast(req, res);
			break;
		case cmd.commands.PLAY:
			playCast(req, res);
			break;
		case cmd.commands.PAUSE:
			pauseCast(req, res);
			break;
		case cmd.commands.STOP:
			stopCast(req, res);
			break;
		case cmd.commands.STATUS:
			getStatus(req, res);
			break;
		case cmd.commands.SEEK:
			seekCast(req, res);
			break;
		default:
			dummyHandler(req, res);
			break;
		}
	}

	module.exports = {
		cast : cast
	};
}
	());
