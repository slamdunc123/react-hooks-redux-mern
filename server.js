const express = require('express');
const conn = require('./config/db');
const path = require('path');

const pdf = require('html-pdf');

const pdfTemplate = require('./documents/htmlPdfTemplate');

const app = express();

// connect to database
conn();

// init middleware (inc bodyParser which allows data to be retrieved in req.body eg in user.js)
app.use(express.json({ extended: false }));

// test route - http://localhost:5000
// app.get('/', (req, res) => res.send('test route successful'));

// define routes
app.use('/api/items', require('./routes/api/items')); //localhost:5000/api/items
app.use('/api/auth', require('./routes/api/auth')); // http://localhost:5000/api/auth
app.use('/api/users', require('./routes/api/users')); // http://localhost:5000/api/users

app.post('/create-pdf', (req, res) => {
	pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
		if (err) {
			res.send(Promise.reject());
		}

		res.send(Promise.resolve());
	});
});

app.get('/fetch-pdf', (req, res) => {
	res.sendFile(`${__dirname}/result.pdf`);
});

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
