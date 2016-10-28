(function () {
	var networkDiscoveryService = require('../../services/networkDiscovery/networkDiscoveryService'),
	castCommands = require('../../services/videoCast/castCommands');
	CastClient = require('../../services/videoCast/castClient');

	var castClient = new CastClient();

	var cast = function (req, res) {
		var cmd = req.params._cmd;

		if (cmd === castCommands.START) {
			startCast(req, res);
		} else {
			stopCast(req, res);
		}
	};

	var startCast = function (req, res) {
		networkDiscoveryService.getChromeCast().then(function (data) {
			castClient
			.connect(data.addresses)
			.then(castClient.launch)
			.then(function () {
				return castClient.load({
					// Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
					contentId : "http://192.168.1.13:3000/static/hp.mp4",
					contentType : 'video/mp4',
					streamType : 'BUFFERED', // or LIVE
					// Title and cover displayed while buffering
					metadata : {
						type : 0,
						metadataType : 0,
						title : "Harry Potter",
						images : [{
								url : "http://192.168.1.13:3000/static/hp.jpg"
							}
						]
					}
				});
			})
			.done(function () {
				res.json(data);
			});
		});
	};

	var stopCast = function (req, res) {
		// console.log(req.params._cmd);
		castClient
		.stop()
		.done(function () {
			res.json(true);
		});
	};

	module.exports = {
		cast : cast
	};
}
	());
