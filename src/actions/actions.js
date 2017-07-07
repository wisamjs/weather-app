import createAction from './utils/createAction';
import {
	ON_STATE_MOUNT,
	ON_FETCH_CITIES,
	ON_FETCH_COUNTRIES,
	
	ON_DASHBOARD_MOUNT,
	ON_ADD_LOCATION,
	ON_REMOVE_LOCATION,
	ON_FORECAST_LOCATION_CLICK,
	ON_DETAILED_FORECAST_MOUNT
} from './consts';

//Local Storage
export const fetchLocationData = (payload={}) => {
	return createAction(ON_STATE_MOUNT, payload);
}

export const fetchCities = (payload={}) => {
	return createAction(ON_FETCH_CITIES, payload);
}

export const fetchCountries = (payload={}) => {
	return createAction(ON_FETCH_COUNTRIES, payload);
}

export const addLocation = (payload) => {
	return createAction(ON_ADD_LOCATION, payload);
}

export const removeLocation = (payload) => {
	return createAction(ON_REMOVE_LOCATION, payload);
}

//Forecasts

export const fetchForecast = (payload) => {
	return createAction(ON_DASHBOARD_MOUNT, payload);
}

export const fetchForecasts = (payload) => {
	return createAction(ON_DASHBOARD_MOUNT, payload);
}

export const fetchDetailedForecast = (payload) => {
	return createAction(ON_DETAILED_FORECAST_MOUNT, payload);
}


//Browser
export const goToDetailedForecastPage = (payload) => {
	return createAction(ON_FORECAST_LOCATION_CLICK, payload);
}


