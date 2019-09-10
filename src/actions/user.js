import * as user from '../api/users';
import { actionTypes } from './index';

const setCookie = (name,value,days) => {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '')  + expires + '; path=/';
};

const eraseCookie = (name) => {
	document.cookie = name+'=; Max-Age=-99999999;';
};

const logInSuccess = (response, authData) => ({
	type: actionTypes.LOG_IN_SUCCESS,
	userData: response,
	userAuth: authData
});
const logInFailure = (response) => ({
	type: actionTypes.LOG_IN_FAILURE
});

const loggedOff = (response) => ({
	type: actionTypes.LOGGED_OFF
});


export const changeLocale = (lang) => dispatch => {
	dispatch({
		type: actionTypes.CHANGE_LOCALE,
		lang
	});
};

export const changeLocaleLangs = (langs = []) => dispatch => {
	dispatch({
		type: actionTypes.CHANGE_LOCALE_LANGS,
		langs: langs.map(el => el.lang || el)
	});
};


export const logIn = (authData) => async (dispatch) => {
	const response = await user.logIn(authData);
	if (Object.keys(response).length === 0) {
		dispatch(logInFailure());
	}
	else {
		dispatch(logInSuccess(response, authData));
		setCookie('USER_AUTH', authData, 30);
	}
};

export const logOff = () => (dispatch) => {
	dispatch(loggedOff());
	eraseCookie('USER_AUTH');
};