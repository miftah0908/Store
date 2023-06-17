__path = process.cwd()
const config = require(__path + '/config.json')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    const hash = sha256.update(password).digest('base64')
    return hash
}
module.exports.getHashedPassword = getHashedPassword

const createActivationToken = (payload) => {
    const activationToken = jwt.sign(payload, config.activationToken, { expiresIn: '30m' })
    return activationToken
}
module.exports.createActivationToken = createActivationToken
