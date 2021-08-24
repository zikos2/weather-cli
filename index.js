#!/usr/bin/env node

/**
 * weather-cli
 * forecast cli displadata cli displayerdyer
 *
 * @author Zakaria Ettani <zakaria2ettani@gmail.com>
 */
require('dotenv').config()
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const axios = require('axios');
const getWeatherData = require('./utils/getWeatherData');

const [input] = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input === `help` && cli.showHelp(0);

	if (input) {
		await getWeatherData(input);
	}

	flags.kech && (await getWeatherData('Marrakech'));

	debug && log(flags);
})();
