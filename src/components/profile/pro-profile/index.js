import { h, Component } from 'preact';
import style from './style.scss';
import { route } from 'preact-router';
import { apiRoot } from '../../../api';
import { getTimeDiffInMinutes } from '../../../utils';
import { routes } from '../../app';


export default class ProProfile extends Component {
	state = {
		expanded: false
	}
	
	gotoHandler = (id) => () => this.props.client ?
		route(routes.CLIENT_FOR_COMP + id) : route(routes.PRO_FOR_COMP + id);

	renderStarList = (score) => {
		let result = [];
		for (let i = 0; i < 5; i++){
			if (i < score){
				result.push((<i className="fas fa-star" />));
			}
			else {
				result.push((<i className="fal fa-star" />));
			}
		}
		return result;
	}

	render({ profile = {} }) {
		const time = getTimeDiffInMinutes(profile.dateLastActive);
		return (
			<div className={style.proProfile}>

				<div className={style.contact}  onClick={this.gotoHandler(profile.id)} >
					<div className={style.avatar}>
						<div className={style.avatarContainer}>
							{(profile.avatar !== null) ? (
								<img src={apiRoot + 'image/' + profile.avatar.id} alt={profile.name + ' ' + profile.lastName} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/avatar/nouserimage.jpg"}}/>
							) : (
								<img src="/assets/avatar/nouserimage.jpg" alt={profile.name + ' ' + profile.lastName} />
							)}
						</div>
						{time.time > 0 && (<div className={style.statusBadge}>
							{time.time} {time.unit}
						</div>)}
					</div>
					<div className={style.info}>
						<h3>{profile.name + ' ' + profile.lastName}</h3>
						{!this.props.client && profile.pro !== null && (
							<div className={style.category}>
								{profile.pro.category}
							</div>
						)}
						<div class={style.startReview}>
							{
								this.renderStarList(profile.pro.review.rating)
							}
						</div>
					</div>
				</div>
				<div className={style.bioDes}>
					{profile.pro.professionDescription}
				</div>
				<h3 className={style.rate}>£{profile.pro.costPerMinute}/min</h3>
			</div>
		);
	}
}