var express = require('express');
var exphbs  = require('express-handlebars');
//var Handlebars = require('express-handlebars/runtime')['default'];
var get = require('./get')
var Spaza = require('./spaza');
var nelisa = new Spaza(); 
var app = express();
var source = require('./source')
source =new source();
mysql = require('mysql');
myConnection = require('express-myconnection');

database = require('./database');

var dbOptions = {
    host : "localhost",
    user : "root",
    password : "theaya5379",
    port : 3306,
    database : "Nelisa"

}

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var products = nelisa.productList('./Nelisa Sales History.csv');
var mostpop = nelisa.mostPopularPdt(products);
var leastpop = nelisa.leastPopularPdt(products);
var mostcat = nelisa.mostPopularCat();
var leastcat = nelisa.leastPopularCat();

/*Handlebars.registerHelper('categorise', function(catid) {
  switch(catid){
    case 1:
        return "Dairy Products";
        break;
    case 2:
        return "Bakery";
        break;
    case 3:
        return "Canned Foods";
        break;
    case 4:
        return "Cold Beverages";
        break;
    case 5:
        return "Bulk";
        break;
    case 6:
        return "Soup";
        break;
    case 7:
        return "Cosmetics";
        break;
    case 8:
        return "Fruit";
        break;
    case 9:
        return "Confectionery";
        break;
    case 10:
        return "Valentines Goodies";
        break;

  }
});*/
var int = Math.floor(Math.random()*(products.length - 1)*1);
var product = products[int]
console.log('#### ->'+product.price.replace(',','.')+"+"+product.unitsSold)
app.get('/',function(req,res){
    res.render('home',{
        Name:product.name,
        Price:product.price,
        Sold:product.unitsSold,
        Total:(parseInt(product.price.replace(',','.'))*product.unitsSold),
        Image:source.getImage(product.name)
    });
})
app.get('/spaza', function (req, res) {
    res.render('spaza', {
      title : "Nelisa's Spaza Shop",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1Yr4oqLnm2D4WzI5cu8RsWvCUefwRXrwNJwuMH8TKtR7_7MB2"
      
    });
});

app.get('/suppliers', function (req, res) {
    res.render('suppliers', {

    });
});

app.get('/products', function (req, res) {
        var connection = mysql.createConnection(dbOptions)
        connection.connect();
        connection.query("select distinct products.name as name, sales.price as price ,categories.name as category from sales, products,categories where products.id=sales.product_id and products.category_id = categories.id",function(Err,results){

            res.render('products', {
            mostPopularProd : mostpop,
            leastPopularProd: leastpop,
            mostPop: mostcat,
            leastPop: leastcat,
            products:results
     
    });
        })
        
        
    
   
});

app.get('/sales', function (req, res) {
    res.render('sales', {

    });
});
 
 app.get('/profits', function (req, res) {
    res.render('profits', {

    });
});

 app.get('/other', function (req, res) {
    res.render('other', {
      
    });
});

 app.get('/product_list', database.products)

app.listen(3000)
