(function () {
	var networkDiscoveryService = require('../../services/network/networkDiscoveryService'),
	CastCommand = require('../../services/videoCast/castCommand'),
	CastClient = require('../../services/videoCast/castClient'),
	mediaHostingService = require('../../services/mediaHosting/mediaHostingService'),
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
					contentType : 'video/mp4',
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

	function stopCast(req, res) {
		stopCastClient()
		.done(function () {
			res.json(true);
		});
	}

	function dummyHandler(req, res) {
		//for test purpose
		res.json(true);
	}

	function cast(req, res) {
		var cmd = new CastCommand(req.params._cmd);

		switch (cmd.value) {
		case cmd.commands.START:
			startCast(req, res);
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
