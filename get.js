var mysql = require('mysql');
exports.getID = function(options,table,columns,item){
				var connection = mysql.createConnection(options)
				connection.connect();
				
				var cols = ""
                var queryStr = 'SELECT '
				columns.forEach(function(column){
					cols+=(column+',')
					
					 if(columns.indexOf(column) != (columns.length-1)){
                        	
								cols += column+','
							}
					 else{
								cols = column;
							}

				})

				queryStr+=(cols+ ' FROM ' +table)
				console.log(queryStr)

			}