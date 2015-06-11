var ins = require('./insert')

var dbOptions = {
    host : "localhost",
    user : "root",
    password : "linokuhlekamva",
    port : 3306,
    database : "Nelisa"

}

data=[2,'qqqqqanana'];
ins.insert(dbOptions,'test',['id','name'],data);