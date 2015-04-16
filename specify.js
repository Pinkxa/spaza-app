//Specifies the categories each product belongs to

// Categories are : 
				// (1) Food & Beverages
				// (2) Fruits & Vegetables
				// (3) Household Supplies

//does not return anything
		
var shop = require('./shop')
var chalk = require('chalk')   //to make console text look nice
var user = require('readline-sync') //to take user input
var fs = require('fs')			//to write our finisehd work on a file

var spaza = new shop();


var products = spaza.getProducts();
var prices =spaza.getPrices();

var shopItems =[]
var cats =["Dairy Products","Bakery","Canned Food","Cold Beverages","Bulk","Soup","Cosmetics","Fruit","Confectionery","Valentine Goodies"]
console.log(chalk.bold.grey.bgWhite("Select Type of Shop Item for following items (Enter 1, 2 or 3"))
console.log(chalk.black.bgWhite("Types are \n 1.Dairy Products\n2.Bakery\n3.Canned Food\n4.Cold Beverages\n5.Bulk\n6.Soup\n7.Cosmetics\n8.Fruit\n9.Confectionery\n10.Valentine Goodies"))

for (var product in products){
	var item = require('./shopItem')
	item = new item();
	item.name =product;
	item.price =prices[product]

	var num = user.question(product+" : ");
	item.type = cats[num-1];
	shopItems.push(item);
}
//console.log(shopItems)	

shopItems.forEach(function(item){
		var txt =item.type+";"+ item.name+";"+item.price+";"+item.unitsSold()+"\n"
		fs.appendFile( "productsSold.csv",txt,function (err) {if (err) throw err;});
})			
			