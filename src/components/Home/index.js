/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.scss';
import Spinner from '../global/spinner';


export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: false
		};
		
	}
	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		this.setState({ loading: false });
	}
	
	render({}) {
		if (!this.state.loading) {
			return (
				<h1>this is teswt</h1>
			);
		}
		return <Spinner />;
	}
}