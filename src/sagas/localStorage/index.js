import {
  all,
  call, 
  put, 
  takeLatest 
} from 'redux-saga/effects';

import {
  ON_STATE_MOUNT,
  ON_STATE_MOUNT_SUCCESS,
  ON_STATE_MOUNT_ERROR,

  ON_FETCH_CITIES_SUCCESS,
  ON_FETCH_CITIES_ERROR,

  ON_REMOVE_CITY_SUCCESS,
  ON_REMOVE_CITY_ERROR,

  ON_ADD_COUNTRY_SUCCESS,
  ON_ADD_COUNTRY_ERROR,

  ON_ADD_CITY_SUCCESS,
  ON_ADD_CITY_ERROR,

  ON_REMOVE_LOCATION,
  ON_REMOVE_LOCATION_SUCCESS,
  ON_REMOVE_LOCATION_ERROR,

  ON_ADD_LOCATION_SUCCESS,
  ON_ADD_LOCATION_ERROR,

  ON_REMOVE_FORECAST,
  ON_FETCH_NEW_FORECAST,

  ON_LOCATION_VALID,

  ON_FETCH_COUNTRIES_SUCCESS,
  ON_FETCH_COUNTRIES_ERROR,
} from '../../actions/consts';

import { 
  fetchCities,
  fetchCountries,
  fetchDefaultCities,
  fetchDefaultCountries,
  deleteCity,
  insertCountry,
  insertCity
} from '../../api/localStorage';


/* 
  Async function that fetches cities from the local Storage 'api'
  If the response is empty, then the user is presumed to be a new
  user and so another request is made to get default cities.

  Once there are cities to be saved a SUCCESS action is dispatched
  and the cities data is returned.

  Dispatches an ERROR action if an error is thrown.
*/
export function* getCities(action) {
  try {
    const cities = yield call(fetchCities);
    //If no cities, new user with default cities
    const payload = cities ? cities : yield call(fetchDefaultCities);
    yield put({ type: ON_FETCH_CITIES_SUCCESS, payload });
    return cities;
  } catch (e) {
    yield put({ type: ON_FETCH_CITIES_ERROR, payload: e });
  }
}

/* 
  Async function that fetches countries from the local Storage 'api'
  If the response is empty, then the user is presumed to be a new
  user and so another request is made to get default countries.

  Once there are countries to be saved a SUCCESS action is dispatched
  and the countries data is returned.

  Dispatches an ERROR action if an error is thrown.
*/
export function* getCountries(action) {
  try {
    const countries = yield call(fetchCountries);
    //If no countries, new user with default countries
    const payload = countries ? countries : yield call(fetchDefaultCountries);
    console.log('payload',payload);
    yield put({ type: ON_FETCH_COUNTRIES_SUCCESS, payload });
    return countries;
  } catch (e) {
    yield put({ type: ON_FETCH_COUNTRIES_ERROR, payload: e });
  }
}


/* 
  Async function that dispatches a Success action when both
  cities and countries have been retrieved.
*/
export function* getLocations(action) {
  try {
    yield all([
      call(getCities),
      call(getCountries)
    ]);

    yield put({ type: ON_STATE_MOUNT_SUCCESS, payload: {} });
  } catch (e) {
    yield put({ type: ON_STATE_MOUNT_ERROR, payload: e.message });
  }
}

/*
  Async function that deletes a city using local storage api.
*/
export function* removeCity(action) {
try {
    const cities = yield call(deleteCity(action.payload));
    yield put({ type: ON_REMOVE_CITY_SUCCESS, payload: action.payload });
    return cities;
  } catch (e) {
    yield put({ type: ON_REMOVE_CITY_ERROR, payload: e.message });
  }
}

/* TODO: handle removing a country */
/*
  Async function meant to delete a city and a country if
  the country is not being referenced by other cities.

  Currently, the function only removes a city 
*/
export function* removeLocation(action) {
  try {
    yield all([
      call(() => removeCity(action)),
    ]);

    yield put({ type: ON_REMOVE_LOCATION_SUCCESS, payload: action.payload});
    yield put({ type: ON_REMOVE_FORECAST, payload: action.payload});
  } catch (e) {
    yield put({ type: ON_REMOVE_LOCATION_ERROR, message: e.message });
  }

}

/*
  Async function that adds a country by using the local storage api.
*/
export function* addCountry(location) {
try {
    const country = yield call(insertCountry(location.country));
    yield put({ type: ON_ADD_COUNTRY_SUCCESS, payload: country });
    return country;
  } catch (e) {
    yield put({ type: ON_ADD_COUNTRY_ERROR, payload: e.message });
  }
}

/*
  Async function that adds a city by using the local storage api.
*/
export function* addCity(location) {
try {
    const city = yield call(insertCity(location));
    yield put({ type: ON_ADD_CITY_SUCCESS, payload: city });
    return city;
  } catch (e) {
    yield put({ type: ON_ADD_CITY_ERROR, payload: e.message });
  }
}

/* 
  Async function that dispatches a Success action when cities
  and countries have been updated (if necessary) with the 
  new location provided.

  After this success action, it dispatches another action
  to fetch forecast information for thew new location
*/
export function* addLocation(action) {
  try {
    const location = action.payload;

    // add country first to reference country id
    const countryObj = yield call(() => addCountry(location));
    const countryId = countryObj.id;
    
    /*
    Every city must have a countryId
    so we pass this into object
    */
    const cityObj = yield call(() => addCity({
      ...location,
      countryId
    }));

    const forecastLocation = {
      id: cityObj.id,
      city: cityObj.name,
      country: countryObj.name
    }

    yield put({ type: ON_ADD_LOCATION_SUCCESS, payload: location});
    yield put({ type: ON_FETCH_NEW_FORECAST, payload: forecastLocation });

  } catch (e) {
    yield put({ type: ON_ADD_LOCATION_ERROR, message: e.message });
  }

}

export function* localStorageSaga() {
  yield takeLatest(ON_STATE_MOUNT, getLocations);
  yield takeLatest(ON_LOCATION_VALID, addLocation);
  yield takeLatest(ON_REMOVE_LOCATION, removeLocation);
}