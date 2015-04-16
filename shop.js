//Queries the Sales history

module.exports = function(){
		var fs = require('fs');

		this.getPopularProduct = function(){

				var path = '../files/NelisaSalesHistory.csv'
				var file = fs.readFileSync(path)
				file=file.toString()
				file= file.split('\r')
				var products ={}
				file.forEach(function(row){
					if(file.indexOf(row)==0){return}
					var product = row.split(';')[2]
					if(product!=''){
							if(products[product]==undefined){
								products[product]=0
							}
							products[product]+=parseInt(row.split(';')[3])
					}
				})
			
				var max=0;
				var maxProduct='';
				for(var product in products){
						if(products[product] > max){
							max = products[product];
							maxProduct =product
						}
				};
				var maxMap ={}
				maxMap[maxProduct] = max;
			    
				return maxMap

		}
		this.PopularByCategory = function(){

			var popular = this.getPopularProduct();
			var path = '../functions/productsSold.csv'
			var file = fs.readFileSync(path)
			file=file.toString()
			file= file.split('\n')
			var max =0;
			var maxProduct='';
			var maxCat='';
			var product ='';
			file.forEach(function(row){
					
					product = row.split(';')[1]
					var units =parseInt(row.split(';')[3])
					if (units > max){
						
						
							max=units;
							maxProduct=product
							maxCat =row.split(';')[0];
					}

					
				})
			var map={}
			map[maxProduct]=max;
			map['type']=maxCat;

			return map;

		}
		this.getProducts = function(){

				var path ='./Nelisa Sales History.csv'
				var file = fs.readFileSync(path) 
				file=file.toString()
				file= file.split('\r')
				var products ={}
				file.forEach(function(row){
					if(file.indexOf(row)==0){return}
					var product = row.split(';')[2]
					if(product!=''){
							if(products[product]==undefined){
								products[product]=0
							}
							products[product]+=parseInt(row.split(';')[3])
					}
				})
				return products
		
		}
		this.getPrices = function(){

				var path = './Nelisa Sales History.csv'
				var file = fs.readFileSync(path) 
				file=file.toString()
				file= file.split('\r')
				var products ={}
				file.forEach(function(row){
					if(file.indexOf(row)==0){return}
					var product = row.split(';')[2]
					if(product!=''){
							if(products[product]==undefined){
								products[product]=0
							}
							products[product]=row.split(';')[4]					}
				})
				return products
		
		}
}

