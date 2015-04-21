var fs = require('fs');
var source = require('./source')
var imageSource = new source();
var shopItem = require('./shopItem')
  module.exports = function(){

    // Gets The list of products
    this.productList     = function(filePath){

      var linesInFile = fs.readFileSync(filePath, "utf8");

      var rows = linesInFile.split('\r');
      

      var listOfProducts = [];
      
      rows.forEach(

        function(row){ 
            if(rows.indexOf(row)==0 || row.length <=4 ){return}//if the row is empty or is the first row (at index 0 ) that contains headings , skip that row
            else{
                  var columns = row.split(';');
                  var currentItem = columns[2];
                  var numberSold = columns[3];
                 
                  var Product  = new shopItem()
                  Product.name = columns[2];
                  Product.price =columns[4].substring(1);
                  Product.unitsSold =columns[3]
                  listOfProducts.push(Product)
                }

      });

      
      return listOfProducts;
    }

   
    // Gets the Most popular product
    this.mostPopularPdt  = function(products){
           
            // products is an array of shopItem objects i.e [{name:'Milk',price:'R3.14',UnitsSold:'5',type:'Dairy Products'} ,{name:'Shampoo 1 litre',price:'R30.00',UnistSold:'12',type:'Toiletry'}  ...etc ]
                                                     //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       
             var mostPopularProduct = {};            //                   shopItem  object 1                                              shopItem   object 2                                      and so forth
             var QuantitySoldMap = {}
             var max = 0;             
             var name='';

             products.forEach(function(product){                   // for each product (shopItem Object) in products array

                var value = Number(product.unitsSold);

                if( QuantitySoldMap[ product.name ]==undefined){   // if the item doesn't yet exist in QuantitySoldMap
                      QuantitySoldMap[ product.name ]=0            // then initialize the item's value in the map
                }
                QuantitySoldMap[ product.name ]+=value;            // if it does exist , then add the existing quantity sold with that of the next object with the same product name
               
             })


             for(product in QuantitySoldMap){                      // for all the products in the QuantitySoldMap 

                if( QuantitySoldMap[product]  > max) {             // if that product's units that were sold are greater than the max , then that means that product's sold units are the max (the biggest)
                 
                 max =  QuantitySoldMap[product]
                 name = product;
                 
                }
             }
             var img = imageSource.getImage(name);
            
             console.log("*"+img);
             mostPopularProduct={Name : name , Quantity : max ,Image :img};
           
             return mostPopularProduct;
    };


    // Gets the Least popular product
    this.leastPopularPdt = function(products){ 
             //the same is done for the least popular category but instead of max (biggest) we use min (smallest)
           
             var leastPopularProduct = {};
             var QuantitySoldMap = {}
                      
             var name='';

             products.forEach(function(product){

                var value = Number(product.unitsSold);

                if( QuantitySoldMap[ product.name ]==undefined){
                      QuantitySoldMap[ product.name ]=0
                }
                QuantitySoldMap[ product.name ]+=value;
               
             })

       
             var min = QuantitySoldMap[Object.keys(QuantitySoldMap)[0]];  // make min = the first product's quantity sold  
             name = Object.keys(QuantitySoldMap)[0];

             for(product in QuantitySoldMap){
               
                if( QuantitySoldMap[product]  < min) {
                 
                 min =  QuantitySoldMap[product]

                 name = product;
                
                }
             }
             var img = imageSource.getImage(name);
             console.log("**"+img);

             leastPopularProduct={Name : name , Quantity : min ,Image :img};
           
             return leastPopularProduct;
    };



    // Gets the Most popular product category
    this.mostPopularCat = function(){

      var catMap = {};

      var path = './productsSold.csv' 

      var file = fs.readFileSync(path)
      file=file.toString()

      var lines = file.split('\n')
      
      lines.forEach(function(line){

          line = line.split(';');
          var category = line[0];

          if(category.length > 0){
              
              if(catMap[category] == undefined){
                  catMap[category]=0; 
              }
              catMap[category] += Number(line[3])
          }
      })
            
      var max =0;
      var maxName='';
      
      for(catgry in catMap ){

        if(catMap[catgry]>max){

          max = catMap[catgry];
          maxName = catgry

         // console.log("MxN :"+maxName+" val :"+max)
        }

      }
      var img = imageSource.getImage(maxName);
             console.log("***"+img);
      var maxMap ={}
      maxMap["ItemName"] = maxName
      maxMap["UnitsSold"] = max
      maxMap['Image']=img
      return maxMap;

    };

    
    // Gets the Least popular product category
    this.leastPopularCat = function(){
      var catMap = {};

      var path = './productsSold.csv' 

      var file = fs.readFileSync(path)
      file=file.toString()

      var lines = file.split('\n')
      
      lines.forEach(function(line){

          line = line.split(';');
          var category = line[0];

          if(category.length > 0){
              
              if(catMap[category] == undefined){
                  catMap[category]=0; 
              }
              catMap[category] += Number(line[3])
          }
      })
            
      var min=catMap[Object.keys(catMap)[0]];
      var minName='';
      
      for(catgry in catMap ){

        if(catMap[catgry]< min){

          min = catMap[catgry];
          minName = catgry

         // console.log("MxN :"+maxName+" val :"+max)
        }

      }
      var img = imageSource.getImage(minName);
             console.log("****"+img);
      var minMap ={}
      minMap["ItemName"] = minName
      minMap["UnitsSold"] = min
      minMap['Image']=img
      return minMap;

    };


};