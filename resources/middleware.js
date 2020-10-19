const jwt = require('jsonwebtoken');
const secrets = require('../resources/secrets');

const withAuth = function(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt.verify(token, secrets.TOKEN_SECRET, function(err, decoded) {
			if (err) {
				res.status(401).send('Unauthorized: Invalid token');
			} else {
				req.username = decoded.username;
				next();
			}
		});
	}
};
module.exports = withAuth;
