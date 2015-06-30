//------------------------- import modules to use --------------------------------------//


            var express = require('express');
            var bodyParser = require('body-parser');
            var exphbs  = require('express-handlebars');
            var get = require('./get')
            var Spaza = require('./spaza');
            var source = require('./source')
            var mysql = require('mysql');


//------------------ initialize objects ----------------------------------------------//


            var nelisa = new Spaza(); 
            var app = express();
            source =new source();



//------------------ set up database  ------------------------------------------------//


            myConnection = require('express-myconnection');
            database = require('./database');
            var dbOptions = {
                host : "localhost",
                user : "root",
                password : "theaya5379",
                port : 3306,
                database : "Nelisa"

            }


//-----------------  setup middleware  -----------------------------------------------//

            app.use(myConnection(mysql, dbOptions, 'single'));
            app.use(express.static('public'))
            app.engine('handlebars', exphbs({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())



            var products = nelisa.productList('./Nelisa Sales History.csv');
            var mostpop = nelisa.mostPopularPdt(products);
            var leastpop = nelisa.leastPopularPdt(products);
            var mostcat = nelisa.mostPopularCat();
            var leastcat = nelisa.leastPopularCat();



//------------------  configure routes -----------------------------------------------//


            //user requsets home page

            app.get('/',function(req,res){
                var connection = mysql.createConnection(dbOptions)
                connection.connect();
                connection.query("select distinct products.name from products",function(err,results){
                    res.render('home',{
                        products:results
                        });
                })
                
            })




            //user requests spaza page

            app.get('/spaza', function (req, res) {
                res.render('spaza', {
                  title : "Nelisa's Spaza Shop",
                  image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1Yr4oqLnm2D4WzI5cu8RsWvCUefwRXrwNJwuMH8TKtR7_7MB2"
                  
                });
            });



            //user requests suppliers page

            app.get('/suppliers', function (req, res) {
                res.render('suppliers', {

                });
            });





            //user requests products page

            app.get('/products', function (req, res) {
                    var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                    connection.query("select distinct products.name as name,sales.price as price ,categories.name as category,sales.product_id as prodID from sales, products,categories where products.id=sales.product_id and products.category_id = categories.id",function(Err,results){

                        res.render('products', {
                        mostPopularProd : mostpop,
                        leastPopularProd: leastpop,
                        mostPop: mostcat,
                        leastPop: leastcat,
                        products:results,
                        view:0
                });
                    })
                    
                    
                
               
            });




            //user posts from products page

            app.post('/products',function(req,res){
                var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                    var strquery = 'update products set name='+'\''+req.body.name+'\''+' where id='+req.body.id+';'
                    
                    connection.query(strquery)
                    console.log(JSON.stringify(req.body))
                    res.send(req.body.prodId)
            })





            //user requests sales page

            app.get('/sales', function (req, res) {
                res.render('sales', {

                });
            });
             



            //user requests profits page 

             app.get('/profits', function (req, res) {
                res.render('profits', {

                });
            });


             //user requests others page

             app.get('/other', function (req, res) {
                res.render('other', {
                  
                });
            });



             

app.listen(3000)
