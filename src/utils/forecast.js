const request = require('request');

// const url =
// 	'http://api.weatherstack.com/current?access_key=192d908a5390c15f06e9065bd63747d1&query=-43.532055,172.636230';

// request({ url: url, json: true }, (error, response) => {
// 	if (error) {
// 		console.log('Unable to get the weather');
// 	} else if (response.body.error) {
// 		console.log('Can not find the location');
// 	} else {
// 		const data = response.body.current;
// 		const weatherDescription = data.weather_descriptions[0];
// 		console.log(
// 			`Now it's ${weatherDescription.toLowerCase()}! It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
// 		);
// 	}
// });

const forecast = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=192d908a5390c15f06e9065bd63747d1&query=${lat},${lon}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather server', undefined);
		} else if (body.error) {
			callback('Can not find location', undefined);
		} else {
			const data = body.current;
			const weatherDescription = data.weather_descriptions[0];
			if (weatherDescription === undefined) {
				callback('Can not find the weather', undefined);
			} else {
				callback(
					undefined,
					`Now it's ${weatherDescription.toLowerCase()}! It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
				);
			}
		}
	});
};

module.exports = forecast;
