__path = process.cwd()
const config = require(__path + '/config.json')
const nodemailer = require('nodemailer')

const mailer = {
  inboxGmailRegist: (email, codeVerify) => {
    try {
      const inboxGmail = `<html>
    <head></head>
    <body>
        <div style="background: white; color: black; line-height: 2; position: relative; padding: 1px 20px; padding-bottom: 10px; width: 320px; min-height: 200px; margin: auto; border: 1px solid black; border-radius: 15px;" align="center">
            <h3>Hello, Welcome!</h3> <small> Thank you for registering. Please verify your account in our database. Your link will expire in 30 minutes<a style="background-color: green; cursor: pointer; text-align: center; display: block; width: 110px; margin: 10px auto; padding: 5px 5px; /*border: 1px solid gray;*/ border-radius: 5px; color: white; text-decoration: none; font-size: 5px; font-weight: normal;" href="${codeVerify}">Verify Your Account</a> </small> <small>If the button doesn't work, please open the link <a style="text-decoration: none;" href="${codeVerify}">here</a> </small>
            <footer style="text-align: center; font-size: 10px;">
                Copyright © 2023 <a style="text-decoration: none;" href="https://danidev.eu.org">Dani Dev</a>. All rights reserved.
            </footer>
        </div>
    </body>
</html>`

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: config.emailSMTP,
          pass: config.passwordEmailSMTP
        },
      })

      let mailOptions = {
        from: '"Coding With Dani" <no-reply@gmail.com>',
        to: email,
        subject: 'Verify Your Email Address',
        html: inboxGmail,
      }

      transporter.sendMail(mailOptions, (err) => {
        if (err) { console.log(err) }
      })
    } catch (error) { console.log(error) }
  },
}

module.exports = mailer
