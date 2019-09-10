import { actionTypes } from '../actions';

const initialState = {
	filter: 'language',
	query: '',
	sort: 'activity',
	size: 20,
	page: 1
};

export const changeSearchFilterOption = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.CHANGE_SEAERCH_FILTER:
			return {
				...state,
				filter: action.filter
			};
		case actionTypes.CHANGE_SEAERCH_QUERY:
			return {
				...state,
				query: action.query
			};
		case actionTypes.CHANGE_SEAERCH_SORT:
			return {
				...state,
				sort: action.sort
			};
		case actionTypes.CHANGE_SEAERCH_SIZE:
			return {
				...state,
				size: action.size
			};
		case actionTypes.CHANGE_SEAERCH_PAGE:
			return {
				...state,
				page: action.page
			};
		default:
			return state;
	}
};


