var cluster = require('cluster');

if (cluster.isMaster) {
	var cpuCores = require('os').cpus().length;

	for (var i = 0; i < cpuCores; i++) {
		// console.log('forking')
		cluster.fork();
	}
	cluster.on('exit', function() {
		cluster.fork();
	});
} 
else {
	// console.log('requiring www')
	require('./www');
}