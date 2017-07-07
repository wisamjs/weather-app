import {
	ON_DETAILED_FORECAST_MOUNT_SUCCESS
} from '../../actions/consts';
import {INITIAL_STATE} from './consts';
import R from 'ramda';

export default function weekForecasts(state = INITIAL_STATE, action= {}) {
	switch(action.type) {
		//Add the detailed forecast
		//And switch off loading flag
		//as the page is ready
		case ON_DETAILED_FORECAST_MOUNT_SUCCESS:
			const newForecastObj = {
				[action.payload.id]: {
					...action.payload
				}
			}
			const byId = R.merge(state.byId, newForecastObj);
			return {
				...state,
				loading: false,
				byId: byId,
				allIds: R.keys(byId)
			}
		default:
			return state;
	}
}
