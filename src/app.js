const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Peter'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Peter'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Peter',
		helpText: 'Good!'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	const searchAddress = req.query.address;

	geocode(searchAddress, (error, {latitude, longitude, location}={}) => {
		if (error) {
			return res.send({error});
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({error});
			}
			res.send({
				address: searchAddress,
				forecast: forecastData,
				location});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}

	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Peter',
		content: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Peter',
		content: 'Page not found'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
