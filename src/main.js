if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(cors())

app.use('/', require('./routes/login'))
app.use('/', require('./routes/registration'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));