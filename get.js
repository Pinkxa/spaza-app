var mysql = require('mysql');
exports.get = function(options,table,columns,callback){
				console.log("...Getting from "+table)
				var connection = mysql.createConnection(options)
				connection.connect();
				
				var cols = ""
                var queryStr = 'SELECT '
				columns.forEach(function(column){
					//cols+=(column+',')
					
					 if(columns.indexOf(column) != (columns.length-1)){
                        		console.log('adding to cols')
								cols += column+','
							}
					 else{
								cols += column;
								console.log('reached end . cols now '+cols)
							}

				})

				queryStr+=(cols+ ' FROM ' +table)
				console.log("\n"+queryStr+"\n")
				connection.query(queryStr, callback);
			}