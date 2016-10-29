(function () {
	var osVariables = require('../../services/operatingSystem/osVariables'),
	childProcess = require('child_process'),
	Promise = require('promise');

	function getFileListCmd() {
		return (osVariables.isWin ? osVariables.winFileListCmd : osVariables.unixFileListCmd);
	}

	function executeFileListCmd(workingDir) {
		return new Promise(function (resolve, reject) {
			childProcess.exec(getFileListCmd(), {
				cwd : fixPath(workingDir)
			}, function (error, stdout, stderr) {
				if (error) {
					reject(error);
				} else {
					if (stderr) {
						resolve(null);
					} else {
						resolve(stdout);
					}
				}
			});
		});
	}

	function fixPath(dir) {
		return dir.replace(":", ":/");
	}

	function parseCmdOutput(output) {
		var files = output.split('\r\n');
		return files.slice(0, files.length - 1);
	}

	function getFiles(dir) {
		return new Promise(function (resolve, reject) {
			executeFileListCmd(dir).done(function (data) {
				if (data) {
					resolve(parseCmdOutput(data));
				} else {
					resolve(null);
				}
			});
		});
	}

	module.exports = {
		getFiles : getFiles
	};
}
	());
