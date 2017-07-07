import {
	ON_FETCH_COUNTRIES_SUCCESS,
	ON_ADD_COUNTRY_SUCCESS
} from '../../actions/consts';

import R from 'ramda';

import {INITIAL_STATE} from './consts';

export default function countries(state = INITIAL_STATE, action= {}) {
	switch(action.type) {
		//Add all countries provided
		case ON_FETCH_COUNTRIES_SUCCESS:
			return {
				...state, 
				byId: action.payload, 
				allIds: R.keys(action.payload)
			}

		//add thje country and update state
		case ON_ADD_COUNTRY_SUCCESS:
			const newCountryObj = {
				[action.payload.id]: {
					...action.payload
				}
			}
			const byId = R.merge(state.byId, newCountryObj);
			return {
				...state,
				byId: byId,
				allIds: R.keys(byId)
			}
		default:
			return state;
	}
}
