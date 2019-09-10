/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import style from './style.scss';
import LanguageRadio from '../../radio/language-radio';

const langaugeItems = [{
	name: 'English Practice',
	value: 'en-us',
	category: 'LANGUAGES'
},{
	name: 'Japanese Practice',
	value: 'ja',
	category: 'LANGUAGES'
},{
	name: 'Russian Practice',
	value: 'ru',
	category: 'LANGUAGES'
},{
	name: 'French Practice',
	value: 'fr',
	category: 'LANGUAGES'
},{
	name: 'Itanlian Practice',
	value: 'it',
	category: 'LANGUAGES'
}];

const otherItems = [
	{
		name: 'law',
		value: 'law',
		category: 'LEGAL'
	},{
		name: 'medicine',
		value: 'medicine',
		category: 'OTHER'
	},{
		name: 'automotive',
		value: 'automotive',
		category: 'OTHER'
	},{
		name: 'beauty',
		value: 'beauty',
		category: 'OTHER'
	},{
		name: 'fashion',
		value: 'fashion',
		category: 'OTHER'
	},{
		name: 'coaching',
		value: 'coaching',
		category: 'COACHING'
	}
];


export default class SideBar extends Component {
	

	toggleSwitch = (val, cat) => {
		this.setState({ switchedLang: val });
		this.props.sortToggleSwitched(cat);
	}

	constructor(props){
		super(props);
		this.state = {
			switchedLang: props.selectedLang
		};
	}
	
	render() {
		return (
			<div className={style.sideBar} style={this.props.style || {}}>
				<div style={{ background: '#fff', position: 'absolute', width: '100%', top: '-20px', left: '0px' }} />
				<div>LANGUAGE PRACTICE</div>
				<LanguageRadio name="LanguageSelect"
					value={this.state.switchedLang}
					onChange={this.toggleSwitch}
					disabled={false}
					data={langaugeItems}
				/>
				<div className={style.showAllLanOption}><a onClick={this.logOff}><span className="fa fa-plus" /> Show all</a> </div>

				<LanguageRadio name="LanguageSelect"
					value={this.state.switchedLang}
					onChange={this.toggleSwitch}
					disabled={false}
					data={otherItems}
				/>
			</div>
		);
	}
}