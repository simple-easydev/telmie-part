export const host = 'sr461.2dayhost.com';
export const apiRoot = 'https://'+host+'/api/';
export const apiUrls = {
	LOG_IN: apiRoot + 'auth',
	// GET_PRO_CALLS: apiRoot + 'users/activity?isPro=true',
	// GET_PERSONAL_CALLS: apiRoot + 'users/activity?isPro=false',
	GET_PROS: apiRoot+'users/pro'
};