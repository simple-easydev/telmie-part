/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import style from './style.scss';

const PageNation = (props) => {

	let currentPage = props.currentPage;
	let length = props.length;

	const goNextPageNumber = () => {
		if (length/props.size > currentPage){
			props.changePageNumber(currentPage+1);
		}
        
	};

	const goPreviousPageNumber = () => {
		if (currentPage > 1){
			props.changePageNumber(currentPage-1);
		}
		
	};
    
	const getSizeOnCurrentPage =() => {
		const remain = length - (currentPage - 1) * props.size;
		return Math.min(props.size, remain);

	};

	return (
		<div class={style.PageNation}>
			<div>Showing {getSizeOnCurrentPage()} of {props.currentPage}</div>
			<a className={style.PageNationButton} onClick={goPreviousPageNumber}>
				<span class="fa fa-chevron-left" />
			</a>
			<a className={style.PageNationButton} onClick={goNextPageNumber}>
				<span class="fa fa-chevron-right" />
			</a>
		</div>
	);
};

export default PageNation;