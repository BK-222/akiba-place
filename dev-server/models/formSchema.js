const mongoose = require('mongoose');

const bookingFormSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	days: { type: Number, required: true },
	date: { type: String, required: true }
});

module.exports = mongoose.model('bookingForm', bookingFormSchema);