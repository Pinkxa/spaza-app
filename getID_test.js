var assert = require('assert');
var mysql = require('mysql');
var table = require('./getID');

var dbOptions = {
    host : "localhost",
    user : "root",
    password : "linokuhlekamva",
    port : 3306,
    database : "Nelisa"

}

		describe("get an id of a specified table", function() {
		  it("should return a specified id ", function(done) {
		    assert.equal(1,"name");

		   done();

		  });
		  
		});

      