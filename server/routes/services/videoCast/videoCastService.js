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

	function seekDiffCastClient(timeDiff) {
		return new Promise(function (resolve, reject) {
			// mediaHostingService.stopMediaContentHosting();
			if (castClient) {
				castClient.diffSeek(timeDiff).done(resolve);
			} else {
				resolve();
			}
		});
	}

	function playCastClient() {
		return new Promise(function (resolve, reject) {
			// mediaHostingService.stopMediaContentHosting();
			if (castClient) {
				castClient.play().done(resolve);
			} else {
				resolve();
			}
		});
	}

	function pauseCastClient() {
		return new Promise(function (resolve, reject) {
			// mediaHostingService.stopMediaContentHosting();
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

	//request handlers

	function startCast(req, res) {
		networkDiscoveryService.getChromeCast()
		.done(function (host) {
			startCastClient(host, req.body)
			.done(function () {
				res.json(true);
			});
		});
	}

	function seekDiffCast(req, res, cmd) {
		// console.log(cmd);
		// console.log(cmd.seekDiffDuration[cmd.value]);
		seekDiffCastClient(cmd.seekDiffDuration[cmd.value])
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

	function dummyHandler(req, res) {
		//for test purpose
		mediaInfoUtilsFactory.getContentType('abc.avi');
		res.json(true);
	}

	/*
	NONE : 0,
	START : 1,
	STEPBACK : 2,
	FASTBACK : 3,
	BACK : 4,
	PLAY : 5,
	PAUSE : 6,
	STOP : 7,
	FORWARD : 8,
	FASTFORWARD : 9,
	STEPFORWARD : 10
	 */
	function cast(req, res) {
		var cmd = new CastCommand(req.params._cmd);

		switch (cmd.value) {
		case cmd.commands.START:
			startCast(req, res);
			break;
		case cmd.commands.STEPBACK:
		case cmd.commands.FASTBACK:
		case cmd.commands.BACK:
		case cmd.commands.FORWARD:
		case cmd.commands.FASTFORWARD:
		case cmd.commands.STEPFORWARD:
			seekDiffCast(req, res, cmd);
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
