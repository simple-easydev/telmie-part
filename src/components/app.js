import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from '../routes/home';
import Activity from '../routes/activity';
import ErrorRoute from '../routes/errorRoute';

import PrismicConfig from '../prismic/prismic-configuration';

import Prismic from 'prismic-javascript';
import { connect } from 'preact-redux';
import ReactGA from 'react-ga';
import { EN,langs } from '../utils/consts';
import './css/animate.scss';
import './css/fontawesome/all.css';

export const routes = {
	HOME: '/',
	LOG_IN: '/',
	MY_PROS: '/my-pros'
};

export const langRoutes = (lang, route) => lang == langs[EN].code ? route : `/${lang}${route}`;

class App extends Component {

	handleRoute = e => {
		ReactGA.pageview(e.url);
		this.setState({ currentUrl: e.url });
	};

	constructor(props){
		super(props);
		this.state = {
			prismicCtx: null,
			currentUrl: ''
		};
	}

	componentWillMount() {
		ReactGA.initialize('UA-127710081-1');
	}

	renderDefaultRoutes = () => [
		<Home path={routes.LOG_IN} />
	];


	render() {
		
		return (
			<div>
				<Router onChange={this.handleRoute}>
					{this.renderDefaultRoutes()}
					<ErrorRoute default />
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	locale: state.locale.locale
});

export default connect(
	mapStateToProps,
	null
)(App);