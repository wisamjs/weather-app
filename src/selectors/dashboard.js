import {createSelector} from 'reselect';
import R from 'ramda';

import {
	getDayForecastsLoading,
	getCities,
	getCountries,
	getDailyForecasts,
	getExactLocations,
} from './raw-selectors';

/* 
	A location has a city property and country property
*/
export const getLocations = createSelector(
	getCities,
	getCountries,
	getExactLocations
)

/*
	Returns an array of forecasts
*/
export const getDailyForecastsList = createSelector(
	getDailyForecasts,
	R.values
)
/*
	Returns the selectors needed for the dashboard component
*/
export const dashboardConnector = createSelector(
	getDayForecastsLoading,
	getLocations,
	getDailyForecastsList,
	(getDayForecastsLoading, getLocations, getDailyForecastsList) => {
		debugger;
		return {
			loading: getDayForecastsLoading,
			locations: getLocations,
			dailyForecasts: getDailyForecastsList
		}
	}
);



