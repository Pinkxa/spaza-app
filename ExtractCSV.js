var mysql = require('mysql');
var fs = require('fs');
exports.ExtractCSV = function(_file,splitChar,itemNumber,skipFirstLine)
					{		
							var path =_file;
							var file = fs.readFileSync(path) 
							file=file.toString() //convert file from bytes (zeros and 1s) to readable string
							file= file.split('\r')
							var items =[]
							file.forEach(function(row){ //for each row in file

								if(skipFirstLine){ //if user wants to skip the first row
									if(file.indexOf(row)==0){return}
								}

								var item = row.split(splitChar)[itemNumber]//convert row from string to array then return the user's index

								if(item!=''){
										items.push(item);
								}
							})
							return items


					};