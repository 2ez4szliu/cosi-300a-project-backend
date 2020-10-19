const bodyParser = require('body-parser');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secrets = require('../resources/secrets');
const withAuth = require('../resources/middleware');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.post('/register', (req, res) => {
		const { username, password } = req.body;
		const user = new User({ username, password });
		user.save(function(err) {
			if (err) {
				res.status(500).send('Error registering new user please try again.');
			} else {
				res.status(200).send('Register successful!');
			}
		});
	});

	app.post('/authenticate', function(req, res) {
		const { username, password } = req.body;
		User.findOne({ username }, function(err, user) {
			if (err) {
				console.error(err);
				res.status(500).json({
					error: 'Internal error please try again'
				});
			} else if (!user) {
				res.status(401).json({
					error: 'Incorrect username or password'
				});
			} else {
				user.isCorrectPassword(password, function(err, same) {
					if (err) {
						res.status(500).json({
							error: 'Internal error please try again'
						});
					} else if (!same) {
						res.status(401).json({
							error: 'Incorrect username or password'
						});
					} else {
						// Issue token
						const payload = { username };
						const token = jwt.sign(payload, secrets.TOKEN_SECRET, {
							expiresIn: '1h'
						});
						res.cookie('token', token, { httpOnly: true }).sendStatus(200);
					}
				});
			}
		});
	});

	app.get('/secret', withAuth, function(req, res) {
		res.send('The password is ...');
	});

	app.get('/checkToken', withAuth, function(req, res) {
		res.sendStatus(200);
	});
};
