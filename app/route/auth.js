__path = process.cwd()
const config = require(__path + '/config.json')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
   
// Lib
const sendEmail = require('../controller/nodemailer')
const {
   createActivationToken,
   getHashedPassword
} = require('../lib/function')
const { addUser, checkUsername, checkPassword, checkEmail } = require('../mongoDb/function')
const {
   notAuthenticated
} = require('../lib/authCheck')

router.get('/login', notAuthenticated, (req, res) => {
   res.render('login', {
      layout: 'login'
   })
})

router.post('/login', async (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: `<div>
                  <span><b>Username or password not found</b></span>
                </div>`,
   })(req, res, next)
})

router.get('/activation', async (req, res) => {
   let id = req.query.id
   if (!id) {
      req.flash('error_msg', "Invalid activation token")
      res.redirect("/auth/register")
   }

   await jwt.verify(id, config.activationToken, async (err, user) => {
      if (err) {
         req.flash('error_msg', "Invalid activation token")
         res.redirect("/auth/register")
      } else {
         const {
            username,
            password,
            email
         } = user
         let checking = await checkUsername(username)
         let checkingEmail = await checkEmail(email)
         if (checking) {
            req.flash('error_msg', "Sorry. A user with that username already exists. Please use another username!")
            res.redirect("/auth/register")
         } else if (checkingEmail) {
            req.flash('error_msg', "Sorry. A user with that email address already exists. Please use another email!")
            res.redirect("/auth/register")
         } else {
            addUser(username, password, email)
            req.flash('success_msg', "Sign up successful. Please login to use our service.")
            res.redirect("/auth/login")
         }
      }
   })
})
router.get('/register', notAuthenticated, (req, res) => {
   res.render('register', {
      layout: 'register'
   })
})

router.post('/register', async (req, res) => {
   try {
      let {
         email,
         username,
         password,
         confirmPassword
      } = req.body
      if (password.length < 6 || confirmPassword < 6) {
         req.flash('error_msg', 'Password must contain at least 6 characters')
         return res.redirect('/auth/register')
      }
      if (password === confirmPassword) {
         let checking = await checkUsername(username)
         let checkingEmail = await checkEmail(email)
         if (checkingEmail) {
            req.flash('error_msg', 'A user with the same Email already exists')
            return res.redirect('/auth/register')
         }
         if (checking) {
            req.flash('error_msg', 'A user with the same Username already exists')
            return res.redirect('/auth/register')
         } else {
            let hashedPassword = getHashedPassword(password)
            const newUser = {
               username: username,
               password: hashedPassword,
               email
            }
            const activationToken = createActivationToken(newUser)
            const url = `https://${req.hostname}/auth/activation?id=${activationToken}`
            await sendEmail.inboxGmailRegist(email, url)
            req.flash('success_msg', 'You are now registered, please check your email to verify your account')
            return res.redirect('/auth/login')
         }
      } else {
         req.flash('error_msg', 'Password and Password confirmation are not the same')
         return res.redirect('/auth/register')
      }
   } catch (err) {
      console.log(err)
   }
})

router.get('/logout', (req, res) => {
   req.logout()
   req.flash('success_msg', 'Logout success')
   res.redirect('/auth/login')
})

module.exports = router