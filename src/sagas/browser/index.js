import { browserHistory } from 'react-router';

import {
	  ON_FORECAST_LOCATION_CLICK,
	  ON_FORECAST_LOCATION_CLICK_SUCCESS,
	  ON_FORECAST_LOCATION_CLICK_ERROR,
} from '../../actions/consts';
import {
  put, 
  takeLatest 
} from 'redux-saga/effects';

export function* goToDetailedForecastPage(action) {
	try {
		const route = `/forecast/${action.payload.id}`;
		browserHistory.push(route);
    yield put({ type: ON_FORECAST_LOCATION_CLICK_SUCCESS, payload: route });
	} catch (e) {
    yield put({ type: ON_FORECAST_LOCATION_CLICK_ERROR, message: e.message });
	}
}

export function* browserSaga() {
	yield takeLatest(ON_FORECAST_LOCATION_CLICK, goToDetailedForecastPage)
}