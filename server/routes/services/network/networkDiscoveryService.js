(function () {
	var mdns = require('mdns-js'),
	Promise = require('promise');

	var TIMEOUT = 5000; //5 seconds
	var GOOGLE_CAST = 'googlecast';
	var chromeCastDetails = null;

	var getChromeCast = function () {
		if (chromeCastDetails) {
			return new Promise(function (resolve, reject) {
				resolve(chromeCastDetails);
			});
		} else {
			return findDevice();
		}
	};

	var findDevice = function () {
		return new Promise(function (resolve, reject) {
			var browser = mdns.createBrowser(mdns.tcp('googlecast'));

			browser.on('ready', function () {
				browser.discover();
			});

			browser.on('update', function (data) {
				// console.log(data.addresses);
				// console.log(data.txt);
				var addresses = data.addresses[0];
				// var deviceName = data.txt.filter(function (item) {
						// return (item.indexOf("fn=") >= 0);
					// })[0].split("=")[1];
				chromeCastDetails = {
					addresses : addresses,
					// deviceName : deviceName
				};
				resolve(chromeCastDetails);
			});

			setTimeout(function onTimeout() {
				browser.stop();
			}, TIMEOUT);
		});
	};

	module.exports = {
		getChromeCast : getChromeCast
	};
}
	());
