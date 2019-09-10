import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { logIn } from '../../actions/user';
import Spinner from '../../components/global/spinner';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			loggedIn: false
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	render() {
		return (
			<Spinner/>
		);
	}
}

const mapStateToProps = (state) => ({
	logInFailure: state.logInFailure,
	userData: state.loggedInUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logIn
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
