(function () {
	var mdns = require('mdns-js');
	var Client = require('castv2-client').Client;
	var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;

	var TIMEOUT = 5000; //5 seconds
	
	var application = null;

	//if you have avahi or bonjour or other mdns service running on the same system
	//you REALLY would like to exlude 0.0.0.0 from the interfaces bound to
	//mdns.excludeInterface('0.0.0.0')

	//var browser = mdns.createBrowser(); //defaults to mdns.ServiceType.wildcard
	//var browser = mdns.createBrowser(mdns.tcp('googlecast'));
	//var browser = mdns.createBrowser(mdns.tcp("workstation"));

	var browseStart = function (req, res) {
		var browser = mdns.createBrowser(mdns.tcp('googlecast'));
		
		browser.on('ready', function onReady() {
			console.log('browser is ready');
			browser.discover();
		});

		browser.on('update', function onUpdate(data) {
			console.log('data:', data);
			ondeviceup(data.addresses[0]);
		});

		setTimeout(function onTimeout() {
			browser.stop();
		}, TIMEOUT);
		
		res.json({data: "Starting Cast"});
	};

	var browseStop = function (req, res) {
		var browser = mdns.createBrowser(mdns.tcp('googlecast'));
		
		browser.on('ready', function onReady() {
			console.log('browser is ready');
			browser.discover();
		});

		browser.on('update', function onUpdate(data) {
			console.log('data:', data);
			ondevicestop(data.addresses[0]);
		});

		setTimeout(function onTimeout() {
			browser.stop();
		}, TIMEOUT);
		
		res.json({data: "Stopping Cast"});
	};

	function ondevicestop(host) {
		
		var client = new Client();
		
		client.connect(host, function () {
			console.log('connected, stoppinhg app ...');
			client.stop(application, function () {
				client.close();
			});
		});
	}

	function ondeviceup(host) {

		var client = new Client();

		client.connect(host, function () {
			console.log('connected, launching app ...');

			client.launch(DefaultMediaReceiver, function (err, player) {
				application = player;
				var media = {

					// Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
					contentId : "file:///E:/Movies/Harry%20Potter/01%20-%20Harry%20Potter%20and%20the%20Sorcerer's%20Stone%20(2001)%207.2/Harry%20Potter%20and%20the%20Sorcerer's%20Stone.mp4",
					contentType : 'video/mp4',
					streamType : 'BUFFERED', // or LIVE

					// Title and cover displayed while buffering
					metadata : {
						type : 0,
						metadataType : 0,
						title : "Big Buck Bunny",
						images : [{
								url : "file:///E:/Movies/Harry%20Potter/01%20-%20Harry%20Potter%20and%20the%20Sorcerer's%20Stone%20(2001)%207.2/Harry%20Potter%20and%20the%20Sorcerer's%20Stone.jpg"
							}
						]
					}
				};

				player.on('status', function (status) {
					console.log('status broadcast playerState=%s', status.playerState);
				});

				console.log('app "%s" launched, loading media %s ...', player.session.displayName, media.contentId);

				player.load(media, {
					autoplay : true
				}, function (err, status) {
					console.log('media loaded playerState=%s', status.playerState);

					// Seek to 2 minutes after 15 seconds playing.
					setTimeout(function () {
						player.seek(2 * 60, function (err, status) {});
					}, 15000);

				});

			});

		});

		client.on('error', function (err) {
			console.log('Error: %s', err.message);
			client.close();
		});

	}

	module.exports = {
		browseStart : browseStart,
		browseStop : browseStop
	};
}
	());
