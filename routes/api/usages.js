module.exports = function(app){
    app.post('/api/usages', function(req, res) {
        
        /**
         * previous request handling
         */

        /*app.usages.push(req.body);

        var usageId = app.usages.length;
        //console.log('Stored usage count: ' + usageId);

        res.status(201).json({'id':usageId});*/

        /**
         *  handle request using memcached middleware
         */

        app.usageCount++;
        var id = app.usageCount;

        // store the request body in the cache, timeout 400s, handle errors
        app.memcache.set(id, req.body, 400, function(err) {
        	if (err) {
        		console.log('Error: ' + err);
        	}
        })

        // respond with a 201 status
        res.status(201).json({'id':id});

    });
}

