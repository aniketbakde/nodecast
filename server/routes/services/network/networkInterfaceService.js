(function () {
	var os = require('os');

	var ifaces = os.networkInterfaces();

	function getLocalIPv4Interfaces() {
		var networkInterfaces = [];
		Object.keys(ifaces).forEach(function (ifname) {

			var addresses = [];
			ifaces[ifname].forEach(function (iface) {
				if ('IPv4' !== iface.family || iface.internal !== false) {
					// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
					return;
				}

				addresses.push(iface.address);
			});
			
			if (addresses.length) {
				networkInterfaces.push({
					name : ifname,
					addresses : addresses
				});
			}
		});
		
		return networkInterfaces;
	}

	function getFirstLocalIP() {
		return getLocalIPv4Interfaces()[0].addresses[0];
	}

	module.exports = {
		getFirstLocalIP : getFirstLocalIP
	};
}
	());
