//-------------------------------------------------------------------
var express = require('express');
var bodyparser = require('body-parser');
var SQL = require('mssql');
const cors = require('cors');
const { Configration } = require('./Connection');
const { request } = ('http');

var Application = express();
Application.use(bodyparser.json());
Application.use(cors());
Application.use(express.json());

//-------------------------------------------------------------------
//Get all details of table
Application.get('/resto/user/admissionform', function(Request, Response) {
    SQL.connect(Configration, function(Errors) {
        if (Errors == true) {
            console.log(Errors);
        } else {
            var request = new SQL.Request();

            dbQuery = "SELECT * FROM admission_form";


            request.query(dbQuery, function(Errors, ResultDetails) {
                if (Errors == true) {
                    console.log(Errors);
                    var ResponseDetails = {
                        status: 400,
                        message: 'Server error.',
                        error: true,
                        data: Errors,
                    }
                    Response.send(ResponseDetails);
                } else {
                    var ResponseDetails = {
                        status: 200,
                        message: 'Admission form get details successfully.',
                        error: false,
                        data: ResultDetails.recordset,
                    }
                    Response.send(ResponseDetails);
                }
            });
        }



    });

});
//-------------------------------------------------------------------
//Get all details of table
Application.get('/resto/user/admissionform/:id', function(Request, Response) {
    var id = Request.params.id;
    if (id != null) {
        SQL.connect(Configration, function(Errors) {
            if (Errors == true) {
                console.log(Errors);
            } else {
                var request = new SQL.Request();

                var id = Request.params.id;

                //----------------------------------------------------------------------------
                //Get all users Query

                // dbQuery = `SELECT * FROM admission_form WHERE id='${id}'`;


                // Get specific Column

                // dbQuery = `SELECT username , email FROM admission_form WHERE id='${id}'`;


                // Get all users specific column

                dbQuery = `SELECT username , email FROM admission_form`;


                // Get limit users specific column

                dbQuery =
                    `SELECT 
                username, email 
                FROM admission_form 
                ORDER BY email 
                OFFSET 1 
                ROWS FETCH 
                NEXT 4 ROWS ONLY`;



                request.query(dbQuery, function(Errors, ResultDetails) {
                    if (Errors == true) {
                        console.log(Errors);
                        var ResponseDetails = {
                            status: 400,
                            message: 'Server error.',
                            error: true,
                            data: Errors,
                        }
                        Response.send(ResponseDetails);
                    } else {
                        var ResponseDetails = {
                            status: 200,
                            message: 'Admission form get details successfully.',
                            error: false,
                            data: ResultDetails.recordset,
                        }
                        Response.send(ResponseDetails);
                    }
                });
            }

        });
    } else {

        var ResponseDetails = {
            message: 'Admission update failed.',
            message2: 'Id is blanks',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);

    }

});


//-----------------------------------------------------------------------------------------
//Insert data in table
Application.post('/resto/user/admissionform', function(Request, Response) {
    console.log(Request.body);

    var firstname = Request.body.firstname;
    // console.log(firstname);
    var lastname = Request.body.lastname;
    var username = Request.body.usersname;
    console.log(username);
    var fathername = Request.body.fathername;
    var mothername = Request.body.mothername;
    var email = Request.body.email;
    var password = Request.body.password;
    var gender = Request.body.gender;
    var cityname = Request.body.cityname;
    var description = Request.body.description;
    var propic = Request.body.picture;
    var contact = Request.body.phonenumber;
    var dob = Request.body.dateofbirth;

    SQL.connect(Configration, function() {
        var request = new SQL.Request();

        var dbQuery =
            `INSERT INTO admission_form (firstname,lastname,username,fathername,mothername,email,password,gender,cityname,description,propic,contact,dob)
            values('${firstname}','${lastname}','${username}','${fathername}','${mothername}','${email}','${password}','${gender}','${cityname}','${description}','abc','${contact}','${dob}')`;

        request.query(dbQuery, function(Errors, ResultDetails) {
            if (Errors) {

                var ResponseDetails = {
                    message: 'Admission form note submit.',
                    status: 400,
                    error: true,
                    data: Errors,
                }
                Response.send(ResponseDetails);
            } else {
                var ResponseDetails = {
                    message: 'Admission successfully.',
                    data: ResultDetails,
                    status: 200,
                    error: false,
                }
                Response.status(200);
                Response.send(ResponseDetails);
            }
        });
    });

});
//---------------------------------------------------------------------------------------
// Update user with id
Application.put('/resto/user/admissionform/:id', function(Request, Response) {

    var tableName = "admission_form";

    var id = Request.params.id;
    var firstname = Request.body.firstname;
    var lastname = Request.body.lastname;
    var username = Request.body.usersname;
    var fathername = Request.body.fathername;
    var mothername = Request.body.mothername;
    var email = Request.body.email;
    var password = Request.body.password;
    var gender = Request.body.gender;
    var cityname = Request.body.cityname;
    var description = Request.body.description;
    var propic = Request.body.picture;
    var contact = Request.body.phonenumber;
    var dob = Request.body.dateofbirth;


    console.log(Request.body);
    console.log(id);

    if (id != null) {
        SQL.connect(Configration, function() {
            var request = new SQL.Request();
            var dbQuery =
                `UPDATE ${tableName} SET 
                firstname ='${firstname}', 
                lastname ='${lastname}', 
                username ='${username}', 
                fathername ='${fathername}', 
                mothername ='${mothername}', 
                email ='${email}', 
                password ='${password}', 
                gender ='${gender}', 
                cityname ='${cityname}',
                description='${description}', 
                propic ='gtdg', 
                contact ='${contact}', 
                dob ='${dob}'
                WHERE id = ${id};`;

            request.query(dbQuery, function(Errors, ResultDetails) {
                if (Errors) {
                    var ResponseDetails = {
                        message: 'Student details not updated.',
                        status: 400,
                        id: id,
                        error: true,
                        data: Errors,
                    }
                    Response.send(ResponseDetails);
                } else {
                    var ResponseDetails = {
                        message: 'Student details update successfully.',
                        status: 200,
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);

                }
            });
        });
    } else {

        var ResponseDetails = {
            message: 'Admission update failed.',
            message2: 'Id is blanks',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);

    }
});
//---------------------------------------------------------------------------------------
//  Delete user
Application.delete('/resto/user/admissionform/:id', function(Request, Response) {


    var id = Request.params.id;
    console.log(Request.params.id);

    if (id != null) {
        SQL.connect(Configration, function() {
            var request = new SQL.Request();
            var dbquery = `DELETE FROM admission_form WHERE id=${id}`;
            request.query(dbquery, function(Errors, ResultDetails) {
                if (Errors) {
                    var ResponseDetails = {
                        message: 'Delete failed.',
                        status: 400,
                        error: true,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                } else {
                    var ResponseDetails = {
                        message: 'Details delete successfully.',
                        status: 200,
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                }

            });
        });

    } else {
        var ResponseDetails = {
            message: 'Id not found.',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);
    }

});
//---------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------
//Get all details of table
Application.get('/api/login/users', function(Request, Response) {
    SQL.connect(Configration, function(Errors) {
        if (Errors == true) {
            console.log(Errors);
        } else {
            var request = new SQL.Request();
            request.query('SELECT * FROM userslogin', function(Errors, ResultDetails) {

                if (Errors) {
                    console.log(Errors);

                } else {
                    var ResponseDetails = {
                        message: 'Details get successfully.',
                        error: false,
                        data: ResultDetails.recordsets[0],
                    }
                    Response.send(ResponseDetails);
                }
            });
        }
    });

});
//---------------------------------------------------------------------------------------
//Insert data in table
Application.post('/api/login/search/users', function(Request, Response) {
    var requestedItem = Request.body.search_item;


    SQL.connect(Configration, function(Errors) {
        if (Errors == true) {
            console.log(Errors);
        } else {
            var request = new SQL.Request();

            request.query(`SELECT * FROM userslogin WHERE Email LIKE '%${requestedItem}%' OR Password LIKE '%${requestedItem}%'`, function(Errors, ResultDetails) {

                if (Errors) {
                    console.log(Errors);

                } else {
                    var ResponseDetails = {
                        message: 'Search details get successfully.',
                        error: false,
                        data: ResultDetails.recordsets[0],
                    }
                    Response.send(ResponseDetails);
                }
            });
        }
    });

});
//---------------------------------------------------------------------------------------


Application.get('/api/login/users/:id', function(Request, Response) {

    var Id = Request.params.id;
    console.log(Request.params.id);
    if (Id != null) {

        SQL.connect(Configration, function(Errors) {
            if (Errors == true) {
                console.log(Errors);
            } else {
                var request = new SQL.Request();
                var myNewQuery = `SELECT * FROM userslogin WHERE Id = ${Id}`;
                request.query(myNewQuery, function(Errors, ResultDetails) {

                    if (Errors) {
                        console.log(Errors);

                    } else {
                        var ResponseDetails = {
                            message: 'Details get successfully.',
                            error: false,
                            data: ResultDetails.recordsets[0],
                        }
                        Response.send(ResponseDetails);
                    }
                });
            }
        });

    } else {
        var ResponseDetails = {
            message: 'Id not found.',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);
    }



});
//---------------------------------------------------------------------------------------

Application.post('/api/login/users', function(Request, Response) {


    var Email = Request.body.Email;
    var Password = Request.body.Password;


    SQL.connect(Configration, function() {
        var request = new SQL.Request();
        var myQuery =
            `INSERT INTO userslogin (Email,Password) values('${Email}','${Password}')`;

        request.query(myQuery, function(Errors, ResultDetails) {
            if (Errors == true) {

                Response.send(Errors);
            } else {
                var ResponseDetails = {
                    message: 'Login successfully.',
                    status: 200,
                    email: Email,
                    error: false,
                    data: ResultDetails,
                }
                Response.status(200);
                Response.send(ResponseDetails);
            }
        });
    });
});
//---------------------------------------------------------------------------------------
// Update user with id

Application.put('/api/login/users/:id', function(Request, Response) {

    var tableName = "userslogin";

    var Id = Request.params.id;
    var Email = Request.body.Email;
    var Password = Request.body.Password;

    console.log(Request.body);
    console.log(Id);

    if (Id != null && Email != "" && Password != "") {
        SQL.connect(Configration, function() {
            var request = new SQL.Request();
            var myNewQuery = `UPDATE ${tableName} SET Email ='${Email}',Password='${Password}' where Id = ${Id};`;

            request.query(myNewQuery, function(error, ResultDetails) {
                if (error) {
                    Response.send(error);
                } else {
                    var ResponseDetails = {
                        message: 'Details update successfully.',
                        status: 200,
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

Application.delete('/api/login/users/:id', function(Request, Response) {


    var Id = Request.params.id;
    console.log(Request.params.id);

    if (Id != null) {
        SQL.connect(Configration, function() {
            var request = new SQL.Request();
            var query = `DELETE FROM userslogin where Id=${Id}`;
            request.query(query, function(Errors, ResultDetails) {
                if (Errors) {
                    var ResponseDetails = {
                        message: 'Users not deleted successfully.',
                        status: 400,
                        id: Id,
                        error: true,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                } else {
                    var ResponseDetails = {
                        message: 'Users deleted successfully.',
                        status: 200,
                        error: false,
                        data: ResultDetails,
                    }
                    Response.send(ResponseDetails);
                }

            });
        });

    } else {
        var ResponseDetails = {
            message: 'Id not found.',
            error: true,
        }
        Response.status(400);
        Response.send(ResponseDetails);
    }

});

//---------------------------------------------------------------------------------------


var server = Application.listen(9200, function() {
    console.log('Server is running on port number 9200..');
});

//---------------------------------------------------------------------------------------