(function () {
	var localAddress = require('../../services/network/networkInterfaceService').getFirstLocalIP(),
	hashGen = require('../../services/mediaHosting/hashGenerator'),
	express = require('express');

	var STATIC_MEDIA_ROUTE = 'media';
	var MEDIA_PORT = 3001;

	var app = express();

	app.set('port', process.env.MEDIA_PORT || MEDIA_PORT);

	var server = app.listen(app.get('port'), function () {
			console.log('Express media server listening on port ' + server.address().port);
		});

	function getMediaRoute() {
		return ('/' + STATIC_MEDIA_ROUTE + '/' + hashGen.randomHash());
	}

	function getMediaUrl(route) {
		return ('http://' + localAddress + ':' + MEDIA_PORT + route);
	}

	function hostMediaContent(path) {
		var mediaRoute = getMediaRoute();
		app.use(mediaRoute, express.static(path));

		return getMediaUrl(mediaRoute);
	}

	function stopMediaContentHosting() {
		if (app._router) {
			app._router.stack = app._router.stack.filter(function (layer) {
					if (!(layer.name === 'serveStatic' && (layer.regexp.toString().indexOf(STATIC_MEDIA_ROUTE) >= 0))) {
						return layer;
					}
				});
		}
	}

	module.exports = {
		hostMediaContent : hostMediaContent,
		stopMediaContentHosting : stopMediaContentHosting
	};
}
	());
