import {
  call, put, takeLatest 
} from 'redux-saga/effects';

import R from 'ramda';

import {
  ON_DASHBOARD_MOUNT,
  ON_DASHBOARD_MOUNT_SUCCESS,
  ON_DASHBOARD_MOUNT_ERROR,

  ON_ADD_LOCATION,
  ON_LOCATION_VALID,
  ON_LOCATION_REVOKE,
  ON_FETCH_NEW_FORECAST,
  ON_FETCH_NEW_FORECAST_SUCCESS,
  ON_FETCH_NEW_FORECAST_ERROR,
  ON_DETAILED_FORECAST_MOUNT,
  ON_DETAILED_FORECAST_MOUNT_SUCCESS
} from '../../actions/consts';

import {
  foundMatch,
  foundPotentialMatches,
  head,
} from './utils';

import {
  getLocationDetails,
  getForecast,
  get10DayForecast
} from '../../api/weather';


/* Async function that takes a payload of locations
  and makes an API request to fetch the forecast 
  for each location.

  When all forecasts have been fetched, all forecasts
  are merged and attached to the success action
*/

export function* fetchAllForecasts(action) {
  try {
    const forecasts = yield R.values(action.payload).map(
      location => call(getForecast(location))
    );

    /*
      Ideally data would be returned in a certain way to avoid
      having to massage the response in sagas or reducers.
    */

    const payload = R.mergeAll(R.map((obj) => ({[obj.id]:obj}), forecasts));

    yield put({ type: ON_DASHBOARD_MOUNT_SUCCESS, payload: payload });

  } catch (e) {
    yield put({ type: ON_DASHBOARD_MOUNT_ERROR, message: e.message });
  }
}

/* 
  Async function that fetches a day forecast for the location provided
*/
export function* fetchNewForecast(action) {
  try {
    const forecast =  yield call(getForecast(action.payload));
    yield put({ type: ON_FETCH_NEW_FORECAST_SUCCESS, payload: forecast });

  } catch (e) {
    yield put({ type: ON_FETCH_NEW_FORECAST_ERROR, message: e.message });
  }
}


/*
  The API provided returns 3 different responses depending on the
  location validity. 

  - if the location is valid, the data is returned.
  
  - if the location is slightly invalid, a list of potential locations
  were returned. I try to match the first location provided.

  - If the location is undeniably wrong, then an error is thrown

*/

export const getLocationDetailsPayload = (response) => {
    if (foundMatch(response)) {
      return {
        city: response.location.city,
        country: response.location.country_name
      }

    } else if (foundPotentialMatches(response)) {
      const firstMatch = head(response.response.results);
     return {
        city: firstMatch.city,
        country: firstMatch.country_name
      }
    } else {
      throw new Error(`Location doesn't exist!`);
    }
}

/*
  A function that checks the validity of the request location
  by making an api request to lookup the geolocation by city and country.
*/
export function* fetchLocationDetails(action) {
  try {
    const response = yield call(getLocationDetails(action.payload));
    yield put({ type: ON_LOCATION_VALID, payload: getLocationDetailsPayload(response) });
  } catch (e) {
    yield put({ type: ON_LOCATION_REVOKE, message: e.message });
  }
}

/* 
  Async function that fetches a 10 day forecast for the location provided
*/
export function* fetchDetailedForecast(action) {
  try {
    const detailedForecast = yield call(get10DayForecast(action.payload));
    if (detailedForecast.forecast) {
      const payload = {
        detailedForecast: detailedForecast.forecast.simpleforecast.forecastday,
        id: action.payload.id
      }

      yield put({ type: ON_DETAILED_FORECAST_MOUNT_SUCCESS, payload: payload});

    } else {
      //Something went wrong
      throw new Error(`Uh oh! Something went wrong`);
    }

  } catch (e) {

  }
}

export function* weatherSaga() {
  yield takeLatest(ON_DASHBOARD_MOUNT, fetchAllForecasts);
  yield takeLatest(ON_ADD_LOCATION, fetchLocationDetails);
  yield takeLatest(ON_FETCH_NEW_FORECAST, fetchNewForecast);
  yield takeLatest(ON_DETAILED_FORECAST_MOUNT, fetchDetailedForecast);
}