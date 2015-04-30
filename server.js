var express = require('express');
var exphbs  = require('express-handlebars');
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
    password : "linokuhlekamva",
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
//console.log('\n\n'+JSON.stringify(products)+'\n\n')

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
    res.render('products', {
     mostPopularProd : mostpop,
     leastPopularProd: leastpop,
     mostPop: mostcat,
     leastPop: leastcat
     
    });
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
