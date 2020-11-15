const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./resources/config');
const CONNECTION_STRING = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@${config.CLUSTER_NAME}.qakbd.mongodb.net/${config.DBNAME}?retryWrites=true&w=majority`;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

mongoose.connect(CONNECTION_STRING, options).then(() => console.log('DB connnection successful!')).catch((err) => {
	console.log('Cannot connect to the database!', err);
	process.exit();
});

const app = express();
app.use(cors());
require('./routes/submission-routes')(app);
require('./routes/login-routes')(app);

app.listen(4000, function() {
	console.log('listening on 4000');
});
