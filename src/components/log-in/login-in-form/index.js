/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.scss';
import Spinner from '../../global/spinner';
import { routes } from '../../app';


export default class LogInForm extends Component {
	logIn = () => {
		this.props.logIn(window.btoa(this.state.email + ':' + this.state.password));
		this.setState({ loading: true });
	}

	onChange(e){
		let name = e.target.name,
			value = e.target.value,
			newState = {};
		newState[name] = value;
		this.setState(newState);
	}

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false
		};
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount(){
		if (document.getElementById('email') !== null) document.getElementById('email').focus();
	}
	componentWillReceiveProps(nextProps){
		this.setState({ loading: false });
	}
	
	render({}) {
		if (!this.state.loading) {
			return (
				<div className={style.logInForm}>
				  { this.props.logInFailure && (
						<div className={style.failure}>Sorry, your login details are not correct</div>
					)}
					<div className="input-container">
						<label for="email">Email</label>
						<input type="text" name="email" value={this.state.email} onInput={this.onChange} className="uk-input" id="email" />
					</div>
					<div className="input-container">
						<label for="password">Password</label>
						<input name="password" type="password"
							onKeyPress={e => {if (e.key === 'Enter') {this.logIn();}}}
							value={this.state.password}
							onInput={this.onChange}
							className="uk-input" id="password"
						/>
					</div>
					<Link href={routes.FORGOT_PASSWORD} className={style.forgotPassword}>Forgot password?</Link>
					<button className="uk-button" onClick={this.logIn}>Log in</button>
				</div>
			);
		}
		return <Spinner />;
		
	}
}