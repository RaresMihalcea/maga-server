const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        console.log('Login auth midleware toouched')
        const user = getUserByEmail(email)
        if(user == null){
            console.log('No user')
            return done(null, false, {message: 'No user with that email'})
        }
        try{
            if(await bcrypt.compare(password.toString(),user.password.toString())){
                console.log('User logat - Parola corecta')
                return done(null, user, {message: 'Password correct'})
            }
            else{
                console.log('User nelogat - Parola incorecta')
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {
        console.log('----------Serialize User')
        console.log(user)
        done(null,user.id)
        })
    passport.deserializeUser((id, done) => {
        console.log('----------Deserialize Id')
        console.log(id)
        done(null, getUserById(id))
        })

}

module.exports = initialize