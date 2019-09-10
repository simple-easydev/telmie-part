/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prefer-stateless-function */
import { h, Component } from 'preact';
import style from './style.scss';
import { Link } from 'preact-router/match';
import PageNation from '../../pagenation';

export default class ActivityHeader extends Component {

    toggleSort = (val) => {
    	this.setState({ selectedSort: val });
    	this.props.toggleSearchSort(val);
    }
	
	toggleDropDown = () => {
		const dropdown =  !this.state.dropdown;
		this.setState({ dropdown });
	}

	constructor(props){
    	super(props);
    	this.state = {
		  selectedSort: 'activity',
		  dropdown: false
    	};
	}
	render() {
    	return (
    		<div className={`${style.ActivityHeader}`}>
				<div className="uk-navbar uk-navbar-container">
					<div className={`${style.navBarRight} uk-navbar-left`}>
						<h3>Find a Pro</h3>
						<div className={`${style.sortContainer} ${(this.state.dropdown && style.show)}`} onClick={this.toggleDropDown}>
							<span className="fa fa-align-justify" />
							<div className={`${style.selectedSort}`}>{this.state.selectedSort}</div>
							<span className={`${style.myarrow} fa fa-angle-down`} />
							<div className={style.dropdown + ' uk-dropdown'}>
								<ul className="uk-nav uk-dropdown-nav">
									<li><Link onClick={() => this.toggleSort('activity')}>activity</Link></li>
									<li><Link onClick={() => this.toggleSort('rating')}>rating</Link></li>
									<li><Link onClick={() => this.toggleSort('lowestratefirst')}>lowest rate first</Link></li>
									<li><Link onClick={() => this.toggleSort('highestratefirst')}>highest rate first</Link></li>
									<li><Link onClick={() => this.toggleSort('experience')}>experience</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className={`${style.navBarRight} uk-navbar-right`} >
						<PageNation currentPage={this.props.pageData.currentPage} size={this.props.pageData.size} length={this.props.pageData.length} changePageNumber={this.props.changePageNumber} />
					</div>
				</div>

				<div className={style.banner}>
					<div className={style.bannerContainer}>
						<div className={style.category}>FEATURED SERVICE</div>
						<div className={style.categoryTitle}>English Practice</div>
						<div className={style.categoryDescription}>Talk to native english speakers from al over the world for £0.20/min</div>
						<img src="/assets/avatar/untitled1@2x.png" />
					</div>
				</div>
    		</div>
    	);
	}
}