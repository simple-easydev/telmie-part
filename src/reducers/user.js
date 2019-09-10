import { actionTypes } from '../actions';
import { EN, langs } from '../utils/consts';

export const loggedInUser = (state = {}, action) => {
	let user;
	switch (action.type) {
		case actionTypes.LOG_IN_SUCCESS:
			user = action.userData;
			user.userAuth = action.userAuth;
			return { ...user };

		case actionTypes.EDIT_SUCCESS:
			user = action.userData;
			user.userAuth = action.userAuth;
			return { ...user };
			
		case actionTypes.EDIT_FAILURE:
			return {
				...state,
				errorInUpdate: true
			};

		case actionTypes.LOGGED_OFF:
			return {};

		case actionTypes.PHOTO_UPLOADED:
			return {
				...state,
				avatar: action.photo,
				avatarUploadError: ''
			};
		case actionTypes.PHOTO_UPLOAD_FAILURE:
			return {
				...state,
				avatarUploadError: action.errorMsg
			};
		case actionTypes.PHOTO_UPLOAD_CLEAR_STATUS:
			return {
				...state,
				avatarUploadError: ''
			};

		default:
			return state;
	}
};

export const localeGet = () => {
	const _path = window.location.pathname.split('/')[1];
	let _lang = '';
	Object.keys(langs).some(el => langs[el].code === _path ? (_lang = el, true) : false);
	return _lang;
};

export const locale = (state = { locale: localeGet() || EN  }, action) => {
	const { lang = EN } = action;
	switch (action.type) {
		case actionTypes.CHANGE_LOCALE:
			return {
				...state,
				locale: lang
			};
		case actionTypes.CHANGE_LOCALE_LANGS:
			return {
				...state,
				languages: action.langs
			};
		default:
			return state;
	}
};

export const logInError = (state = {}, action) => {
	let date = new Date();
	switch (action.type) {
		case actionTypes.LOG_IN_FAILURE:
			return date.getTime();
		default:
			return false;
	}
};

export const activity = (state = {}, action) => {
	
	switch (action.type) {
		case actionTypes.PERSONAL_CALLS_RECEIVED:
			return {
				...state,
				personCalls: action.calls.slice(0, 10)
			};


		case actionTypes.PRO_CALLS_RECEIVED:
			return {
				...state,
				proCalls: action.calls.slice(0, 10)
			};

		default:
			return state;
	}

};