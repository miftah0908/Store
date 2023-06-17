const express = require('express')
const router = express.Router()
const flash = require('connect-flash')

// Lib
const { isAuthenticated } = require('../lib/authCheck')
const { getUser } = require('../mongoDb/function')

router.get('/home', (req, res) => {
    res.render('home', {
    layout: 'home'
  })
})

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

router.get('/pricing', (req, res) => {
    res.render('pricing', {
    layout: 'pricing'
  })
})

module.exports = router