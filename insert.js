var mysql = require('mysql');
exports.insert = function(options,table,data){
				var connection = mysql.createConnection(options)
				connection.connect();

				var newdata = '(';
				data.forEach(function(item){
					var itemStr='';
					
					
					 if(data.indexOf(item) != (data.length-1)){
                        	

                        	if(typeof(item) == typeof('pretty')){
								itemStr = "\""+item+"\""+','
								newdata+=itemStr
							}
							else{
								itemStr = item+',';
								newdata+=itemStr
							}


					 }
					 else{

						 	if(typeof(item) == typeof('pretty')){
									itemStr = "\""+item+"\""
									newdata+=itemStr
								}
								else{
									itemStr = item;
									newdata+=itemStr
								}
					 	
					 }
                    
				})
				newdata+=')'


				var queryStr ='INSERT INTO '+table+' VALUES '+newdata

				console.log('DATA: '+newdata)
				console.log('QUERY: '+queryStr)

				connection.query(queryStr, function(err, results){});

			
    			connection.end();
				//queryStr = 'INSERT INTO '+table
				//connection.query('INSERT INTO')
				}