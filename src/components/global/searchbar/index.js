import { h, Component } from 'preact';
import style from './style.scss';

class SearchBar extends Component {

	onKeyDown = (e) => {
		if (e.keyCode === 13) {
			this.props.onChange(e.target.value);
		}
	}
    
	constructor(props){
		super(props);
		this.state = {};
	}

	render (){
		const placeholder = (this.props.placeholder)?this.props.placeholder:'';
		return (
			<div className={style.searchBar}>
				<div className={`${style.searchBarImg}`} >
					<span className="fa fa-search" />
				</div>
				<div className={style.searchBarInputContainer}>
					<input
						className={style.noneBorderInput}
						type="text"
						name="query"
						onKeyDown={this.onKeyDown}
						placeholder={placeholder}
					/>
				</div>
			</div>
		);
	}
}

export default SearchBar;