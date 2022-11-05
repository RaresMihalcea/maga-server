const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')

const db = require("./models")

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// limit possible requests to angular app port and mobile phones
const whitelist = ['http://localhost:4200']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const app = express()

//middleware

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(cors(corsOptions))

app.use(notFoundMiddleware)
app.use(errorMiddleware)

// start
const port = process.env.PORT || 8080

const start = async () => {
    try {
        // await connectDB()
        db.sequelize.sync().then((req) => {
            console.log('Connected to sequelize!')
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}...`)
            })
        })
    } catch (error) {
        console.log(error)
    }
}
  
start()

// app.get('/hello', function (req, res) {
//     res.send({ message: "Hello Atlantykron" })
// });

// app.post('/registration', function (req, res) {
//     console.log("\n");

//     // Get post params
//     var email = req.body.email,
//         password = req.body.password;

//     console.log("Email is ", email);
//     console.log("Password is ", password);

//     // Hash the password to store in DB
//     var pass_sha = sha256(password);
//     console.log("Hashed password is ", pass_sha);  
        
//     var ok = 1;
    
//     let promise = new Promise(function(resolve, reject) {
//         // Check if email exists
//         con.query(`SELECT email FROM user_credentials`, function (err, rows, fields) {
//             if (err) {
//                 reject(err);
//             }

//             for (var key in rows) {
//                 var value = rows[key];
//                 console.log("email = " + value.email);
//                 if (value.email === email) {
//                     ok = 0;
//                     break;
//                 }
//             }
//             resolve(ok);
//         });
//     });
    
//     promise.then(function(ok) {
//         if (ok == 0) {
//             res.send("User already exists!");
//         }
        
//         // Insert into DB
//         if (ok == 1) {
//             var sql = `INSERT INTO user_credentials SET email = ?, password_hash = ?`;
//             var values = [email, pass_sha];
//             con.query(sql, values, function (err, results) {
//                 if (err) {
//                     console.error("Error in INSERT: ", err);
//                     throw err;
//                 }
//                 console.log("Records inserted: " + results.affectedRows);
//                 res.send('User added.');
//             });
//         }
//     }, function(err) {
//         console.error("Error in SELECT: ", err);
//         throw err;
//     });
// });

// app.post('/login', function (req, res) {
//     console.log("\n");

//     // Get post params
//     var email = req.body.email,
//         password = req.body.password;

//     console.log("Email is ", email);
//     console.log("Password is ", password);

//     // Hash the password to search in DB
//     var pass_sha = sha256(password);
//     console.log("Hashed password is ", pass_sha);  

//     var found = false;

//     // Check if email exists
//     con.query(`SELECT email, password_hash FROM user_credentials`, function (err, rows, fields) {
//         if (err) {
//             console.error("Error in SELECT: ", err);
//             throw err;
//         }

//         for (var key in rows) {
//             var value = rows[key];
//             console.log("email = " + value.email);
//             console.log("pass_hash = " + value.password_hash);
//             if (value.email === email && value.password_hash === pass_sha) {
//                 found = true;
//                 res.send('Login successful!');
//                 break;
//             }
//         }

//         if (found == false) {
//             res.send('User not found.');
//         }
//     });
// });