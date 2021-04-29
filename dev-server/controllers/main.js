const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BookingForm = require('../models/formSchema.js');
const Note = require('../models/noteSchema.js');
const User = require('../models/userSchema.js');


exports.getMain = (req, res, next) => {
	res.status(201).json({ message: 'Main page' });
}

exports.postMain = (req, res, next) => {
	const newNote = new Note({
		_id: new mongoose.Types.ObjectId(),
		msg: req.body.msg
	});
	newNote.save()
	.then(result => {
		res.status(200).json({ message: `${result} form has been added!` });
	});
	// .catch(error => console.log(error));
}

exports.getLocation = (req, res, next) => {
	res.status(201).json({ message: 'Location' });
}

exports.getBook = (req, res, next) => {
	res.status(201).json({ message: 'Book your place!' });
}

exports.postBook = (req, res, next) => {
	const newForm = new BookingForm({
		_id: new mongoose.Types.ObjectId(),
		firstName: req.body.name,
		lastName: req.body.last,
		days: req.body.days,
		date: req.body.date
	});
	console.log(newForm);
	newForm.save()
	.then(result => {
		res.status(200).json(`object ${result} has been added.`);
	});
	// .catch(error => console.log(error));
}

exports.memberSignUp = (req, res, next) => {
	const password = req.body.password;
	const email = req.body.email;
	User.findOne({ email: email })
	.exec()
	.then(user => {
		if (user) {
			return res.status(409).json({ message: 'Looks like you\'re already here!' });
		}
		bcrypt.hash(password, 12)
		.then(hash => {
			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: email,
				password: hash
			});
			return newUser.save()
		})
		.then(result => {
			res.status(201).json({ message: 'User created' });
		})
	});
	// .catch(error => console.log(error));
}

exports.memberLogIn = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
	.exec()
	.then(user => {
		if (!user) {
			return res.status(404).json({ message: 'No such name was registered!' });
		}
		var loadedUser = user;
		bcrypt.compare(password, user.password)
		.then(equal => {
			if (!equal) {
				res.status(401).json({ message: 'Passwords do not match!' });
			}
			const token = jwt.sign({ name: loadedUser.name, userId: loadedUser._id.toString() },
				'kuwadorian', { expiresIn: '1h' });
			res.status(200).json({ message: 'Log in success!', token: token, userId: loadedUser._id.toString(), status: loadedUser.status });
			console.log(token);
		})
	});
	// .catch(error => console.log(error));
}

// exports.getUserStatus = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       const error = new Error('User not found.');
//       error.statusCode = 404;
//       throw error;
//     }
//     res.status(200).json({ status: user.status });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

exports.getUserStatus = (req, res, next) => {
	const userId = req.body.userId;
	User.findById(userId)
	.exec()
	.then(user => {
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ status: user.status });
	});
	// .catch(error => console.log(error));
}

exports.updateUserStatus = (req, res, next) => {
	const newStatus = req.body.status;
	const userId = req.body.userId;
	User.findById(userId)
	.exec()
	.then(user => {
		if (!user) {
			return res.status(404).json({ message: 'User wasn\'t found' });
		}
		user.status = newStatus;
		return user.save()
		// .then(result => {
		// 	res.status(200).json({ message: `User updated! New status is ${user.status}` });
		// });
	})
	.then(result => {
		res.status(200).json({ newStatus: result.status });
		//upper response with user won't work since it can't be fetched outside the inner then callback
	});
	// .catch(error => console.log(error));
}

exports.statusPage = (req, res, next) => {
	res.status(201).json({ message: 'Status Page' });
}

exports.secretMessage = (req, res, next) => {
	res.status(201).json({ message: 'I hate oniisan. -Rosa' });
}
