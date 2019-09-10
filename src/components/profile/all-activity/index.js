import { h, Component } from 'preact';
import style from './style.scss';
import Spinner from '../../global/spinner';
import ActivityHeader from '../activity-header';
import ProProfile from '../pro-profile';

export default class AllActivity extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	render({ profilList=[], currentPage=0, size=20, length=0 }) {

		const pageData = {
			length,
			currentPage,
			size
		};

		return (
			<div className={`${style.activityList} ${!this.props.client && style.withSorting}`}>
				<div className={style.inner}>
					<ActivityHeader toggleSearchSort={this.props.toggleSearchSort} changePageNumber={this.props.changePageNumber} pageData={pageData}  />

					{ !this.props.loading && profilList.length > 0 && profilList.map(profile => (
						<ProProfile key={profile.id} profile={profile} />
					))}

					{ profilList.length === 0 && !this.props.loading && (
						<div className={style.empty}>No Data</div>
					)}

					{ this.props.loading && (
						<div className={style.spinnerContainer}>
							<Spinner />
						</div>
					)}
				</div>
			</div>
		);
	}
}