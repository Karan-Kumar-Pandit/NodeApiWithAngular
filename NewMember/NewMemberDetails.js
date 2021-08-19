//---------------------------------------------------------------------------------------
var express = require('express');
var bodyparser = require('body-parser');
var SQL = require("mssql");
const cors = require("cors");
const { Configration } = require('./Connection');
const { request } = require('http');

var Application = express();
Application.use(bodyparser.json());
Application.use(cors());
Application.use(express.json())


//---------------------------------------------------------------------------------------


Application.get('/api/login/users', function (Request, Response) {
    SQL.connect(Configration, function (Errors) {
        if (Errors == true) {
            console.log(Errors);
        } else {
            var request = new SQL.Request();
            request.query('SELECT * FROM userslogin', function (Errors, ResultDetails) {

                if (Errors) {
                    console.log(Errors);
                } else {
                    var ResponseDetails = {
                        message: 'Details get successfully.',
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                }
            });
        }
    });

});
//---------------------------------------------------------------------------------------

Application.post('/api/login/users', function (Request, Response) {


    var Email = Request.body.Email;
    var Password = Request.body.Password;


    SQL.connect(Configration, function () {
        var request = new SQL.Request();
        var myQuery =
            "INSERT INTO userslogin (Email,Password) values(' " + Email + " ',' " + Password + " ')";

        request.query(myQuery, function (Errors, ResultDetails) {
            if (Errors == true) {

                Response.send(Errors);
            }
            else {
                var ResponseDetails = {
                    message: 'Details insert successfully.',
                    error: false,
                    data: ResultDetails,
                }
                Response.send(ResponseDetails);
            }
        });
    });
});
//---------------------------------------------------------------------------------------
// Update user with id

Application.put('/api/login/users', function (Request, Response) {

    var tableName = "userslogin";

    var Id = Request.body.Id;
    var Email = Request.body.Email;
    var Password = Request.body.Password;


    if (Id != null && Email != "" && Password != "") {
        SQL.connect(Configration, function () {
            var request = new SQL.Request();
            var myNewQuery = `UPDATE ${tableName} SET Email ='${Email}',Password='${Password}' where Id = ${Id};`;

            request.query(myNewQuery, function (error, ResultDetails) {
                if (error) {
                    Response.send(error);
                } else {
                    var ResponseDetails = {
                        message: 'Details update successfully.',
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);

                }
            });
        });
    } else {

        var ResponseDetails = {
            message: 'Details update failed.',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);

    }
});

//---------------------------------------------------------------------------------------
//  Delete user

Application.delete('/api/login/users', function (Request, Response) {

    var Id = Request.body.Id;

    if (Id != null) {
        SQL.connect(Configration, function () {
            var request = new SQL.Request();
            var query = `DELETE FROM userslogin where Id=${Id}`;
            request.query(query, function (Errors, ResultDetails) {
                if (Errors) {
                    Response.send(Errors)
                } else {
                    var ResponseDetails = {
                        message: 'Details update successfully.',
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                }

            });
        });

    } else {
        var ResponseDetails = {
            message: 'Details not deleted.',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);
    }

});

//---------------------------------------------------------------------------------------


var server = Application.listen(9200, function () {
    console.log('Server is Running..');
});

//---------------------------------------------------------------------------------------


