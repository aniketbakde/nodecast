(function () {
	var mediaContentTypes = require('../../services/mediaInfo/mediaContentTypes'),
	path = require('path');

	function getContentType(fileName) {
		return mediaContentTypes[path.extname(fileName)];
	}

	module.exports = {
		getContentType : getContentType
	};
}
	());
