const mongoose = require('mongoose');
const Submission = require('../models/submission')(mongoose);
const bodyParser = require('body-parser');

module.exports = (app) => {
	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		res.send('Hello World');
	});

	//APIs for DB CRUD

	//create a new document if not exist, else update
	app.post('/', (req, res) => {
		let path = req.body.path,
			user = req.body.user,
			code = req.body.code;
		let query = { path: path, user: user },
			update = {
				path: path,
				user: user,
				code: code
			},
			options = { upsert: true };
		Submission.update(query, update, options, (error, result) => {
			if (error) {
				console.log(error);
			}
		})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log('Something wrong with the search query');
				console.log(err);
			});
	});
	//find one user by path and username
	app.get('/find', (req, res) => {
		let path = req.query.path;
		let user = req.query.user;
		Submission.find({ path: path, user: user })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log('Something wrong with the search query');
				console.log(err);
			});
	});

	// get all submission of a user
	app.get('/findByUsername', (req, res) => {
		let username = req.query.username;
		Submission.find({ user: username })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log('Something wrong with the search query');
				console.log(err);
			});
	});
};
