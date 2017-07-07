import {
	ON_FETCH_CITIES_SUCCESS,
	ON_REMOVE_CITY_SUCCESS,
	ON_ADD_CITY_SUCCESS,
	ON_STATE_MOUNT_SUCCESS
} from '../../actions/consts';

import R from 'ramda';

import {INITIAL_STATE} from './consts';

export default function cities(state = INITIAL_STATE, action= {}) {
	switch(action.type) {

		//State is ready
		case ON_STATE_MOUNT_SUCCESS:
			return {...state, loading: false};
		
		//Add all cities provided
		case ON_FETCH_CITIES_SUCCESS:
			return {
				...state, 
				byId: action.payload, 
				allIds: R.keys(action.payload)
			}

		//remove the city provided
		case ON_REMOVE_CITY_SUCCESS:
		const newIds = R.omit([action.payload.id.toString()]);
		return {
			...state,
			byId: newIds(state.byId),
			allIds: R.keys(newIds(state.byId))
		}

		//add the city and update state
		case ON_ADD_CITY_SUCCESS:
			const newCityObj = {
				[action.payload.id]: {
					...action.payload
				}
			}
			const byId = R.merge(state.byId, newCityObj);
			return {
				...state,
				byId: byId,
				allIds: R.keys(byId)
			}
		default:
			return state;
	}
}
