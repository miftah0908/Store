__path = process.cwd()
const config = require(__path + '/config.json')
const PORT = config.port
const express = require('express')
var server = express()
var app = require('../app/index.js')

server.use('/', app)

server.listen(PORT, () => {
  console.log("</> Server running on: http://localhost:" + PORT + " √")
})
