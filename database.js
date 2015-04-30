exports.products = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from products', [], function(err, results) {
        	if (err) return next(err);
    
        var productNames = [];

        /*results.forEach function(result) {
        	productNames = 
        }*/
    		res.render( 'product_list', {
    			products : JSON.stringify(results)
    		});
      });
	});
};