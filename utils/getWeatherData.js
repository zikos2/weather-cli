const axios = require('axios');
const ora = require('ora');
const to = require('await-to-js').default;
const { bold, italic } = require('chalk');
const handleError = require('cli-handle-error');
const kToC = require('../helpers/kToC');

module.exports = async function getWeatherData(city) {
	const spinner = ora({ text: '' });

	//Getting the latitude and longitude data of the city
	console.log(italic(bold(city)));
	console.log();
	spinner.start(`Getting forecast data...`);

	const [err, cityData] = await to(
		axios.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${city},+212&limit=1&appid=${process.env.API_KEY}`
		)
	);
	handleError(`API CALL FAILED`, err, true, true);
	const { lat, lon } = cityData.data[0];

	//Requesting forecast data
	const [error, response] = await to(
		axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${process.env.API_KEY}`
		)
	);
	handleError(`API CALL FAILED`, error, true, true);

	spinner.stop();

	response.data.daily.forEach((day, idx) => {
		console.log(
			`${bold(idx)}- Max:${kToC(day.temp.max)}, Min:${kToC(
				day.temp.min
			)}, night: ${kToC(day.temp.night)}, day: ${kToC(day.temp.day)} `
		);
		console.log();
		console.log();
	});
};
