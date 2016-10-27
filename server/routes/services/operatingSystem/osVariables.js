(function () {
	module.exports = {
		isWin : /^win/.test(process.platform),
		winFileListCmd : 'dir /b',
		unixFileListCmd : 'find ./  -printf "%f\n"' //not yet tested
	};
}
	());
