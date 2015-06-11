var mysql = require('mysql');
var globRes=''
var storage = function(item){
	globRes = item;
}

exports.getID = function(options,table,columns,callback){
				var connection = mysql.createConnection(options)
				connection.connect();
				
				var cols = ""
                var queryStr = 'SELECT '

				columns.forEach(function(column){

					 if(columns.indexOf(column) != (columns.length-1)){
                        	
								cols += column+','
							}
					 else{
								cols += column;
							}

				})

				queryStr+=(cols+ ' FROM ' +table)
			    //console.log(queryStr)

                 var tst=''
                connection.query(queryStr, callback);
			
    			//connection.end();
			}