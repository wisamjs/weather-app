import {
	ON_DASHBOARD_MOUNT_SUCCESS,
	ON_FETCH_NEW_FORECAST_SUCCESS,
	ON_REMOVE_FORECAST
} from '../../actions/consts';
import {INITIAL_STATE} from './consts';
import R from 'ramda';

export default function dayForecasts(state = INITIAL_STATE, action= {}) {
	switch(action.type) {

		//Save forecast data
		//and switch off loading as the
		//dashboard is ready
		case ON_DASHBOARD_MOUNT_SUCCESS:
			return {
				...state, 
				loading: false,
				byId: action.payload,
				allIds: R.keys(action.payload)
			}
		
		//remove the forecast by id
		case ON_REMOVE_FORECAST:
			const newIds = R.omit([action.payload.id.toString()]);
			return {
				...state,
				byId: newIds(state.byId),
				allIds: R.keys(newIds(state.byId))
			}
			
		//add the new forecast
		case ON_FETCH_NEW_FORECAST_SUCCESS:
			const newForecastObj = {
				[action.payload.id]: {
					...action.payload
				}
			}
			const byId = R.merge(state.byId, newForecastObj);
			return {
				...state,
				byId: byId,
				allIds: R.keys(byId)
			}
		default:
			return state;
	}
}
