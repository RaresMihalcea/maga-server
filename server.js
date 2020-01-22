var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var mysql = require('mysql');
var sha256 = require('js-sha256');

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
    host: "localhost",
    user: "root",
    password: "Atlantykron",
    database: "maga_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
});

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
    // Get post params
    var email = req.body.email,
        password = req.body.password;

    console.log("Email is ", email);
    console.log("Password is ", password);

    // Hash the password to store in DB
    var pass_sha = sha256.create();
    pass_sha.update(password);
    pass_sha.hex();    

    con.connect(function(err) {
        if (err) throw err;
        // Check if email exists
        con.query("SELECT email FROM user_credentials", function (err, result, fields) {
            if (err) throw err;
            var ok = 1;
            for (var key in result) {
                var value = result[key];
                if (value === email) {
                    console.log("User already exists!");
                    ok = 0;
                    break;
                }
            }
        });
        // Insert into DB
        if (ok == 1) {
            var sql = "INSERT INTO user_credentials (email, password_hash) VALUES (`$email`, `$pass_sha`)";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
});