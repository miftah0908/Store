module.exports = {
	isAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) { return next() }
		req.flash('error_msg', 'Please login to start your session.')
		res.redirect('/auth/login')
	},
	notAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) { return next() }
		res.redirect('/pages/dashboard')
	}
}
