const asyncWrapper = require('../middleware/async')
const { BadRequestError } = require('../errors')
const { validateEmail } = require('../utils/utils')

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN
//     }
// });

const sendEmail = asyncWrapper(async (req, res) => {
    const { emailAddress, emailBody } = req.body

    if(!emailAddress || !emailBody) {
        throw new BadRequestError('Please provide valid email address and email body', 400)
    }

    if(!validateEmail(emailAddress) || emailBody.length == 0) {
        throw new BadRequestError('Please provide valid email address and email body', 400)
    }

    console.log('email function not yet implemented')
    res.status(200).json({msg: "Email function not yet implemented but workflow works :)"})
})

module.exports = {
    sendEmail
}