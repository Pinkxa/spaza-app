var express = require('express');
mysql = require('mysql');
myConnection = require('express-myconnection');

var app = express();

var dbOptions = {
	host: 'localhost',
	user: 'root',
	password: 'linokuhlekamva',
	port: 3306,
	database: 'Nelisa'
}

app.use(myConnection(mysql, dbOptions, 'single'));