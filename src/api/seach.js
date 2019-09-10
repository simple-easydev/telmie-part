import { apiUrls } from './index';

export function search(authData, searchOpt){
	let headers = new Headers();
	headers.append('Authorization', 'Basic ' + authData);
	let additionalQuery = `?q=${searchOpt.query}`;
	searchOpt.filter && (additionalQuery = `${additionalQuery}&filter=${searchOpt.filter}`);
	searchOpt.size && (additionalQuery = `${additionalQuery}&sort=${searchOpt.size}`);
	searchOpt.sort && (additionalQuery = `${additionalQuery}&sort=${searchOpt.sort}`);
	searchOpt.page && (additionalQuery = `${additionalQuery}&page=${searchOpt.page - 1}`);

    
	return fetch(
		(apiUrls.GET_PROS) + additionalQuery,
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


