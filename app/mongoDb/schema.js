const mongoose = require('mongoose')

const Users = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
})
module.exports.User = mongoose.model('user', Users)