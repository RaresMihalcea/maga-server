var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var mysql = require('mysql2');
var sha256 = require('js-sha256');
var Promise = require('promise');

var whitelist = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Connect to DB
var con = mysql.createConnection({
    host: "maga-db",
    user: "root",
    password: "Atlantykron",
    database: "maga_db"
});
console.log("Connected to mysql!");

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to mysql!");
// });

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser());
app.use(methodOverride());
app.use(cors(corsOptions));

app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080');

app.get('/hello', function (req, res) {
    res.send({ message: "Hello Atlantykron" })
});

app.post('/registration', function (req, res) {
    console.log("\n");

    // Get post params
    var email = req.body.email,
        password = req.body.password;

    console.log("Email is ", email);
    console.log("Password is ", password);

    // Hash the password to store in DB
    var pass_sha = sha256(password);
    console.log("Hashed password is ", pass_sha);  
        
    var ok = 1;
    
    let promise = new Promise(function(resolve, reject) {
        // Check if email exists
        con.query(`SELECT email FROM user_credentials`, function (err, rows, fields) {
            if (err) {
                reject(err);
            }

            for (var key in rows) {
                var value = rows[key];
                console.log("email = " + value.email);
                if (value.email === email) {
                    ok = 0;
                    break;
                }
            }
            resolve(ok);
        });
    });
    
    promise.then(function(ok) {
        if (ok == 0) {
            res.send("User already exists!");
        }
        
        // Insert into DB
        if (ok == 1) {
            var sql = `INSERT INTO user_credentials SET email = ?, password_hash = ?`;
            var values = [email, pass_sha];
            con.query(sql, values, function (err, results) {
                if (err) {
                    console.error("Error in INSERT: ", err);
                    throw err;
                }
                console.log("Records inserted: " + results.affectedRows);
                res.send('User added.');
            });
        }
    }, function(err) {
        console.error("Error in SELECT: ", err);
        throw err;
    });
});

app.post('/login', function (req, res) {
    console.log("\n");

    // Get post params
    var email = req.body.email,
        password = req.body.password;

    console.log("Email is ", email);
    console.log("Password is ", password);

    // Hash the password to search in DB
    var pass_sha = sha256(password);
    console.log("Hashed password is ", pass_sha);  

    var found = false;

    // Check if email exists
    con.query(`SELECT email, password_hash FROM user_credentials`, function (err, rows, fields) {
        if (err) {
            console.error("Error in SELECT: ", err);
            throw err;
        }

        for (var key in rows) {
            var value = rows[key];
            console.log("email = " + value.email);
            console.log("pass_hash = " + value.password_hash);
            if (value.email === email && value.password_hash === pass_sha) {
                found = true;
                res.send('Login successful!');
                break;
            }
        }

        if (found == false) {
            res.send('User not found.');
        }
    });
});