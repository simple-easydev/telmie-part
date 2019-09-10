import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { Link as ScrollLink } from 'react-scroll';

import style from './style.scss';
import { routes, langRoutes } from '../../app';
import { langPack } from '../../../utils/langPack';
import { langs } from '../../../utils/consts';

const socialNetworksArr = ['facebook','linkedin','twitter','instagram'/*,'medium'*/,'youtube'];
const socialNetworks = {
	facebook: {
		icon: '/assets/icons/f-19x19.png',
		link: 'https://www.facebook.com/telmie.pro/'
	},
	linkedin: {
		icon: '/assets/icons/in-19x19.png',
		link: 'https://www.linkedin.com/company/telmie'
	},
	twitter: {
		icon: '/assets/icons/tw-38×32.png',
		link: 'https://twitter.com/TelmieUK'
	},
	instagram: {
		icon: '/assets/icons/inst-20x20.png',
		link: 'https://www.instagram.com/telmieuk/'
	},

	/*medium: {
		icon: '/assets/icons/m-40×28.png',
		link: '',
	},*/
	youtube: {
		icon: '/assets/icons/yt-46×34.png',
		link: 'https://www.youtube.com/channel/UCwphxwpZoBIT6Eg7_FFVzQQ'
	}
};

export default class Footer extends Component {
	onIconClick = (e) => {
		const { alt } = e.target;
		alt && window.open(socialNetworks[alt].link);
	}
	render() {
		const { locale } = this.props;
		return (
			<div style={{ background: '#fff', width: '100%' }}>
				<footer id={style.footer} className="uk-navbar uk-navbar-container">
					<div className="uk-navbar-left" id={style.left}>
						<Link href={langRoutes(langs[locale].code, routes.HOME)} id={style.logo}>
							<img src="/assets/logo/logoMini@2x.png" alt="Telmie App" />
						</Link>
						<div class={style.copyright}>Copyright &copy;2018 TELMIE UK LTD., London, UK</div>
						<div style={{ fontSize: 10 }}>03.04.2019 14:49</div>
					</div>
					<div className="uk-navbar-right" id={style.right}>
						<nav id={style.footerLinks}>
							<ul className="uk-navbar-nav" >
								<li><Link href={langRoutes(langs[locale].code, routes.HOME)}>{langPack[locale].FOOTER.HOME}</Link></li>
								{/*<li><Link href={''}>Testimonials</Link></li>*/}
								<li>{this.props.currentUrl === routes.HOME ?
									<ScrollLink spy smooth duration={500} to="contactUsElement">{langPack[locale].FOOTER.CONTACT}</ScrollLink>
									: <Link href={langRoutes(langs[locale].code, routes.CONTACT_US)}>{langPack[locale].FOOTER.CONTACT}</Link>}
								</li>
								<li>{this.props.currentUrl === routes.HOME || this.props.currentUrl.indexOf('/#') +1 ?
									<ScrollLink spy smooth duration={500} to="blogElement">{langPack[locale].FOOTER.BLOG}</ScrollLink>
									: <Link href={langRoutes(langs[locale].code, routes.BLOG_LINK)}>{langPack[locale].FOOTER.BLOG}</Link>}
								</li>
								<li><Link href={langRoutes(langs[locale].code, routes.TERMS)}>{langPack[locale].FOOTER.TERMS}</Link></li>
								{/*<li><Link href={''}>Help</Link></li>*/}
								<li><Link href={langRoutes(langs[locale].code, routes.PRIVACY)}>{langPack[locale].FOOTER.POLICY}</Link></li>
								
								<li><Link href={langRoutes(langs[locale].code, routes.FAQ)}>{langPack[locale].FOOTER.FAQ}</Link></li>
							</ul>
						</nav>
						<div class={style.socialIcons}>
							{socialNetworksArr.map(el => (
								<img src={socialNetworks[el].icon} key={el} onClick={this.onIconClick} alt={el} />
							))}
						</div>
					</div>
				</footer>
			</div>
		);
	}
}