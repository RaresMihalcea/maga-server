var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');

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

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors(corsOptions));

app.listen(process.env.PORT || 8080);
console.log('listening on port 8080');

app.get('/hello', function (req, res) {
    res.send({ message: "Hello Atlantykron" })
});