const mongoose = require('mongoose');
const config = require('../config/dev');

exports.connect = () => {
	mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
		console.log(`>>>> Connected to database succesfull!!`);
	})
}