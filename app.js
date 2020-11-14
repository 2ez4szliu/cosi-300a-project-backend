const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const config = require('./resources/config');
const CONNECTION_STRING = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@${config.CLUSTER_NAME}.qakbd.mongodb.net/${config.DBNAME}?retryWrites=true&w=majority`;

mongoose
	.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('DB connnection successful!'))
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

const app = express();
app.use(cors());
require('./routes/submission-routes')(app);
require('./routes/login-routes')(app);

// app.listen(4000, function() {
// 	console.log('listening on 4000');
// });

module.exports.handler = serverless(app);
