const express = require('express')
const router = express.Router()
const flash = require('connect-flash')

// Lib
const { isAuthenticated } = require('../lib/authCheck')
const { getUser } = require('../mongoDb/function')

router.get('/', (req, res) => {
    res.render('home', {
    layout: 'home'
  })
})

router.get('/login', (req, res) => {
  res.redirect('/auth/login')
})

router.get('/signin', (req, res) => {
  res.redirect('/auth/login')
})

router.get('/register', (req, res) => {
  res.redirect('/auth/register')
})

router.get('/signup', (req, res) => {
  res.redirect('/auth/register')
})

router.get('/singout', (req, res) => {
  res.redirect('/auth/logout')
})

router.get('/logout', (req, res) => {
  res.redirect('/auth/logout')
})

router.get('/dashboard', (req, res) => {
  res.redirect('/pages/dashboard')
})

router.get('/pricing', (req, res) => {
    res.render('pricing', {
    layout: 'pricing'
  })
})

router.get('/checkout', (req, res) => {
    res.render('checkout', {
    layout: 'checkout'
  })
})

router.get('/payment', (req, res) => {
    res.render('payment', {
    layout: 'payment'
  })
})

/*
router.get('/dashboard', isAuthenticated, async(req, res) => {
  let user = await getUser(req.user.id)
  let { username, password, email } = user
  res.render('dashboard', {
    username,
    password,
    email,
    layout: 'dashboard'
  })
})
*/

module.exports = router