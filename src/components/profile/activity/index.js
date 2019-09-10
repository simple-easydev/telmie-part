import { h, Component } from 'preact';
import style from './style.scss';
import { route } from 'preact-router';
import { apiRoot } from '../../../api';
import { convertDate } from '../../../utils';
import { activityTypes } from '../../../utils/consts';
import { routes } from '../../app';


export default class Activity extends Component {
	state = {
		expanded: false
	}
	
	gotoHandler = (id) => () => this.props.client ?
		route(routes.CLIENT_FOR_COMP + id) : route(routes.PRO_FOR_COMP + id);

	render({ activity = {} }) {
		return (
			<div className={style.activity}>

				<div className={style.contact}  onClick={this.gotoHandler(activity.id)} >
					<div className={style.avatar}>
						{(activity.avatar !== null) ? (
							<img src={apiRoot + 'image/' + activity.avatar.id} alt={activity.name + ' ' + activity.lastName} />
						) : (
							<img src="/assets/nouserimage.jpg" alt={activity.name + ' ' + activity.lastName} />
						)}
					</div>
					<div className={style.info}>
						<h3>{activity.name + ' ' + activity.lastName}</h3>
						{!this.props.client && activity.pro !== null && (
							<div>
								{activity.pro.profession}
							</div>
						)}
					</div>
				</div>
				<div className={style.type}>
					<span style={activity.activity === 'mc' && { color: 'red' }}>{ activityTypes[activity.activity] }</span>
				</div>
				<div className={style.date}> { convertDate(activity.activityDate) }</div>
				<div className={style.count}>{activity.activityCount}</div>
			</div>
		);
	}
}