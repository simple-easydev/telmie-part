/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import * as router from 'preact-router';
import style from './style.scss';
import Hr from '../../hr';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { apiRoot } from '../../../api';
import { logIn, logOff, changeLocale } from '../../../actions/user';
import { changeSearchQuery, changeSearchCategory } from '../../../actions/search';
import Redirect from '../redirect';
import { Link as ScrollLink } from 'react-scroll';
import { routes, langRoutes } from '../../app';
import { langPack } from '../../../utils/langPack';
import { EN, langs } from '../../../utils/consts';
import { getCookie } from '../../../utils';
import '../../../style/fontawesome/all.css';
import SearchBar from '../searchbar';
import SideBar from '../../search/sidebar';

class Header extends Component {

	handleScroll = (e) => {
		(window.pageYOffset || document.documentElement.scrollTop) ?
			this.state.isTop && this.setState({ isTop: false })
			: !this.state.isTop && this.setState({ isTop: true });
	}

	logOff = () => {
		this.setState({
			loggedOff: true
		});
		this.props.logOff();
		router.route(routes.HOME);
	};

	toggleMobileMenu = () => this.setState(prev => ({ mobileMenuOpened: !prev.mobileMenuOpened }));

	constructor(props){
		super(props);
		this.state = {
			loggedOff: false,
			mobileMenuOpened: false,
			isTop: true
		};
	}
    
	componentDidMount(){
		let that = this;
		window.addEventListener('scroll', this.handleScroll);
		router.subscribers.push(() => {
			that.setState({
				mobileMenuOpened: false
			});
		});
		
		let userAuth = getCookie('USER_AUTH');
		userAuth !== null && this.props.logIn(userAuth);
	}

	componentWillReceiveProps(nextProps){
		if (typeof this.props.userAuth !== 'undefined' && typeof nextProps.userAuth !== 'undefined') {
			if (Object.keys(this.props.userAuth).length !== 0 && Object.keys(nextProps.userAuth).length === 0) {
				this.setState({
					loggedOff: true
				});
			}
			else {
				this.setState({
					loggedOff: false
				});
			}
		}
	}
	

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		const { userData: user  = {}, locale: localeObj } = this.props;
		const { locale = EN } = localeObj;
		const isLogin = Object.keys(user).length !== 0;
		const isAtHome = this.props.currentUrl === routes.HOME
      || Object.keys(langs).some(el => this.props.currentUrl === langRoutes(langs[el].code, routes.HOME))
      || this.props.currentUrl.toString().indexOf('/#') === 0;

		return (
			<header class={`uk-navbar uk-navbar-container ${!this.state.isTop && style.smallHeader}`} style={{ width: '100%', position: 'fixed', zIndex: 200, margin: '0 auto', top: 0, display: 'flex', flexWrap: 'wrap' }} >
				<div id={style.header}>

					<div id={style.mobileShadow} class={this.state.mobileMenuOpened ? style.opened : ''} onClick={this.toggleMobileMenu} />
					<div class={`${style.navbarLeft} uk-navbar-left`} >
						{ this.state.loggedOff && (
							<Redirect to="/" />
						)}

						<Link href={langRoutes(langs[locale].code, routes.HOME)} id={style.logo}>
							<img src="/assets/logo/logoMini@2x.png" alt="Telmie App" />
						</Link>
					
						<span id={style.expandMobileMenu} class={this.state.mobileMenuOpened ? style.opened : ''} onClick={this.toggleMobileMenu}>
							<span />
							<span />
							<span />
						</span>

						<ul class="uk-navbar-nav" id={style.leftNav}>
							{
								isLogin ? ([
									<li><Link activeClassName={style.activeLink}>My Clients</Link></li>,
									<li><Link activeClassName={style.activeLink} href={routes.MY_PROS}>My Pros</Link></li>,
									<li><Link activeClassName={style.activeLink} >Money</Link></li>
								]) :
									([
										<li>{isAtHome ?
											<ScrollLink spy smooth offset={-50} duration={500} to="howWorksElement">{langPack[locale].HEADER.HOW_IT_WORKS}</ScrollLink>
											: <Link>{langPack[locale].HEADER.HOW_IT_WORKS}</Link>}
										</li>,
										langPack[locale].HEADER.BECOME_PRO && <li>{(isAtHome) ?
											<ScrollLink spy smooth offset={-110} duration={500} to="becomeProElement">{langPack[locale].HEADER.BECOME_PRO}</ScrollLink>
											: <Link>{langPack[locale].HEADER.BECOME_PRO}</Link>}
										</li>,
										<li>{isAtHome ?
											<ScrollLink spy smooth offset={-70} duration={500} to="blogElement">{langPack[locale].HEADER.BLOG}</ScrollLink>
											: <Link >{langPack[locale].HEADER.BLOG}</Link>}
										</li>,
										<li>{isAtHome ?
											<ScrollLink spy smooth duration={500} offset={-70} to="FAQElement">{langPack[locale].HEADER.FAQ}</ScrollLink>
											: <Link >{langPack[locale].HEADER.FAQ}</Link>}
										</li>,
										<li>{isAtHome ?
											<ScrollLink spy smooth duration={500} offset={0} to="contactUsElement">{langPack[locale].HEADER.CONTACT}</ScrollLink>
											: <Link >{langPack[locale].HEADER.CONTACT}</Link>}
										</li>
									])
							}
              
						</ul>
					</div>

					<div class={`${style.navbarRight} uk-navbar-right`}>

						{ !isLogin  ? (
							<nav>
								<ul class="uk-navbar-nav" >
									<li><Link href={routes.SIGN_UP} id={style.signUp}>Sign up</Link></li>
									<li><Link href={routes.LOG_IN}>Login</Link></li>
								</ul>
							</nav>
						) : (

							<div class={style.loggedInContainer}>

								<div class={style.avatar}>
									{(user.avatar !== null) ? (
										<img src={apiRoot + 'image/' + user.avatar.id} alt={user.name + ' ' + user.lastName} />
									) : (
										<img src="/assets/avatar/nouserimage.jpg" alt={user.name + ' ' + user.lastName} />
									)}
								</div>

								<div class="mobile-hide">
									{ user.name } { user.lastName }
								</div>

								<span className="fa fa-angle-down"  style={{ color: '#f50d44' }} />

								<div class={style.dropdown + ' uk-dropdown'}>
									<ul class="uk-nav uk-dropdown-nav">
										<li><Link>Edit Profile</Link></li>
										<li><Link>Register as Pro</Link></li>
										<li><Link>Settings</Link></li>
										<li class="uk-nav-divider" />
										<li><a onClick={this.logOff}>Log out</a></li>
									</ul>
								</div>
							</div>
						)}

					</div>
					<div id={style.mobileNav} class={this.state.mobileMenuOpened ? style.opened : ''}>
						<div class={style.mobileNavHeader}>
							<Link href={langRoutes(langs[locale].code, routes.HOME)} id={style.logo}>
								<img src="/assets/logo/logoMini@2x.png" alt="Telmie App" />
							</Link>
							<span id={style.expandMobileMenu}  class={this.state.mobileMenuOpened ? style.opened : ''} onClick={this.toggleMobileMenu}>
								<span /><span /><span />
							</span>
						</div>

						{isAtHome ?
							<ScrollLink spy smooth offset={-30} duration={500} to="howWorksElement" onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.HOW_IT_WORKS}</ScrollLink>
							: <Link  onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.HOW_IT_WORKS}</Link>
						}
						{( isAtHome && langPack[locale].HEADER.BECOME_PRO ) ?
							<ScrollLink spy smooth offset={-70} duration={500} to="becomeProElement" onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.BECOME_PRO}</ScrollLink>
							: <Link onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.BECOME_PRO}</Link>
						}
						{isAtHome ?
							<ScrollLink spy smooth offset={-25} duration={500} to="blogElement" onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.BLOG}</ScrollLink>
							: <Link onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.BLOG}</Link>
						}
						{isAtHome ?
							<ScrollLink spy smooth offset={-30} duration={500} to="FAQElement" onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.FAQ}</ScrollLink>
							: <Link onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.FAQ}</Link>
						}
						{isAtHome ?
							<ScrollLink spy smooth offset={0} duration={500} to="contactUsElement" onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.CONTACT}</ScrollLink>
							: <Link onClick={this.toggleMobileMenu}>{langPack[locale].HEADER.CONTACT}</Link>
						}
                
						{ !isLogin  ? (
							<div>
								<Hr color={'#5C636E'} height={1} />
								<Link href={routes.SIGN_UP} id={style.signUp}>Sign up</Link>
								<Link href={routes.LOG_IN}>Login</Link>
							</div>
						) : (
							<div>
								<Hr color={'#5C636E'} height={1} />
								<Link activeClassName={style.activeLink} >My Clients</Link>
								<Link activeClassName={style.activeLink} >My Pros</Link>
								<Link activeClassName={style.activeLink} >Money</Link>
								<a onClick={() => this.logOff()}>Log out</a>
							</div>
						)}
					</div>
				</div>

				{isLogin && (
					<div id={style.searchBar} >
						<div id={style.leftSideMenuBar} >
							<SideBar selectedLang={locale} sortToggleSwitched={this.props.changeSearchCategory} />
						</div>
						<div style={{ marginLeft: '315px', width: '100%' }}>
							<SearchBar placeholder="i.e. Website Designer" onChange={this.props.changeSearchQuery} />
						</div>
					</div>)}
			</header>
		);
	}
}


const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	locale: state.locale
});


const mapDispatchToProps = dispatch => bindActionCreators({
	logIn,
	logOff,
	changeLocale,
	changeSearchQuery,
	changeSearchCategory

}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);