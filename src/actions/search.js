import { actionTypes } from './index';

export function changeSearchQuery(val) {
	return {
		type: actionTypes.CHANGE_SEAERCH_QUERY,
		query: val
	};
}

export function changeSearchCategory(val) {
	return {
		type: actionTypes.CHANGE_SEAERCH_FILTER,
		filter: val
	};
}

export function changeSearchSize(val) {
	return {
		type: actionTypes.CHANGE_SEAERCH_SIZE,
		size: val
	};
}

export function changeSearchSort(val) {
	return {
		type: actionTypes.CHANGE_SEAERCH_SORT,
		sort: val
	};
}

export function changeSearchCurrentPage(val) {
	return {
		type: actionTypes.CHANGE_SEAERCH_PAGE,
		page: val
	};
}