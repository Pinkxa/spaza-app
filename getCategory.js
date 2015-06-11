exports.getCategory = function(product){
		  var fs = require('fs');
	
		  var catMap = {};
		  var found='';
	      var path = './productsSold.csv' 

	      var file = fs.readFileSync(path)
	      file=file.toString()

	      var lines = file.split('\n')
	      
	      lines.forEach(function(line){

	          if(line!=''){	

	          			  line = line.split(';');	          	        
	          	          var prod = String(line[1]);
	          	       
	          	          if(prod.toLowerCase() == product.toLowerCase()){
	          	          		found=line[0]
	          	          		
	          	          		
	          	          }
	          }
	          
	      })
	      return found
}
