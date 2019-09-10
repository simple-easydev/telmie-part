import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Redirect extends Component {

	componentDidMount(){
    route(this.props.to, true);
	}

	render() {
		return null
	}
}



// WEBPACK FOOTER //
// ./components/global/redirect/index.js