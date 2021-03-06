const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	status: { type: String, default: 'I am new'}
});

module.exports = mongoose.model('Uzer', userSchema);