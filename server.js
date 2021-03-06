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
                console.log('Client requests home page')   
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
                var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                    connection.query("select * from suppliers",function(Err,results){
                    res.render('suppliers', {
                    suppliers : results

                });
            });
               
         });
 
 





            //user requests products page

            app.get('/products', function (req, res) {
                    var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                    connection.query("select distinct products.name as name,categories.id as catid,sales.price as price ,categories.name as category,sales.product_id as prodID from sales, products,categories where products.id=sales.product_id and products.category_id = categories.id",function(Err,results){

                        var newConnection = mysql.createConnection(dbOptions);
                        newConnection.connect();
                        var products = results;
                        newConnection.query('select name from categories',function(err,results){
                            
                            console.log('Client requests products page')
                            var categories = results;   
                            var PopularityConnection = mysql.createConnection(dbOptions)
                            PopularityConnection.connect()
                            PopularityConnection.query("select products.name, product_id as productID , sum(quantity) as Quantity from sales , products where products.id=product_id group by product_id ORDER BY Quantity DESC ",function(err,results){

                                    var CategoriesConnection = mysql.createConnection(dbOptions)
                                    CategoriesConnection.connect()
                                    var popularProduct = results[0];
                                    var unPopularProduct = results.pop();
                                    CategoriesConnection.query("select name , sum(Quantity) as catQuantity from (select categories.name,categories.id as cat_id, sum(quantity) as Quantity from sales , products ,categories where products.id=product_id and products.category_id = categories.id group by product_id ) as catSums group by cat_id ORDER BY catQuantity DESC",function(err,results){

                                            console.log('mostpop:'+JSON.stringify(results[0])+'\nLeastPop:'+JSON.stringify(results.pop()))
                                            res.render('products', {
                                                        mostPopularProd : popularProduct,
                                                        leastPopularProd: unPopularProduct,
                                                        mostPop: results[0],
                                                        leastPop: results.pop(),
                                                        products:products,
                                                        categories:categories
                                                    });
                                    })





                            })

                        })
                        
                    });
            });

            //user posts from products page

            app.post('/products',function(req,res){
                console.log('Client sends from products page')   
                var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                   
                    strquery ='select id from categories where name ='+'\''+req.body.cat+'\''+';'
                    connection.query(strquery,function(expressrr,results){
                        console.log("----------------------------------->"+results[0].id)
                        var newConnection = mysql.createConnection(dbOptions)
                        var newStrquery = 'update products set name='+'\''+req.body.name+'\''+' ,category_id='+'\''+results[0].id+'\''+' where id='+req.body.id+';'
                        newConnection.query(newStrquery);

                    })


                    console.log("Update Product : "+JSON.stringify(req.body))
                    res.send(req.body.prodId)
            });

            //user requests sales page
            app.get('/sales', function (req, res) {
                var connection = mysql.createConnection(dbOptions)
                connection.connect();

                connection.query("select DATE_FORMAT(sales.date,'%d %b %y') as date, products.name, sales.quantity, sales.price,sales.product_id from sales,products where products.id = sales.product_id order by sales.date desc",

                    function(err,results){
                            console.log('Client requests sales page : ' + err)   
                    
                            res.render('sales', {
                                sales : results
                    });
                });
            });    

            //user requests purchases page 

             app.get('/purchases', function (req, res) {
                var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                    connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, products.name as product, purchases.price, suppliers.name as supplier FROM purchases, products, suppliers WHERE products.id = purchases.product_id AND suppliers.id = purchases.supplier_id ORDER BY date",
                        function(err,results){


                    res.render('purchases', {
                    purchases : results

                    });

                    
                });
        });
               



            //user requests profits page 

             app.get('/profits', function (req, res) {
                console.log('Client requests profits page')   
                res.render('profits', {

                });
            });


             //user requests others page

             app.get('/other', function (req, res) {
                console.log('Client requests others page')   
                res.render('other', {
                  
                });
            });

             //setup the products handlers
            app.post('/products/add', products.add);
        
            app.get('/products/delete/:id', products.delete);

            //setup the sales handlers
            app.get('/sales/edit/:id', sales.get);
            app.post('/sales/add', sales.add);
            
            app.get('/sales/delete/:id', sales.delete);

            //setup the purchases handlers
            app.get('/purchases/edit/:id', purchases.get);
            app.post('/purchases/add', purgases.add);

            app.get('/purchases/delete/:id', purchases.delete);




app.listen(3100)


             


