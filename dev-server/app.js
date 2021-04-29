const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/mevn';

const mainRoutes = require('./routes/main.js');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => { console.log('Mongoose is ON') });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader( 'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	   // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	 next();

});

app.get('/', (req, res, next) => {
	res.redirect('/main');
});

app.use('/main', mainRoutes);

app.use('/', (req, res, next) => {
	res.status(404).json({ msg: 'Uh oh! Nothing seems to be here!' });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = app;