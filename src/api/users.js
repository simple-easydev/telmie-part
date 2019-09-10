import { apiUrls } from './index';

export function logIn(authData){

	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + authData);

	return fetch(apiUrls.LOG_IN, { method: 'GET', headers }).then(response => {
		if (response.status === 401){
			return {};
		}
		if (response.status === 403){
			return {};
		}
		return response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

export function getCalls(authData, isProCalls, num, sort = ''){
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + authData);

	let additionalQuery = num ? `&size=${num}` : '';
	sort && (additionalQuery = `${additionalQuery}&sort=${sort}`);
	return fetch(
		(isProCalls ? apiUrls.GET_PRO_CALLS : apiUrls.GET_PERSONAL_CALLS) + additionalQuery,
		{ method: 'GET', headers }
	).then(response => {
		if (response.status === 401){
			return {};
		}
		return response.json().then(json =>  json);

	}, error => {
		throw new Error(error.message);
	});
}


