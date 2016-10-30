(function () {
	'use strict';

	var cluster = require('cluster');
	if (cluster.isMaster) {
		console.log("Starting MASTER process...");
		// Fork workers.
		cluster.fork();
		cluster.on('exit', function (worker,code, signal) {
			console.log('#################');
			console.log('Worker ' + worker.id + ' died...');
			console.log('Error Code ' + code );
			console.log('#################');
			cluster.fork();
		});
	} else {
		console.log("Starting new CHILD process...");
		require('./app');
		process.on('uncaughtException', function (err) {
			process.exit(1);
		});
	}
}
	());
