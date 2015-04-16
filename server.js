var express = require('express');
var exphbs  = require('express-handlebars');
var Spaza = require('./spaza');
var nelisa = new Spaza(); 

var app = express();
app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/',function(req,res){
    res.render('home');
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
var products = nelisa.productList('./Nelisa Sales History.csv');
var mostpop = nelisa.mostPopularPdt(products);
var leastpop = nelisa.leastPopularPdt(products);
var mostcat = nelisa.mostPopularCat();
var leastcat = nelisa.leastPopularCat();

app.get('/products', function (req, res) {
    res.render('products', {
     mostPopularProd : mostpop,
     leastPopularProd: leastpop,
     mostPop: mostcat,
     leastPop: leastcat,
     a:'v'
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
app.listen(3000)
