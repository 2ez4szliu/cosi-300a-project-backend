const mongoose = require('mongoose');
const Submission = require('../models/submission')(mongoose);
const bodyParser = require('body-parser');

module.exports = (app) => {
	app.use(bodyParser.json());

	app.get('/', (req, res) => {
		res.send('Hello World');
	});

	//APIs for DB CRUD

	//create a new document
	app.post('/', (req, res) => {
		const submission = new Submission({
			name: req.body.name,
			user: req.body.user,
			code: req.body.code,
			accepted: req.body.accepted ? true : false
		});

		submission
			.save(submission)
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				console.log('Something went wrong while saving');
				console.log(err);
			});
	});

	// get all submission of a user
	app.get('/findByUsername', (req, res) => {
		let username = req.body.username;
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
