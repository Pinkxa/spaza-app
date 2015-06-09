var ins = require('./insert')

var dbOptions = {
    host : "localhost",
    user : "root",
    password : "linokuhlekamva",
    port : 3306,
    database : "Nelisa"

}

data=['aceoods','breadman',3,'dovelina'];
ins.insert(dbOptions,'test',data);