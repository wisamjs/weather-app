import {fetchFromApi} from './utils';
import R from 'ramda';

//TODO: create Node server to hide api key
const apiBaseUrl = 'http://api.wunderground.com/api/850eff61e6fda5e0';

const fetchFromWeatherApi = fetchFromApi(apiBaseUrl);

//Api returns data I don't need so I only
//pick properties I need
export const formatForecastResponse = (req, resp) => {
	const filteredResponse = R.pick([
		'display_location',
		'weather',
		'feelslike_string', 
		'dewpoint_c',
		'icon_url',
		'wind_string'
	])(resp.current_observation);

	return {...filteredResponse, id: req.id};
}

//Get day forecast for a location (city + country)
export const getForecast = (req) =>
	() => fetchFromWeatherApi('GET', `conditions/q/${req.country}/${req.city}.json`)
	.then(resp => resp.json())
	.then((resp) => formatForecastResponse(req, resp))

//Get detailed forecast for a location (city + country)
export const get10DayForecast = (req) =>
	() => fetchFromWeatherApi('GET', `forecast10day/q/${req.country}/${req.city}.json`)
	.then(resp => resp.json())

//Look up requested location to confirm location exists
export const getLocationDetails = (req) =>
() => fetchFromWeatherApi('GET', `geolookup/q/${req.country}/${req.city}.json`)
	.then(resp => resp.json())




