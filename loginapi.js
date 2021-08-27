//---------------------------------------------------------------------------------------
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var sql = require("mssql");
const cors = require("cors");
const fs = require("fs");
const { request } = require('http');

app.use(bodyparser.json());
app.use(cors());
app.use(express.json())


//---------------------------------------------------------------------------------------
// config for your database
const config = {
        user: 'sa',
        password: 'karan',
        server: 'DESKTOP-N694TOB',
        database: 'Resto',
        trustServerCertificate: true,
        'options.encrypt': false
    }
    //---------------------------------------------------------------------------------------
app.get('/api/login', function(req, res) {
    sql.connect(config, function(err) {
        if (err) {
            console.log(err);
        } else {
            var request = new sql.Request();
            request.query('select * from userslogin', function(err, recordset) {
                // request.query('sp_get_login', function (err, recordset) {

                if (err) console.log(err)
                res.send(recordset);
            });
        }
    });
});
//---------------------------------------------------------------------------------------
// create json file in node js
app.post('/api/login/write', function(req, res) {

    sql.connect(config, function(err) {

        const bioData = {
            name: "karan",
            age: 22,
            address: "dumri",
            contactNo: 1234567890,
            schoolAddress: [{
                schoolName: "dav",
                principal: "rohit",
                schoolCode: 123,
                teachersName: [{
                    mathTeacher: "aman",
                    hindiTeacher: "soni",
                    mathTeacher2: "aman",
                    hindiTeacher3: "soni",
                    mathTeacher4: "aman",
                    hindiTeacher5: "soni",
                }]
            }]

        };

        const jsonData = JSON.stringify(bioData);

        fs.writeFile("jsons/json3.json", jsonData, (err, done) => {
            console.log(done);
        });

        fs.readFile("jsons/json3.json", "utf-8", (err, data) => {
            // console.log(data);
            const orgData = JSON.parse(data);
            console.log(orgData);
            console.log(data);
            res.send(orgData);
        });

    })

});
//---------------------------------------------------------------------------------------
//rest api to create a new record into mysql database
app.post('/api/login', function(req, res) {

    console.log(req.body);
    //store procedure say connection kay liya
    var Email = req.body.Email;
    var Password = req.body.Password;


    sql.connect(config, function() {
        var request = new sql.Request();
        var myQuery =
            "INSERT INTO userslogin (Email,Password) values('" + req.body.Email + "','" + req.body.Password + "')";
        // "exec sp_add_login  @Email='" + Email + "', @Password='" + Password + "';";
        request.query(myQuery, function(err, result) {
            if (err) {
                console.log("Error al correr query en la base :- " + err);
                res.send(err);
            } else {
                res.write("Data insert successfully.");
                res.send();
            }
        });
    });
});
//---------------------------------------------------------------------------------------
// Update user with id

app.put('/api/login', function(req, res) {

    // console.log(req.body);
    var tableName = "userslogin";

    var Id = req.body.Id;
    var Email = req.body.Email;
    var Password = req.body.Password;


    if (!Id && !Email && !Password) {
        return res.status(400).send({ err: user, message: 'Please provide full information.' });
    } else {
        sql.connect(config, function() {
            var request = new sql.Request();
            var myNewQuery = `UPDATE ${tableName} SET Email ='${Email}',Password='${Password}' where Id = ${Id};`;

            request.query(myNewQuery, function(error, results, fields) {
                if (error) {
                    throw error;
                } else {

                    return res.send({ error: false, data: results, message: 'Details update successfully.' });
                }
            });
        });
    }
});

//---------------------------------------------------------------------------------------
//  Delete user

app.delete('/api/login', function(req, res) {

    // console.log(req.body);

    var Id = req.body.Id;

    if (!Id) {
        return res.status(400).send({ error: true, message: 'Please provide id.' });
    } else {
        sql.connect(config, function() {
            var request = new sql.Request();
            var query = `DELETE FROM userslogin where Id=${Id}`;
            request.query(query, function(error, response, fields) {
                if (error) throw error;
                return res.send({ error: false, data: response, message: 'Users has been deleted.' });
            });
        });
    }




});

//---------------------------------------------------------------------------------------

var server = app.listen(4000, function() {
    console.log('Server is running..');
});