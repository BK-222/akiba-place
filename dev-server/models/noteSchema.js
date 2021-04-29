const mongoose = require('mongoose');

const Note = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	msg: { type: String, required: true }
});

module.exports = mongoose.model('note', Note);