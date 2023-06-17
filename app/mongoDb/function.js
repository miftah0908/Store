const { User } = require('./schema')

async function addUser(username, password, email) {
   let obj = {
      username,
      password,
      email,
   }
   User.create(obj)
}
module.exports.addUser = addUser

async function checkUsername(username) {
   let users = await User.findOne({
      username: username
   })
   if (users !== null) {
      return users.username
   } else {
      return false
   }
}
module.exports.checkUsername = checkUsername

async function checkPassword(password) {
   let users = await User.findOne({
      password: password
   })
   if (users !== null) {
      return users.password
   } else {
      return false
   }
}
module.exports.checkPassword = checkPassword

async function checkEmail(email){
   let x = await User.findOne({
      email: email
   })
   if (x !== null) {
      return x.email
   } else {
      return false
   }
}

module.exports.checkEmail = checkEmail

async function getUser(id) {
        let users = await User.findOne({_id: id})
        return { email: users.email, username: users.username, password: users.password}
    }
module.exports.getUser = getUser