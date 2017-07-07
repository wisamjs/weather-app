import {createSelector} from 'reselect';

import {
	getWeekForecastsLoading,
	getCities,
	getCountries,
	getExactLocation,
	getCityFromId,
	getRouting,
	getWeekForecasts,
	getIdFromRoute,
	getHighsAndLows,
	getAvgWindinMph
} from './raw-selectors';

export const getCityId = createSelector(
	getRouting,
	getIdFromRoute
)

export const getCityObj = createSelector(
	getCityId,
	getCities,
	getCityFromId
	)

export const getLocationObj = createSelector(
	getCountries,
	getCityObj,
	getExactLocation
);


export const getWindConditions = createSelector(
	getWeekForecasts,
	getAvgWindinMph
);

export const getForecastTemperatures = createSelector(
	getWeekForecasts,
	getHighsAndLows
);

export const detailedForecastConnector = createSelector(
	getLocationObj,
	getWeekForecastsLoading,
	getForecastTemperatures,
	getWindConditions,
	(getLocationObj, getWeekForecastsLoading, getForecastTemperatures, getWindConditions) => {

		return {
			location: getLocationObj,
			loading: getWeekForecastsLoading,
			forecastTemperatures: getForecastTemperatures,
			avgWindSpeeds: getWindConditions
		}
	});

