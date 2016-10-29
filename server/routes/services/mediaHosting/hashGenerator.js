(function () {
	var crypto = require('crypto');
	
	var KEY_SIZE = 10;
	
	function randomHash(){
		return crypto.randomBytes(KEY_SIZE).toString('hex');
	}
	
	module.exports = {
		randomHash : randomHash
	};
}
	());
