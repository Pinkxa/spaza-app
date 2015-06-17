var db = require('./insert');
var fl = require('./ExtractCSV');
var cat = require('./getCategory');
var table = require('./getID')
var dbOptions = {
    host : "localhost",
    user : "root",
    password : "theaya5379",
    port : 3306,
    database : "Nelisa"

}


//CATEGORIES

var duplicate = fl.ExtractCSV('productsSold.csv',';','0',true);
//console.log(duplicate)

var categories = [];

duplicate.forEach(function(category) {
	//console.log(categories.indexOf(category))
   if(categories.indexOf(category) == -(1)) {
   	     categories.push(category)
   }
});
/*categories.forEach(function(categ){
	db.insert(dbOptions,'categories', ['name'], [categ])
})*/



//PRODUCTS


var duplicateproducts = fl.ExtractCSV('Nelisa Sales History.csv',';','2',true);
//console.log(duplicateproducts)

var products = [];

duplicateproducts.forEach(function(product) {
	
   if(products.indexOf(product) == -(1)) {
   	     products.push(product)
   }
})


products.forEach(function(prod){
           
	table.getID(dbOptions,'categories',['id','name'],function(err, results){
		
		var prodCateg = cat.getCategory(prod);
		
		results.forEach(function(result){
			
			
			if(result.name == prodCateg){
				console.log('I FOund it ! the id is '+result.id)
				db.insert(dbOptions,'products',['name','category_id'],[prod,result.id])

				
			}
		})
		
		
			
	})

	
});