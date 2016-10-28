(function () {
	var Client = require('castv2-client').Client,
	DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver,
	Promise = require('promise');

	var self = null;

	function CastClient() {
		this.client = new Client();
		this.player = null;
		this.playerStatus = null;

		this.client.on('error', function (err) {
			console.log('Error: %s', err.message);
			this.client.close();
		});
		self = this;
	}

	CastClient.prototype.connect = function (host) {
		// var self = this;
		return new Promise(function (resolve, reject) {
			self.client.connect(host, function () {
				console.log('connected ...');
				resolve();
			});
		});
	};

	CastClient.prototype.launch = function () {
		// var self = this;
		return new Promise(function (resolve, reject) {
			// console.log(self.client);
			self.client.launch(DefaultMediaReceiver, function (err, player) {
				self.player = player;
				self.player.on('status', function (status) {
					console.log('status broadcast playerState=%s', status.playerState);
					self.playerStatus = status;
				});
				resolve();
			});
		});
	};

	CastClient.prototype.load = function (mediaOptions) {
		console.log('app "%s" launched, loading media %s ...', this.player.session.displayName, mediaOptions.contentId);
		// var self = this;
		return new Promise(function (resolve, reject) {
			self.player.load(mediaOptions, {
				autoplay : true
			}, function (err, status) {
				console.log('media loaded playerState=%s', status.playerState);
				self.playerStatus = status;
				resolve();
			});
		});
	};

	CastClient.prototype.stop = function () {
		// var self = this;
		return new Promise(function (resolve, reject) {
			if (self.player) {
				self.client.stop(self.player, function (err, status) {
					// console.log('media stopped playerState=%s', status.playerState);
					self.playerStatus = null;
					self.player = null;
					resolve();
				});
			} else {
				resolve();
			}
		});
	};

	module.exports = CastClient;
}
	());
