import { h, Component } from 'preact';
import style from './style.scss';
import Spinner from '../../global/spinner';
import { Link } from 'preact-router';

export default class Pagination extends Component {
	constructor(props){
		super(props);
		let pages = [];

		const length = typeof props.list === 'number' ?
			props.list : props.list.length;
		if (length > 0) {
			let numberOfPages = Math.ceil(length/props.max);
			for (let i = 1; i < numberOfPages + 1; i++) {
				pages.push(i);
			}
		}
		this.state = {
			pages
		};
	}
	componentWillReceiveProps(nextProps){
		const length = typeof nextProps.list === 'number' ?
			nextProps.list : nextProps.list.length;
		if (length > 0) {
			let pages = [],
				numberOfPages = Math.ceil(length/nextProps.max);
			for (let i = 1; i < numberOfPages + 1; i++) {
				pages.push(i);
			}
			this.setState({ pages });
		}
	}
	render() {
		if (this.state.pages.length > 1) {
			return (
				<div className={style.pagination}>
					<span className={style.prev + ((this.props.currentPage == 1) ? ' ' + style.disabled : '')} onClick={() => this.props.previousPage()}>Previous</span>
					{this.state.pages.map((page,index) => (
						<span onClick={() => this.props.changePage(index + 1)} className={this.props.currentPage == index + 1 && style.selected}>{ index + 1}</span>
					))}
					<span className={style.next + ((this.props.currentPage == this.state.pages.length) ? ' ' + style.disabled : '')} onClick={() => this.props.nextPage()}>Next</span>
				</div>
			);
		}

	}
}


// WEBPACK FOOTER //
// ./components/profile/pagination/index.js