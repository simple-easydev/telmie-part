import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { search } from '../../api/seach';
import { changeLocaleLangs, changeLocale } from '../../actions/user';
import { changeSearchCurrentPage, changeSearchSort } from '../../actions/search';
import AllActivity from '../../components/profile/all-activity';

class Activity extends Component {

	getData = (props) => {
		this.setState({ loading: true });
		search(props.userData.userAuth, props.search).then((data) => {
			const { results  = [], total } = data;
			this.setState({
				loading: false,
				profilList: results,
				length: total
			});

		}).catch((error) => {

			this.setState({
				activity: [],
				loading: false
			});


		});
		
	}

	changeActivityPage = (page) => {
		window.scrollTo(0,0);
	}

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	
	componentDidMount(){
		(this.props.userData.userAuth) && this.getData(this.props);
		this.props.changeLocaleLangs([]);
		this.props.changeLocale();
	}
	
	componentWillReceiveProps(nextProps) {
		this.getData(nextProps);
	}

	render() {
		return (
			<div id="profile">
				<AllActivity
					profilList={this.state.profilList}
					client={this.props.isProCalls}
					loading={this.state.loading}
					changePageNumber={this.props.changeSearchCurrentPage}
					currentPage={this.props.search.page}
					length={this.state.length}
					toggleSearchSort={this.props.changeSearchSort}
				/>

			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	activity: state.loggedInUserActivity,
	search: state.search
});

const mapDispatchToProps = dispatch => bindActionCreators({
	changeLocaleLangs,
	changeLocale,
	changeSearchCurrentPage,
	changeSearchSort
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Activity);
