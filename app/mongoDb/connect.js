__path = process.cwd()
const config = require(__path + '/config.json')
const mongoose = require('mongoose')

function connectToMongoDb() {
	mongoose.connect(config.mongoDbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	const db = mongoose.connection
	db.on('error', console.error.bind(console, '</> Connection error:'))
	db.once('open', () => {
		console.log('</> Success connect to MongoDb √')
	})
}

module.exports.connectToMongoDb = connectToMongoDb