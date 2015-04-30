module.exports = function(){
		var fs = require('fs');

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