/**
 *	Set as start script in package.json to introduct clustering.
 *	Enables concurrent utilization of multiple CPU cores.
 */

// import cluster
var cluster = require('cluster');

// parent code
if (cluster.isMaster) {
	// obtain a count of available CPU cores
	var cpuCores = require('os').cpus().length;

	// generate a worker for each CPU core using fork()
	for (var i = 0; i < cpuCores; i++) {
		//console.log('forking')
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		// optional: report which worker process died
		//console.log('worker ${worker.process.pid} died');
	});
} 
// child code
else {
	//console.log('requiring www')
	require('./www');
}