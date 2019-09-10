
import { h } from 'preact';
import { routes, langRoutes } from '../../app';
import { langPack } from '../../../utils/langPack';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import emoji from 'react-easy-emoji';
import { EN, langs } from '../../../utils/consts';

import style from './style.scss';

const renderExcept = (elem, arr=[], isLocale = false) => isLocale ?
	arr.filter(el => el !== elem)
	: arr.filter(el => { });

const renderServices = ({ curUrl, locale }) => {
	let item = '',
		listItems = '',
		urlStr = curUrl.toString();

	if (urlStr.indexOf(routes.LANGUAGE_PRACTICE) + 1){
		item = langPack[locale].SERVICES.LANGUAGE_PRACTICE;
		listItems = [
			<li><Link href={langRoutes(langs[locale].code, routes.IMMIGRATION_CONSULTANT)}>{langPack[locale].SERVICES.IMMIGRATION_CONSULTANT}</Link></li>
		];
	}
	else if (urlStr.indexOf(routes.IMMIGRATION_CONSULTANT) + 1){
		item = langPack[locale].SERVICES.IMMIGRATION_CONSULTANT;
		listItems = [
			<li><Link href={langRoutes(langs[locale].code, routes.LANGUAGE_PRACTICE)}>{langPack[locale].SERVICES.LANGUAGE_PRACTICE}</Link></li>
		];
	}
	else if (urlStr.indexOf(routes.LANGUAGE_LEARNERS) + 1){
		item = langPack[locale].SERVICES.LANGUAGE_LEARNERS;
		listItems = [
			<li><Link href={langRoutes(langs[locale].code, routes.IMMIGRATION_ADVICE)}>{langPack[locale].SERVICES.IMMIGRATION_ADVICE}</Link></li>
		];
	}
	else if (urlStr.indexOf(routes.IMMIGRATION_ADVICE) + 1){
		item = langPack[locale].SERVICES.IMMIGRATION_ADVICE;
		listItems = [
			<li><Link href={langRoutes(langs[locale].code, routes.LANGUAGE_LEARNERS)}>{langPack[locale].SERVICES.LANGUAGE_LEARNERS}</Link></li>
		];
	}
	return { item, listItems };
};

const renderLocale = (props) => {
	const changeLocalization = (lang) => () => {
		props.changeLocale(lang);
		let _link = `/${window.location.pathname.split('/').slice(2).join('/')}`;
		switch (props.locale){
			case EN:
				!(window.location.pathname.toString().indexOf('/blog/') + 1)
                    && route(langRoutes(langs[lang].code, window.location.pathname));
				break;
			default:
				!(_link.toString().indexOf('/blog/') + 1)
                    && route(langRoutes(langs[lang].code, _link));
				break;
		}
	};
	const renderLocaleItem = (el) => ([
		emoji(el.emoji, (code) => (
			<div class={style.flagContainer}
				style={{ backgroundImage: `url(https://twemoji.maxcdn.com/2/svg/${code}.svg)` }}
			/>
		)),
		el.name
	]);
    
	let item = '',
		listItems = [];

	item = renderLocaleItem(langs[props.locale]);

	listItems = renderExcept(props.locale, props.languages, true).map(el => (
		<li onClick={changeLocalization(langs[el] && langs[el].lang)} key={langs[el] && langs[el].code}>
			{langs[el] && renderLocaleItem(langs[el])}
		</li>
	));

	return { item, listItems };
};

const Select = (props) => {

	let { item, listItems } = props.isLocale ?
		renderLocale(props) : renderServices(props);

	return (
		<div class={props.isLocale ? `${style.title} ${style.localeSelect}` : style.title}>
			{ item }
			{
				listItems.length > 0 && [
					<i className="fas fa-angle-down" />,
					<ul>
						{ listItems }
					</ul>
				]
			}
		</div>
	);
};

export default Select;