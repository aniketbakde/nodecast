(function () {
	var Client = require('castv2-client').Client,
	DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver,
	Promise = require('promise');

	var self = null;

	function CastClient() {
		this.client = new Client();
		this.player = null;
		this.mediaDuration = undefined;

		this.client.on('error', function (err) {
			console.log('Error: %s', err.message);
			this.client.close();
		});
		self = this;
	}

	CastClient.prototype.connect = function (host) {
		return new Promise(function (resolve, reject) {
			self.client.connect(host, function () {
				console.log('connected ...');
				resolve();
			});
		});
	};

	function getPlayerStatus() {
		return new Promise(function (resolve, reject) {
			if (self.player) {
				self.player.getStatus(function (err, status) {
					// console.log('GETSTATUS');
					resolve(status);
				});
			} else {
				resolve();
			}
		});
	}

	CastClient.prototype.launch = function () {
		return new Promise(function (resolve, reject) {
			self.client.launch(DefaultMediaReceiver, function (err, player) {
				self.player = player;
				self.player.on('status', function (status) {});
				resolve();
			});
		});
	};

	CastClient.prototype.load = function (mediaOptions) {
		console.log('app "%s" launched, loading media %s ...', this.player.session.displayName, mediaOptions.contentId);
		return new Promise(function (resolve, reject) {
			self.player.load(mediaOptions, {
				autoplay : true
			}, function (err, status) {
				// console.log('LOADING');
				// console.log(status);
				if (status && status.media) {
					var media = status.media;
					if (media.duration) {
						self.mediaDuration = media.duration;
					}
				}
				resolve(status);
			});
		});
	};

	//seek by timeDiff secs
	CastClient.prototype.diffSeek = function (timeDiff) {
		return new Promise(function (resolve, reject) {
			getPlayerStatus()
			.done(function (status) {
				if (status && status.currentTime) {
					var curTime = status.currentTime;
					var newTime = curTime + timeDiff;

					if (newTime < 0) {
						newTime = 0;
					} else if (newTime > self.mediaDuration) {
						newTime = self.mediaDuration - 5;
					}

					self.player.seek(newTime, function (err, status) {
						// console.log('SEEKING');
						resolve();
					});

				} else {
					resolve();
				}
			});
		});
	};

	CastClient.prototype.seek = function (time) {
		return new Promise(function (resolve, reject) {
			self.player.seek(time, function (err, status) {
				// console.log('SEEKING');
				resolve();
			});
		});
	};

	CastClient.prototype.play = function () {
		return new Promise(function (resolve, reject) {
			if (self.player) {
				self.player.play(function (err, status) {
					// console.log('PLAY');
					resolve();
				});
			} else {
				resolve();
			}
		});
	};

	CastClient.prototype.pause = function () {
		return new Promise(function (resolve, reject) {
			if (self.player) {
				self.player.pause(function (err, status) {
					// console.log('PAUSE');
					resolve();
				});
			} else {
				resolve();
			}
		});
	};

	CastClient.prototype.stop = function () {
		return new Promise(function (resolve, reject) {
			if (self.player) {
				self.client.stop(self.player, function (err, status) {
					self.player = null;
					self.mediaDuration = undefined;
					resolve();
				});
			} else {
				resolve();
			}
		});
	};

	CastClient.prototype.getPlayerStatus = getPlayerStatus;

	module.exports = CastClient;
}
	());
