import { combineReducers } from 'redux';
import * as user from './user';
import * as search from './search';

const rootReducer = combineReducers({
	loggedInUser: user.loggedInUser,
	logInFailure: user.logInError,
	loggedInUserActivity: user.activity,
	locale: user.locale,
	search: search.changeSearchFilterOption
});

export default rootReducer;
