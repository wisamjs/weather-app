import {
	DEFAULT_CITIES,
	DEFAULT_COUNTRIES
} from './consts';

import uuid from 'uuid/v4';

import R from 'ramda';
export const hasName = R.propEq('name');
export const hasCountryId = R.propEq('countryId');

//Get from Local Storage
export const fetchCities = () => JSON.parse(localStorage.getItem('cities'));
export const fetchCountries = () => JSON.parse(localStorage.getItem('countries'));

// Init Cities for new user
export const fetchDefaultCities = () => {
	// save Default cities to 'database' and return cities from 'database'
	localStorage.setItem('cities',JSON.stringify(DEFAULT_CITIES));
	return fetchCities();
}

//Init countries for new user
export const fetchDefaultCountries = () => {
	// save Default countries to 'database' and return countries from 'database'
	localStorage.setItem('countries',JSON.stringify(DEFAULT_COUNTRIES));
	return fetchCountries();
}

// Set to local Storage
export const updateCities = (cities) => 
	localStorage.setItem('cities', JSON.stringify(cities))

export const updateCountries = (countries) => 
	localStorage.setItem('countries', JSON.stringify(countries))

//remove from Local Storage
export const deleteCity = (city) => (
	() => {
		const cities = fetchCities();
		
		//Leave out the id property that matches city Id
		const newCities = R.omit([city.id.toString()], cities);
		updateCities(newCities);
	}
);

//Add Countries to Local Storage key 'countries'
export const insertCountry = (country) => (
	() => {
		const countries = fetchCountries();
		const countryObj = R.filter(R.propEq('name', country) ,countries);
		
		//create new object since it doesnt exist
		if (R.isEmpty(countryObj)) {
			const newId = uuid();
			const newCountryObj = {
				id: newId,
				name: country
			}
    // Push updated countries into localstorage
			const newCountries = {...countries, [newId]: newCountryObj }
			updateCountries(newCountries);
			return newCountryObj;
		}
		
		//Return the countryObj to reference id
		return R.head(R.values(countryObj));

	}
);

//Add City to Local Storage key 'cities'
export const insertCity = (location) => (
	() => {
		const cities = fetchCities();
		
		/* filter by city name and 
		country id to check if exact city
		already exists
		*/
		const cityObj = R.compose(
			R.filter(hasCountryId(location.countryId)), 
			R.filter(hasName(location.city))
			)(cities);

		//create new object since it doesnt exist
		if (R.isEmpty(cityObj)) {
			const newId = uuid();
			const newCityObj = {
				id: newId,
				name: location.city,
				countryId: location.countryId
			}
				const newCities = {...cities, [newId]: newCityObj };
			updateCities(newCities);
			return newCityObj;
		}

		return cityObj;
});

