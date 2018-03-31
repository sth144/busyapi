module.exports = function(app){
    app.post('/api/usages', function(req, res) {
        /*app.usages.push(req.body);

        var usageId = app.usages.length;
        console.log('Stored usage count: ' + usageId);

        res.status(201).json({'id':usageId});*/

        app.usageCount++;
        var id = app.usageCount;
        app.memcache.set(id, req.body, 400, function(err) {
        	if (err) {
        		console.log('Error: ' + err);
        	}
        })
        res.status(201).json({'id':id});
    });
}

