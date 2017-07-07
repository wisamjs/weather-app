import R from 'ramda';

const decimalRadix = 10;
export const getDayForecastsLoading = (routerReduxState) => routerReduxState.state.dayForecasts.loading;
export const getCities = (routerReduxState) => routerReduxState.state.cities.byId;
export const getCountries = (routerReduxState) => routerReduxState.state.countries.byId;
export const getDailyForecasts = (routerReduxState) => routerReduxState.state.dayForecasts.byId;
export const getWeekForecastsLoading = (routerReduxState) => routerReduxState.state.weekForecasts.loading;

export const getWeekForecasts = (routerReduxState) => {
	return routerReduxState.state.weekForecasts.byId;
}

export const getRouting = (routerReduxState) => routerReduxState.routing;
export const getIdFromRoute = (route) => {
	/* 
	Discovered this bug late in the game.
	Default cities and countries have naive ids (0, 1)
	whereas new cities and countries have uuids

	If they were all the same format, I wouldnt have
	to have 2 seperate ways of returning the id.
	*/
	if (route.params.id.length > 1) {
		return route.params.id;
	} else {
		//return as string to access as object id later
		return parseInt(route.params.id, decimalRadix);
	}
}


export const getObjPropById = (id, obj) => R.path([id], obj);

export const getExactLocation = R.curry((countries,city) => {
	console.log(countries, city);
	const country = getObjPropById([''+city.countryId], countries);
	return { 
		...city,
		city: city.name,
		country: country.name
	}
});



/*
	Assumption is that we only have a detailed forecast
	for only one city. So immediately grab the forecast
	object to use data
*/
export const getHighsAndLows = (forecastsById) => {
	const forecast = R.head(R.values(forecastsById)) || {};
	const detailedForecast = forecast.detailedForecast || [];

	/*Go through detailedForecast array
	and massage data to return 
	high and lowproperties

	*/

	return R.map((data)=> ({
		high: data.high.celsius,
		low: data.low.celsius,
		day: data.date.day,
		weekday: data.date.weekday_short
	}),detailedForecast);

}

/*
	Assumption is that we only have a detailed forecast
	for only one city. So immediately grab the forecast
	object to use data
*/
export const getAvgWindinMph =  (forecastsById) => {
	const forecast = R.head(R.values(forecastsById)) || {};
	const detailedForecast = forecast.detailedForecast || [];

		/*
		Go through detailedForecast array
		and massage data to return 
		wind properties
	*/

		return R.map((data)=> ({
			wind: data.avewind.mph,
			unit: 'mph',
			weekday: data.date.weekday_short
		}), detailedForecast)
}

export const getExactLocations = (cities, countries) => (
	R.map(getExactLocation(countries),cities)
	);

export const getCityFromId = (id, cities) => cities[id];