/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { route } from 'preact-router';
import { routes } from '../../components/app';

import style from './style.scss';

const ErrorRoute = (props) => {

	const goHome = () => {
		route(routes.HOME);
	};
	
	return (
		<div class={style.errorWrapper}>
			<div class={style.error404}>Error 404</div>
			<div class={style.notFound}>Page not found!</div>
			<div class={style.errorInfo}>The page you are looking for doesn't exist or you don't have enough rights to view it.</div>
			<button onClick={goHome}>Go Home</button>
		</div>
	);
};

export default ErrorRoute;


// WEBPACK FOOTER //
// ./routes/errorRoute/index.js