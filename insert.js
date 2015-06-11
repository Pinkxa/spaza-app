var mysql = require('mysql');
exports.insert = function(options,table,columnNames,data){
				var connection = mysql.createConnection(options)
				connection.connect();

				var newdata = '(';
                var queryStr ='INSERT INTO '+table+' '

					 if(columnNames.length == 1){
					 	queryStr+= '('+ columnNames[0] +')'

					 }

					 else if(columnNames.length > 1) {
					 	var cols = "("
                        columnNames.forEach(function(column){

							 if(columnNames.indexOf(column) != (columnNames.length-1)){
		                        	
										cols += column+','
									}
							 else{
										cols += column;
									}

				        })

				        cols += ")"
						queryStr+=cols;
		            }

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


				queryStr+= (' VALUES '+newdata)

				console.log('DATA: '+newdata)
				console.log('QUERY: '+queryStr)

				connection.query(queryStr, function(err, results){});

			
    			connection.end();
				//queryStr = 'INSERT INTO '+table
				//connection.query('INSERT INTO')
				}